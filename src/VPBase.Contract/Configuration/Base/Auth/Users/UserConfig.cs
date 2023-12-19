using System.Collections.Generic;

namespace VPBase.Contract.Configuration.Base.Auth.Users
{
    public class UserConfig
    {
        public UserConfig()
        {
            RoleNames = new List<string>();
            TenantIds = new List<string>();
            UserDetails = new UserDetailConfig();
            IsActive = true;
        }

        public string UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public bool IsActive { get; set; }

        public UserDetailConfig UserDetails { get; set; }

        public List<string> RoleNames { get; set; }

        public List<string> TenantIds { get; set; }

    }

    public class UserDetailConfig
    {
        public string FirstName { get; set; }       // Mandatory
        public string LastName { get; set; }
        public string MainPhone { get; set; }
        public string WorkPhone { get; set; }
        public string Email { get; set; }
        public string OtherEmail { get; set; }
        public string Website { get; set; }
        public string Description { get; set; }
    }
}
