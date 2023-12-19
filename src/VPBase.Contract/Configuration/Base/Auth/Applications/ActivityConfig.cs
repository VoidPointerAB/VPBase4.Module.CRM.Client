namespace VPBase.Contract.Configuration.Base.Auth.Applications
{
    public class ActivityConfig
    {
        public string ActivityId { get; set; }
        public int SortOrder { get; set; }
        public string Name { get; set; }
        public string ClaimType { get; set; }
        public bool Active { get; set; }
        public string Description { get; set; }
    }
}
