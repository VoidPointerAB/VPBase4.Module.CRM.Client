using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using VPBase.Contract.Configuration.Base.Auth.Applications;
using VPBase.Contract.Configuration.Base.Auth.Tenants;
using VPBase.Contract.Configuration.Base.Auth.Users;
using VPBase.Contract.SharedInterfaces;

namespace VPBase.Contract.Configuration
{
    public class ConfigConverter
    {
        private readonly IConfigJsonConverter _configJsonConverter;

        public ConfigConverter(IConfigJsonConverter configJsonConverter)
        {
            _configJsonConverter = configJsonConverter;
        }
        public string ApplicationToJson(ApplicationConfig application)
        {
            var headConfig = GetCurrentHeadConfig();
            var applicationHead = new ApplicationHeadConfig
            {
                Data = application,
                BaseVersion = headConfig.BaseVersion
            };

            // Todo: encrypt passwords

            var output = _configJsonConverter.SerializeObject(applicationHead);

            return output;
        }

        public ApplicationConfig JsonToApplication(string json)
        {
            var applicationHead = _configJsonConverter.DeserializeObject<ApplicationHeadConfig>(json);

            ValidateHead(applicationHead);
            ValidateApplication(applicationHead.Data);

            // Todo: decrypt passwords

            return applicationHead.Data;
        }

        public string TenantToJson(TenantConfig tenant)
        {
            var headConfig = GetCurrentHeadConfig();
            var tenantHead = new TenantHeadConfig()
            {
                Data = tenant,
                BaseVersion = headConfig.BaseVersion
            };

            var output = _configJsonConverter.SerializeObject(tenantHead);

            return output;
        }

        public TenantConfig JsonToTenant(string json)
        {
            var tenantHead = _configJsonConverter.DeserializeObject<TenantHeadConfig>(json);

            ValidateHead(tenantHead);
            ValidateTenant(tenantHead.Data);

            return tenantHead.Data;
        }

        public string UsersToJson(IEnumerable<UserConfig> users)
        {
            var headConfig = GetCurrentHeadConfig();
            var userHead = new UserHeadConfig()
            {
                Data = users.ToList(),
                BaseVersion = headConfig.BaseVersion
            };

            var output = _configJsonConverter.SerializeObject(userHead);

            return output;
        }

        public IEnumerable<UserConfig> JsonToUsers(string json)
        {
            var userHead = _configJsonConverter.DeserializeObject<UserHeadConfig>(json);

            ValidateHead(userHead);
            ValidateUsers(userHead.Data);

            return userHead.Data;
        }

        private HeadConfig GetCurrentHeadConfig()
        {
            var version = Assembly.GetEntryAssembly().GetName().Version;

            return new HeadConfig()
            {
                BaseVersion = version.ToString()
            };
        }

        private void ValidateHead(HeadConfig head)
        {
            var typeMessage = "Validate Head Exception.";

            if (string.IsNullOrEmpty(head.BaseVersion))
            {
                throw new ValidationException(typeMessage + "BaseVersion is null or empty!");
            }
        }

        private void ValidateApplication(ApplicationConfig application)
        {
            var typeMessage = "Validate Application Exception.";

            if (application == null)
            {
                throw new ValidationException(typeMessage + "No application is definied!");
            }

            if (string.IsNullOrEmpty(application.ApplicationId))
            {
                throw new ValidationException(typeMessage + "ApplicationId is null or empty!");
            }
        }

        private void ValidateTenant(TenantConfig tenant)
        {
            var typeMessage = "Validate Tenant Exception";

            if (tenant == null)
            {
                throw new ValidationException(typeMessage + "No tenant is definied!");
            }

            if (string.IsNullOrEmpty(tenant.TenantId))
            {
                throw new ValidationException(typeMessage + "TenantId is null or empty!");
            }
        }

        private void ValidateUsers(IEnumerable<UserConfig> users)
        {
            var typeMessage = "Validate Users Exception";

            if (users == null)
            {
                throw new ValidationException(typeMessage + "No users are definied!");
            }

            foreach (var user in users)
            {
                if (string.IsNullOrEmpty(user.UserId))
                {
                    throw new ValidationException(typeMessage + "UserId is null or empty!");
                }
            }
            
        }
    }
}
