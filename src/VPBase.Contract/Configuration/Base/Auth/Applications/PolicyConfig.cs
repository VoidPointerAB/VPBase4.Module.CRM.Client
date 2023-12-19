using System.Collections.Generic;

namespace VPBase.Contract.Configuration.Base.Auth.Applications
{
    public class PolicyConfig
    {
        public PolicyConfig()
        {
            RequiredClaim = new PolicyClaimConfig();
        }

        public string Name { get; set; }

        public PolicyClaimConfig RequiredClaim { get; set; }

    }

    public class PolicyClaimConfig
    {
        public PolicyClaimConfig()
        {
            RequiredValues = new List<string>();
        }
        public string ClaimType { get; set; }

        public List<string> RequiredValues { get; set; }
    }
}
