using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using VPBase.Contract.Files;
using VPBase.Contract.NetCore.FileHandling;
using VPBase.Contract.SharedInterfaces;

namespace VPBase.Contract.NetCore
{
    public class NetCoreVirtualFolderFileHandler : IVirtualFolderFileHandler
    {
        private readonly VirtualFolderFileHandlerSettings _configFileHandlerSettings;
        private readonly IContractLogger _logger;
        private readonly IFileServerProvider _fileServerProvider;

        public NetCoreVirtualFolderFileHandler(VirtualFolderFileHandlerSettings configFileHandlerSettings, 
            IContractLogger contractLogger,
            IFileServerProvider fileServerProvider)
        {
            _configFileHandlerSettings = configFileHandlerSettings;
            _logger = contractLogger;
            _fileServerProvider = fileServerProvider;
        }

        public IEnumerable<string> ReadFilesDataFromVirtualPath(string fileNameStartWith)
        {
            var fileProvider = _fileServerProvider.GetProvider(_configFileHandlerSettings.VirtualPath);
            if (fileProvider == null)
            {
                _logger.LogError("No fileprovider found to read files in config folder! Virtual Path:" + _configFileHandlerSettings.VirtualPath);
                return null;
            }

            var dirContent = fileProvider.GetDirectoryContents(@"");

            var fileContents = new List<string>();

            foreach (var content in dirContent)
            {
                if (!content.IsDirectory && content.Name.ToLower().StartsWith(fileNameStartWith))
                {
                    var extension = Path.GetExtension(content.PhysicalPath);

                    if (!string.IsNullOrEmpty(extension) && extension.ToLower().Contains(_configFileHandlerSettings.FileExtension))
                    {
                        using (var stream = File.OpenRead(content.PhysicalPath))
                        {
                            var fileContent = new StreamReader(stream).ReadToEnd();
                            if (!string.IsNullOrEmpty(fileContent) && fileContent.Length > _configFileHandlerSettings.MinFileLenSize)
                            {
                                fileContents.Add(fileContent);
                            }
                        }
                    }
                }
            }

            return fileContents;
        }

        public void WriteConfigFileToVirtualPath(string jsonData, string fileName)
        {
            try
            {
                var fileProvider = _fileServerProvider.GetProvider(_configFileHandlerSettings.VirtualPath);
                if (fileProvider == null)
                {
                    _logger.LogError("No fileprovider found to read files in config folder! Virtual Path:" + _configFileHandlerSettings.VirtualPath);
                    return;
                }

                var contents = fileProvider.GetDirectoryContents("");
                var content = contents.FirstOrDefault();
                if (content != null)
                {
                    var physicalPath = Path.GetDirectoryName(content.PhysicalPath);

                    var filePath = Path.Combine(physicalPath, fileName);

                    using (var writer = new StreamWriter(filePath, false))
                    {
                        writer.Write(jsonData);
                    };
                }
            }
            catch (Exception e)
            {
                _logger.LogError("Fail to export application", e);
            }
        }
    }
}
