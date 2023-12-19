Dagge: 2023-10-02.
---------------------------------------------------------------------
Problem att kunna bygga projektet via build_dist_prod_vpazure.bat

* Installerar en äldre version av NodeJs.
https://nodejs.org/download/release/v16.20.2/
node-v16.20.2-x64.msi

* Tar bort node_modules mappen igen.

* npm install --legacy-peer-deps (testar detta först)

added 2625 packages, and audited 2626 packages in 20s
130 packages are looking for funding
  run `npm fund` for details
95 vulnerabilities (13 low, 21 moderate, 54 high, 7 critical)

(funkar inte att bygga).

* npm install --force (testar detta senare)

* npm audit fix --force

* Får detta när jag bygger:

Creating an optimized production build...
Failed to compile.

Module not found: Error: Can't resolve 'config/environmentVariables' in 'D:\Code\GitHub\VPBase4.Module.CRM\src\Clients\ReactClient\src'
Did you mean './config/environmentVariables'?