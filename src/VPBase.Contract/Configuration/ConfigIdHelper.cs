using System;
using System.Text.RegularExpressions;

namespace VPBase.Contract.Configuration
{
    public class ConfigIdHelper
    {
        // Id: [TenantIdPrefix]_[Module]_[EntityType]_[Name/UniqueId]
        public static string GetId(string tenantIdPrefix, ConfigModuleType configModuleType, ConfigEntityType configEntityType, string nameOrUniqueId)
        {
            var configModuleTypeName = Enum.GetName(typeof(ConfigModuleType), configModuleType);
            return GetId(tenantIdPrefix, configModuleTypeName, configEntityType, nameOrUniqueId);
        }

        public static string GetId(string tenantIdPrefix, string moduleName, ConfigEntityType configEntityType, string nameOrUniqueId)
        {
            var configEntityTypeName = Enum.GetName(typeof(ConfigEntityType), configEntityType);

            return string.Format("{0}_{1}_{2}_{3}", tenantIdPrefix, moduleName, configEntityTypeName, nameOrUniqueId);  // Avoid string interpolation since back compability 
        }

        public static string GetUniqueIdFromTenantId(string tenantId, ConfigModuleType configModuleType, ConfigEntityType configEntityType)
        {
            return GetId(GetTenantIdPrefixFromTenantId(tenantId), configModuleType, configEntityType, GenerateUniqueId());
        }

        public static string GetTenantIdPrefixFromTenantId(string tenantId)
        {
            var split = tenantId.Split("_");

            if (split.Length != 4)
            {
                throw new ArgumentException("TenantId not valid! " + tenantId);
            }

            return split[0];
        }

        public static string GenerateUniqueId()
        {
            return Regex.Replace(Convert.ToBase64String(Guid.NewGuid().ToByteArray()), "[/+=]", "");
        }
    }
}
