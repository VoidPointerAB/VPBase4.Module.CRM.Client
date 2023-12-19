using System;

namespace VPBase.Contract.Configuration.Base
{
    public class CustomFieldValueConfig
    {
        public string CustomFieldValueId { get; set; }
        public string CustomFieldId { get; set; }
        public string EntityId { get; set; }
        //public CustomFieldDataType DataType { get; set; }
        public string StringValue { get; set; }
        public decimal? DecimalValue { get; set; }
        public int? IntValue { get; set; }
        public bool? BoolValue { get; set; }
        public DateTime? DateTimeValue { get; set; }
        public string TimeSpanValue { get; set; }
    }
}
