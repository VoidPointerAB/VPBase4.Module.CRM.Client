using System.Collections.Generic;

namespace VPBase.Contract.SharedInterfaces
{
    public interface IVirtualFolderFileHandler
    {
        IEnumerable<string> ReadFilesDataFromVirtualPath(string fileNameStartWith);

        void WriteConfigFileToVirtualPath(string jsonData, string fileName);
    }
}
