using System;
using VPBase.Contract.SharedInterfaces;

namespace VPBase.Contract.Net4
{
    public class Net45ConfigJsonConverter : IConfigJsonConverter
    {
        public string SerializeObject(object value)
        {
            throw new NotImplementedException();
        }

        public T DeserializeObject<T>(string value)
        {
            throw new NotImplementedException();
        }
    }
}
