namespace VPBase.Contract.Configuration
{
    public enum ConfigEntityType
    {
        // Base
        Tenant = 1,
        CustomFieldDefinition = 2,
        CustomField = 3,


        // Auth
        Application = 100,
        ApplicationClient = 101,
        Activity = 102,
        Role = 103,
        Policy = 104,
        User = 105,
        Group = 106,

        // Custom

        // Crm
        ContactCompany = 300,
        ContactPerson = 301,
        ContactActivity = 302,
        ContactAddress = 303,
    }
}
