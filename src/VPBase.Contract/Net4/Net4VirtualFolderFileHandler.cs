using System.Collections.Generic;
using System.IO;
using System.Text;
using VPBase.Contract.Files;
using VPBase.Contract.SharedInterfaces;

namespace VPBase.Contract.Net4
{
    public class Net45VirtualFolderFileHandler : IVirtualFolderFileHandler
    {
        private readonly VirtualFolderFileHandlerSettings _configFileHandlerSettings;

        public Net45VirtualFolderFileHandler(VirtualFolderFileHandlerSettings configFileHandlerSettings)
        {
            _configFileHandlerSettings = configFileHandlerSettings;
        }

        public IEnumerable<string> ReadFilesDataFromVirtualPath(string fileNameStartWith)
        {
            var listOfFiles = new List<string>();

            var physicaFolderPath = GetPhysicalFolderPath();

            if (!string.IsNullOrEmpty(physicaFolderPath))
            {
                var directoryInfo = new DirectoryInfo(physicaFolderPath);

                var files = directoryInfo.GetFiles(fileNameStartWith + "*" + _configFileHandlerSettings.FileExtension);

                foreach (var file in files)
                {
                    using (var stream = File.Open(file.FullName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                    {
                        using (var streamReader = new StreamReader(stream, Encoding.UTF8))
                        {
                            var fileData = streamReader.ReadToEnd();
                            listOfFiles.Add(fileData);
                        }
                    }
                }
            }

            return listOfFiles;
        }

        public void WriteConfigFileToVirtualPath(string jsonData, string fileName)
        {
            var physicaFolderPath = GetPhysicalFolderPath();

            var filePath = Path.Combine(physicaFolderPath, fileName);

            using (var writer = new StreamWriter(filePath, false))
            {
                writer.Write(jsonData);
            };
        }

        private string GetPhysicalFolderPath()
        {
            return System.Web.Hosting.HostingEnvironment.MapPath(_configFileHandlerSettings.VirtualPath);
        }
    }
}
