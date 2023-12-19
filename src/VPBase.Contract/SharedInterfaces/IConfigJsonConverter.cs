namespace VPBase.Contract.SharedInterfaces
{
    public interface IConfigJsonConverter
    {
        string SerializeObject(object value);

        T DeserializeObject<T>(string value);
    }
}