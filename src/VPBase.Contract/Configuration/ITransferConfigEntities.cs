using System.Collections.Generic;
using VPBase.Contract.Configuration.Base.Auth.Applications;
using VPBase.Contract.Configuration.Base.Auth.Users;
using VPBase.Contract.Configuration.Base.Auth.Tenants;

namespace VPBase.Contract.Configuration
{
    public interface ITransferConfigEntities
    {
        void ImportApplications();
        void ImportTenants();
        void ImportUsers();

        void ExportApplication(ApplicationConfig application);
        void ExportApplications();
        void ExportTenant(TenantConfig tenant);
        void ExportTenants();
        void ExportUsers(string name, IEnumerable<UserConfig> users);
        void ExportUsers();

        void Clear();
    }
}
