
namespace VPBase.Contract.Definitions.Base
{
    public class GlobalDefinitions
    {
        public const string CustomerBaseId = "VPBase";                              // No Special Customer

        public const string RedirectMvcUri = "signin-oidc";                         

        public const string PostLogoutRedirectMvcUri = "signout-callback-oidc";

        public const string CookieActiveTenantId = "ActiveTenantId";
        public const string CookieActiveTenantName = "ActiveTenantName";
        public const string CookieJwt = "__auth";

        // VPBase.Module
        public const string RedirectReactUri = "signin-oidc";
        public const string PostLogoutRedirectReactUri = "signout-callback-oidc";
    }
}
