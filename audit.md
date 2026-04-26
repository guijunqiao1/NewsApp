# `newsapp`审计结果


您所审计的工程总共有 **4** 个风险漏洞。

其中：

- **严重漏洞**：共计 **0** 个
- **高危漏洞**：共计 **3** 个
- **中危漏洞**：共计 **1** 个
- **低危漏洞**：共计 **0** 个

> 说明：
>
> - **严重**漏洞被认为是极其严重的，应该立即修复。
> - **高危**漏洞被认为是严重的，应该尽快修复。
> - **中危**漏洞被认为是中等严重的，可以选择在时间允许时修复。
> - **低危**漏洞被认为是轻微的，可以根据自行需要进行修复。

下面是漏洞的详细信息



## 高危漏洞

共计 **3** 个


### `axios`

**漏洞描述**：

- Axios Cross-Site Request Forgery Vulnerability
  - npm漏洞编号：`1097679`
  - 漏洞详细说明：https://github.com/advisories/GHSA-wf5p-g6vw-rhxx
  - 漏洞等级：中危
  - 受影响的版本：`>=0.8.1 <0.28.0`

- axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL
  - npm漏洞编号：`1111034`
  - 漏洞详细说明：https://github.com/advisories/GHSA-jr5f-v2jv-69x6
  - 漏洞等级：高危
  - 受影响的版本：`<0.30.0`

- Axios is Vulnerable to Denial of Service via __proto__ Key in mergeConfig
  - npm漏洞编号：`1113274`
  - 漏洞详细说明：https://github.com/advisories/GHSA-43fc-jf86-j433
  - 漏洞等级：高危
  - 受影响的版本：`<=0.30.2`

- Axios has a NO_PROXY Hostname Normalization Bypass that Leads to SSRF
  - npm漏洞编号：`1116672`
  - 漏洞详细说明：https://github.com/advisories/GHSA-3p68-rc4w-qgx5
  - 漏洞等级：中危
  - 受影响的版本：`<0.31.0`

- Axios has Unrestricted Cloud Metadata Exfiltration via Header Injection Chain
  - npm漏洞编号：`1116674`
  - 漏洞详细说明：https://github.com/advisories/GHSA-fvcv-3m26-pcqx
  - 漏洞等级：中危
  - 受影响的版本：`<0.31.0`


**依赖关系**：



- `newsapp` / `axios`

  
  

**漏洞包所在目录**：

- `node_modules/axios`


### `braces`

**漏洞描述**：

- Uncontrolled resource consumption in braces
  - npm漏洞编号：`1098094`
  - 漏洞详细说明：https://github.com/advisories/GHSA-grv7-fg5c-xmjg
  - 漏洞等级：高危
  - 受影响的版本：`<3.0.3`


**依赖关系**：



- `newsapp` / `vite-plugin-svg-icons` / `svg-baker` / `micromatch` / `braces`

  
  

**漏洞包所在目录**：

- `node_modules/svg-baker/node_modules/braces`


### `micromatch`

**漏洞描述**：

- Regular Expression Denial of Service (ReDoS) in micromatch
  - npm漏洞编号：`1098681`
  - 漏洞详细说明：https://github.com/advisories/GHSA-952p-6rrq-rcjv
  - 漏洞等级：中危
  - 受影响的版本：`<4.0.8`


**依赖关系**：



- `newsapp` / `vite-plugin-svg-icons` / `svg-baker` / `micromatch`

  
  

**漏洞包所在目录**：

- `node_modules/svg-baker/node_modules/micromatch`





## 中危漏洞

共计 **1** 个


### `postcss`

**漏洞描述**：

- Regular Expression Denial of Service in postcss
  - npm漏洞编号：`1093539`
  - 漏洞详细说明：https://github.com/advisories/GHSA-566m-qj78-rww5
  - 漏洞等级：中危
  - 受影响的版本：`<7.0.36`

- PostCSS line return parsing error
  - npm漏洞编号：`1109574`
  - 漏洞详细说明：https://github.com/advisories/GHSA-7fh5-64p2-3v2j
  - 漏洞等级：中危
  - 受影响的版本：`<8.4.31`


**依赖关系**：



- `newsapp` / `vite-plugin-svg-icons` / `svg-baker` / `postcss`

  
  

**漏洞包所在目录**：

- `node_modules/svg-baker/node_modules/postcss`







