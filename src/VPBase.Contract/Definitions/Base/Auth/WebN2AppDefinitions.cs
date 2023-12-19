using System.Collections.Generic;
using VPBase.Contract.Configuration;
using VPBase.Contract.Configuration.Base.Auth.Applications;

namespace VPBase.Contract.Definitions.Base.Auth
{
    /// <summary>
    /// To use for TEMPLATE when using Gen3 WebN2App
    /// </summary>
    public class WebN2AppDefinitions
    {
        public const string ModuleName = "WebN2";

        #region application

        public static ApplicationConfig GetApplication()
        {
            return new ApplicationConfig()
            {
                ApplicationId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.Application, "WebMvcApplication"),
                PrefixName = ModuleName,
                Name = "WebN2 Portal",
                ApplicationClients = GetAllClients(),
                Roles = GetAllRoles()
            };
        }

        #endregion

        #region clients

        public static ApplicationClientConfig ClientWebClient = new ApplicationClientConfig()
        {
            ClientId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.ApplicationClient, "WebMvc"),
            ClientName = "WebN2 Mvc Web Client",
            AllowedGrantTypes = GlobalAppDefinitions.GrantTypesImplicit,
            AllowedScopes = new List<string>() { GlobalAppDefinitions.StandardScopeOpenId, GlobalAppDefinitions.StandardScopeProfile },
            ProtocolType = GlobalAppDefinitions.ProtocolOpenIdConnect,
            Secret = "webN2WebClient2019##"
        };

        public static ApplicationClientConfig ClientRestClient = new ApplicationClientConfig()
        {
            ClientId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.ApplicationClient, "Rest"),
            ClientName = "WebN2 Rest Client",
            AllowedGrantTypes = GlobalAppDefinitions.GrantTypesImplicit,
            AllowedScopes = new List<string>(){ GlobalAppDefinitions.StandardScopeOpenId, GlobalAppDefinitions.StandardScopeProfile },
            ProtocolType = GlobalAppDefinitions.ProtocolOpenIdConnect,
            Secret = "webN2RestClient2019##"
        };

        public static List<ApplicationClientConfig> GetAllClients()
        {
            return new List<ApplicationClientConfig>()
            {
                ClientWebClient,
                ClientRestClient
            };
        }

        #endregion

        #region roles

        public static RoleConfig RoleAdmin = new RoleConfig()
        {
            RoleId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.Role, "Admin"),
            Name = ModuleName + " Admin"
        };

        public static RoleConfig RoleAdminUser = new RoleConfig()
        {
            RoleId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.Role, "AdminUser"),
            Name = ModuleName + " AdminUser"
        };

        public static RoleConfig RoleDisabled = new RoleConfig()
        {
            RoleId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.Role, "Disabled"),
            Name = ModuleName + " Disabled"
        };

        public static RoleConfig RoleMobile = new RoleConfig()
        {
            RoleId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.Role, "Mobile"),
            Name = ModuleName + " Mobile"
        };

        public static RoleConfig RoleN2User = new RoleConfig()
        {
            RoleId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.Role, "N2User"),
            Name = ModuleName + " N2User"
        };

        public static RoleConfig RoleN2Admin = new RoleConfig()
        {
            RoleId = ConfigIdHelper.GetId(GlobalDefinitions.CustomerBaseId, ModuleName, ConfigEntityType.Role, "N2Admin"),
            Name = ModuleName + " N2Admin"
        };

        public static List<RoleConfig> GetAllRoles()
        {
            return new List<RoleConfig>()
            {
                RoleAdmin,
                RoleAdminUser,
                RoleDisabled,
                RoleMobile,
                RoleN2User,
                RoleN2Admin
            };
        }

        #endregion
    }
}
