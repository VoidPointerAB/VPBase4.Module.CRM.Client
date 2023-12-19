using Newtonsoft.Json;
using VPBase.Contract.SharedInterfaces;

namespace VPBase.Contract.NetCore
{
    public class NetCoreConfigJsonConverter : IConfigJsonConverter
    {
        public string SerializeObject(object value)
        {
            return JsonConvert.SerializeObject(value);
        }

        public T DeserializeObject<T>(string value)
        {
            return JsonConvert.DeserializeObject<T>(value);
        }
    }
}
