using System;

namespace VPBase.Contract.SharedInterfaces
{
    public interface IContractLogger
    {
        void LogInformation(string message);

        void LogError(string message);

        void LogError(string message, Exception ex);
    }
}
