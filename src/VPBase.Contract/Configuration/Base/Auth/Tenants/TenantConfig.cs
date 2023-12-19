using System.Collections.Generic;

namespace VPBase.Contract.Configuration.Base.Auth.Tenants
{
    public class TenantConfig
    {
        public TenantConfig()
        {
            CustomFields = new List<CustomFieldConfig>();
            Groups = new List<GroupConfig>();
        }

        public string TenantId {  get; set; }

        public string Name { get; set; }

        public List<CustomFieldConfig> CustomFields { get; set; }

        public List<GroupConfig> Groups { get; set; }
    }
}
