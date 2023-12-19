using System.Collections.Generic;

namespace VPBase.Contract.Configuration.Base.Auth.Users
{
    public class UserHeadConfig : HeadConfig
    {
        public List<UserConfig> Data { get; set; }
    }
}
