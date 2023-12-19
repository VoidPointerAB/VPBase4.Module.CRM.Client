using System.Collections.Generic;

namespace VPBase.Contract.Definitions.Base.Auth
{
    public class GlobalAppDefinitions
    {
        #region Scopes (ApplicationClient)

        public const string BaseApiScope = "vpBaseApi";
        public static readonly List<string> BaseApiScopes = new List<string> { BaseApiScope };      // Use this when protecting Api (clients etc)

        public const string StandardScopeOpenId = "openid";
        public const string StandardScopeProfile = "profile";
        public const string StandardScopeEmail = "email";
        public const string StandardScopeAddress = "address";
        public const string StandardScopePhone = "phone";
        public const string StandardScopeOfflineAccess = "offline_access";

        public static readonly List<string> StandardScopes = new List<string> { StandardScopeOpenId, StandardScopeProfile, StandardScopeEmail, StandardScopeAddress, StandardScopePhone, StandardScopeOfflineAccess };      

        #endregion

        #region GrantTypes (ApplicationClient)

        public static readonly List<string> GrantTypesImplicit = new List<string> { "implicit" };
        public static readonly List<string> GrantTypesClientCredentials = new List<string> { "client_credentials" };
        public static readonly List<string> GrantTypesImplicitAndClientCredentials = new List<string> { "implicit", "client_credentials" };
        public static readonly List<string> GrantTypesCode = new List<string> { "authorization_code" };
        public static readonly List<string> GrantTypesCodeAndClientCredentials = new List<string> { "authorization_code", "client_credentials" };
        public static readonly List<string> GrantTypesHybrid = new List<string> { "hybrid" };
        public static readonly List<string> GrantTypesHybridAndClientCredentials = new List<string> { "hybrid", "client_credentials" };
        public static readonly List<string> GrantTypesResourceOwnerPassword = new List<string> { "password" };
        public static readonly List<string> GrantTypesResourceOwnerPasswordAndClientCredentials = new List<string> { "password", "client_credentials" };

        #endregion

        #region Protocol (ApplicationClient)

        public const string ProtocolOpenIdConnect = "oidc";  // Default
        public const string ProtocolWsFederation = "wsfed";
        public const string ProtocolSaml2p = "saml2p";

        #endregion
    }
}
