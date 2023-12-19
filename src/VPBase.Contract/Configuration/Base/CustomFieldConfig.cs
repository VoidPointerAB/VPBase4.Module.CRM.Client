namespace VPBase.Contract.Configuration.Base
{
    public class CustomFieldConfig
    {
        public CustomFieldConfig(string tenantId)
        {
            TenantId = tenantId;
        }

        public string TenantId { get; }

        public string CustomFieldId { get; set; }

        public string Title { get; set; }

        public string TabName { get; set; }

        public CustomFieldDataConfigType DataType { get; set; }

        public CustomFieldConfigType  FieldType { get; set; }

        public bool FieldNeedToBeAnonymized { get; set; }

        public string CustomFieldEntityId { get; set; }

        public string OptionFieldsJson { get; set; }

        public string OptionValuesJson { get; set; }
    }
}
