using System;
using System.Collections.Generic;
using System.Linq;
using VPBase.Contract.Configuration.Base.Auth.Applications;
using VPBase.Contract.Configuration.Base.Auth.Tenants;
using VPBase.Contract.Configuration.Base.Auth.Users;
using VPBase.Contract.SharedInterfaces;

namespace VPBase.Contract.Configuration
{
    public class ConfigHandler : IConfigEntities, ITransferConfigEntities
    {
        private readonly List<ApplicationConfig> _applications;
        private readonly List<TenantConfig> _tenants;
        private readonly List<UserConfig> _users;

        private readonly IVirtualFolderFileHandler _virtualFolderFileHandler;
        private readonly ConfigConverter _configConverter;
        private readonly IContractLogger _logger;

        public const string AppConfigStartWith = "appconfig.";
        public const string TenantConfigStartWith = "tenantconfig.";
        public const string UserConfigStartWith = "userconfig.";

        public const string FileExtension = ".json";
        public const int MinFileStringLength = 80;

        public ConfigHandler(IVirtualFolderFileHandler virtualFolderFileHandler, ConfigConverter configConverter, IContractLogger logger)
        {
            _virtualFolderFileHandler = virtualFolderFileHandler;
            _configConverter = configConverter;
            _logger = logger;

            _applications = new List<ApplicationConfig>();
            _tenants = new List<TenantConfig>();
            _users = new List<UserConfig>();
        }

        #region IConfigEntities

        public void AddApplication(ApplicationConfig application)
        {
            _applications.Add(application);
        }

        public void AddTenant(TenantConfig tenant)
        {
            _tenants.Add(tenant);
        }

        public void AddUserRange(IEnumerable<UserConfig> users)
        {
            _users.AddRange(users);
        }
        
        public IEnumerable<ApplicationConfig> GetApplications()
        {
            return _applications;
        }

        public IEnumerable<TenantConfig> GetTenants()
        {
            return _tenants;
        }

        public IEnumerable<UserConfig> GetUsers()
        {
            return _users;
        }

        #endregion

        #region ITransferConfigEntities

        public void ImportApplications()
        {
            var filesContent = _virtualFolderFileHandler.ReadFilesDataFromVirtualPath(AppConfigStartWith);
            foreach (var fileContent in filesContent)
            {
                try
                {
                    var application = _configConverter.JsonToApplication(fileContent);
                     AddApplication(application);
                     _logger.LogInformation("Imported application: " + application.Name);                    
                }
                catch (Exception e)
                {
                    _logger.LogError("Fail to import application", e);
                }
            }
        }

        public void ImportTenants()
        {
            var filesContent = _virtualFolderFileHandler.ReadFilesDataFromVirtualPath(TenantConfigStartWith);
            foreach (var fileContent in filesContent)
            {
                try
                {
                    var tenant = _configConverter.JsonToTenant(fileContent);
                    AddTenant(tenant);
                    _logger.LogInformation("Imported tenant: " + tenant.Name);
                }
                catch (Exception e)
                {
                    _logger.LogError("Fail to import tenant", e);
                }
            }
        }

        public void ImportUsers()
        {
            var filesContent = _virtualFolderFileHandler.ReadFilesDataFromVirtualPath(UserConfigStartWith);
            foreach (var fileContent in filesContent)
            {
                try
                {
                    var users = _configConverter.JsonToUsers(fileContent);
                    AddUserRange(users);
                     _logger.LogInformation("Imported users: " + users.Count());
                    
                }
                catch (Exception e)
                {
                    _logger.LogError("Fail to import user", e);
                }
            }
        }

        public void ExportApplication(ApplicationConfig application)
        {
            try
            {
                var name = application.Name.Replace(" ", "").ToLower();
                var fileName = string.Format("{0}{1}{2}", AppConfigStartWith, name, FileExtension);
                var applicationJson = _configConverter.ApplicationToJson(application);
                _virtualFolderFileHandler.WriteConfigFileToVirtualPath(applicationJson, fileName);
                _logger.LogInformation("Exported application to file: " + fileName);
            }
            catch (Exception e)
            {
                _logger.LogError("Fail to export application", e);
            }
        }

        public void ExportApplications()
        {
            foreach (var application in _applications)
            {
                ExportApplication(application);
            }
        }

        public void ExportTenant(TenantConfig tenant)
        {
            try
            {
                var name = tenant.Name.Replace(" ", "").ToLower();
                var fileName = string.Format("{0}{1}{2}", TenantConfigStartWith, name, FileExtension);
                var tenantJson = _configConverter.TenantToJson(tenant);
                _virtualFolderFileHandler.WriteConfigFileToVirtualPath(tenantJson, fileName);
                _logger.LogInformation("Exported tenant to file: " + fileName);
            }
            catch (Exception e)
            {
                _logger.LogError("Fail to export tenant", e);
            }
        }

        public void ExportTenants()
        {
            foreach (var tenant in _tenants)
            {
                ExportTenant(tenant);
            }
        }

        public void ExportUsers(string name, IEnumerable<UserConfig> users)
        {
            try
            {
                var fileName = string.Format("{0}{1}{2}", UserConfigStartWith, name, FileExtension);
                var userJson = _configConverter.UsersToJson(users);
                _virtualFolderFileHandler.WriteConfigFileToVirtualPath(userJson, fileName);
                _logger.LogInformation("Exported users to file: " + fileName);
            }
            catch (Exception e)
            {
                _logger.LogError("Fail to export user", e);
            }
        }

        public void ExportUsers()
        {
            ExportUsers("allusers", _users);
        }

        public void Clear()
        {
            _applications.Clear();
            _tenants.Clear();
            _users.Clear();
        }

        #endregion
    }
}
