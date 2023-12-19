using System;
using System.Collections.Generic;
using System.Linq;
using VPBase.Contract.Definitions.Base;

namespace VPBase.Contract.Configuration.Base.Auth.Applications
{
    public class ApplicationConfig
    {
        public ApplicationConfig()
        {
            CustomFieldEntityDefinitions = new List<CustomFieldEntityConfigDefinition>();
            ApplicationClients = new List<ApplicationClientConfig>();
            Activities = new List<ActivityConfig>();
            Roles = new List<RoleConfig>();
            Policies = new List<PolicyConfig>();
        }

        public string ApplicationId { get; set; }
        public string PrefixName { get; set; }
        public string Name { get; set; }
        public string Scope { get; set; }
        public string ScopeDescription { get; set; }

        public List<CustomFieldEntityConfigDefinition> CustomFieldEntityDefinitions { get; set; }

        public List<ApplicationClientConfig> ApplicationClients { get; set; }

        public ApplicationClientConfig GetApplicationMvcClient()
        {
            var client = ApplicationClients.FirstOrDefault(x => x.ClientId.ToLower().Contains("mvc"));
            return client ?? new ApplicationClientConfig();
        }

        public void ApplyAllowedRedirectUris(IEnumerable<string> applicationUrls) 
        {
            var mvcClient = GetApplicationMvcClient();

            foreach (var applicationUrl in applicationUrls)
            {
                var baseUri = new Uri(applicationUrl);

                if (mvcClient.RedirectUris == null)
                {
                    mvcClient.RedirectUris = new List<string>();
                }

                mvcClient.RedirectUris.Add(new Uri(baseUri, GlobalDefinitions.RedirectMvcUri).AbsoluteUri);

                if (mvcClient.PostLogoutRedirectUris == null)
                {
                    mvcClient.PostLogoutRedirectUris = new List<string>();
                }

                mvcClient.PostLogoutRedirectUris.Add(new Uri(baseUri, GlobalDefinitions.PostLogoutRedirectMvcUri).AbsoluteUri);
            }
        }

        public ApplicationClientConfig GetApplicationSyncApiClient()
        {
            var client = ApplicationClients.FirstOrDefault(x => x.ClientId.ToLower().Contains("syncapi"));
            return client ?? new ApplicationClientConfig();
        }

        // VPBase.Module
        public ApplicationClientConfig GetApplicationReactClient()
        {
            var client = ApplicationClients.FirstOrDefault(x => x.ClientId.ToLower().Contains("react"));
            return client ?? new ApplicationClientConfig();
        }

        public void ApplyReactAllowedRedirectUris(IEnumerable<string> applicationUrls)
        {
            var reactClient = GetApplicationReactClient();

            foreach (var applicationUrl in applicationUrls)
            {
                var baseUri = new Uri(applicationUrl);

                if (reactClient.RedirectUris == null)
                {
                    reactClient.RedirectUris = new List<string>();
                }

                reactClient.RedirectUris.Add(new Uri(baseUri, GlobalDefinitions.RedirectReactUri).AbsoluteUri);

                if (reactClient.PostLogoutRedirectUris == null)
                {
                    reactClient.PostLogoutRedirectUris = new List<string>();
                }

                reactClient.PostLogoutRedirectUris.Add(new Uri(baseUri, GlobalDefinitions.PostLogoutRedirectReactUri)
                    .AbsoluteUri);
            }
        }

        public List<ActivityConfig> Activities { get; set; }

        public List<RoleConfig> Roles { get; set; }

        public List<PolicyConfig> Policies { get; set; }
    }
}
