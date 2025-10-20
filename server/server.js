const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// 中间件
app.use(cors());
app.use(express.json());

// sts 路由
const stsRouter = require('./sts');
app.use('/sts', stsRouter);//路由统一前缀配置同时注册

// 存储验证请求的时间戳
const verificationAttempts = new Map();

// 简单的验证码验证接口
app.post('/captcha', (req, res) => {
  try {
    const { behavior } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;
    const currentTime = Date.now();
    
    console.log('收到验证码验证请求:', {
      behavior: behavior?.length || 0,
      clientIP,
      timestamp: new Date(currentTime).toISOString()
    });
    
    // 1. 基本数据验证
    if (!behavior || !Array.isArray(behavior) || behavior.length === 0) {
      return res.json({
        msg: 'error',
        result: {
          success: false,
          message: '无效的验证数据'
        }
      });
    }
    
    // 2. 基于时间的验证逻辑
    const isHumanBehavior = validateByTime(behavior, clientIP, currentTime);
    
    // 3. 基于轨迹数据的简单验证
    const isTrajectoryValid = validateByTrajectory(behavior);
    
    // 4. 综合判断
    const isValid = isHumanBehavior && isTrajectoryValid;
    
    // 记录验证尝试
    verificationAttempts.set(clientIP, currentTime);
    
    // 清理过期的记录（1小时前的记录）
    cleanupOldRecords(currentTime);
    
    res.json({
      msg: isValid ? 'ok' : 'error',
      result: {
        success: isValid,
        message: isValid ? '验证成功' : '验证失败',
        details: {
          behaviorLength: behavior.length,
          isHumanBehavior,
          isTrajectoryValid,
          timestamp: currentTime
        }
      }
    });
    
  } catch (error) {
    console.error('验证码验证错误:', error);
    res.status(500).json({
      msg: 'error',
      result: {
        success: false,
        message: '服务器错误'
      }
    });
  }
});

/**
 * 基于时间的验证逻辑
 */
function validateByTime(behavior, clientIP, currentTime) {
  // 1. 检查操作频率（防止机器人快速重复操作）
  const lastAttempt = verificationAttempts.get(clientIP);
  if (lastAttempt) {
    const timeDiff = currentTime - lastAttempt;
    // 如果两次验证间隔少于2秒，认为是机器人行为
    if (timeDiff < 2000) {
      console.log('操作过于频繁:', timeDiff + 'ms');
      return false; 
    }
  }
  
  // 2. 基于轨迹数据推断操作时间
  const estimatedDuration = behavior.length * 16; // 假设每个轨迹点间隔16ms
  // 如果操作时间太短（少于500ms）或太长（超过10秒），认为是异常行为
  if (estimatedDuration < 100 || estimatedDuration > 10000) {
    console.log('操作时间异常:', estimatedDuration + 'ms');
    return false;
  }
  
  return true;
}

/**
 * 基于轨迹数据的验证逻辑
 */
function validateByTrajectory(behavior) {
  // 1. 检查轨迹长度
  if (behavior.length < 10 || behavior.length > 100) {
    console.log('轨迹长度异常:', behavior.length);
    return false;
  }
  
  // 2. 计算轨迹的标准差（类似原库的逻辑）
  const mean = behavior.reduce((sum, val) => sum + val, 0) / behavior.length;
  const variance = behavior.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / behavior.length;
  const standardDeviation = Math.sqrt(variance);
  
  // 3. 人类操作应该有适度的抖动（标准差不能为0，也不能太大）
  if (standardDeviation === 0 || standardDeviation > 10) {
    console.log('轨迹标准差异常:', standardDeviation);
    return false;
  }
  
  // 4. 检查轨迹的连续性（相邻点的差值不应该过大）
  for (let i = 1; i < behavior.length; i++) {
    const diff = Math.abs(behavior[i] - behavior[i-1]);
    if (diff > 20) { // 如果相邻点差值过大，可能是机器人行为
      console.log('轨迹不连续:', diff);
      return false;
    }
  }
  
  return true;
}

/**
 * 清理过期的验证记录
 */
function cleanupOldRecords(currentTime) {
  const oneHourAgo = currentTime - 60 * 60 * 1000;
  for (const [ip, timestamp] of verificationAttempts.entries()) {
    if (timestamp < oneHourAgo) {
      verificationAttempts.delete(ip);
    }
  }
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`验证服务器运行在 http://localhost:${PORT}`);
});