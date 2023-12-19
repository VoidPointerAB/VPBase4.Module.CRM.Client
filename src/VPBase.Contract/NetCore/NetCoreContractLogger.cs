using System;
using Microsoft.Extensions.Logging;
using VPBase.Contract.SharedInterfaces;

namespace VPBase.Contract.NetCore
{
    public class NetCoreContractLogger : IContractLogger
    {
        private readonly ILogger _logger;

        public NetCoreContractLogger(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger("NetCoreContractLogger");
        }

        public void LogInformation(string message)
        {
            _logger.LogInformation(message);
        }

        public void LogError(string message)
        {
            _logger.LogError(message);
        }

        public void LogError(string message, Exception ex)
        {
            _logger.LogError(ex, message);
        }
    }
}
