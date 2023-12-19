using System.Collections.Generic;
using VPBase.Contract.Configuration.Base.Auth.Applications;
using VPBase.Contract.Configuration.Base.Auth.Tenants;
using VPBase.Contract.Configuration.Base.Auth.Users;

namespace VPBase.Contract.Configuration
{
    public interface IConfigEntities
    {
        void AddApplication(ApplicationConfig application);
        void AddTenant(TenantConfig tenant);
        void AddUserRange(IEnumerable<UserConfig> users);

        IEnumerable<ApplicationConfig> GetApplications();
        IEnumerable<TenantConfig> GetTenants();
        IEnumerable<UserConfig> GetUsers();
    }
}