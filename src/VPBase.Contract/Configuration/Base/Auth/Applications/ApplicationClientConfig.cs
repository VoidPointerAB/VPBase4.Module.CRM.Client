using System.Collections.Generic;

namespace VPBase.Contract.Configuration.Base.Auth.Applications
{
    public class ApplicationClientConfig
    {
        public ApplicationClientConfig()
        {
            RequireConsent = true;
            AllowRememberConsent = true;
        }

        public string ClientId { get; set; }

        // IdentityServer properties:

        public List<string> AllowedGrantTypes { get; set; }         // Mandatory for IdentityServer

        public string ClientName { get; set; }

        public string Secret { get; set; }                          // Note: We only specify one secret per client and the input is always SHA256 hashed

        public List<string> AllowedScopes { get; set; }

        public List<string> RedirectUris { get; set; }              // Use when using: Implicit client

        public List<string> PostLogoutRedirectUris { get; set; }    // Use when using: Implicit client

        public string ProtocolType { get; set; }

        public bool RequireConsent { get; set; }

        public bool AllowRememberConsent { get; set; }
    }
}