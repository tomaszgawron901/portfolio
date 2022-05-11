using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace portfolio.JsInteropTolls
{
    public abstract class JsModuleService : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> LazyModule;

        public JsModuleService(IJSRuntime jsRuntime, string modulePath)
        {
            LazyModule = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", modulePath).AsTask());
        }

        protected async ValueTask InvokeVoidAsync(string functionName, params object?[]? parameters)
        {
            var module = await LazyModule.Value;
            await module.InvokeVoidAsync(functionName, parameters);
        }

        protected async ValueTask<TValue> InvokeAsync<TValue>(string functionName, params object?[]? parameters)
        {
            var module = await LazyModule.Value;
            return await module.InvokeAsync<TValue>(functionName, parameters);
        }

        public virtual async ValueTask DisposeAsync()
        {
            if (LazyModule.IsValueCreated)
            {
                var module = await LazyModule.Value;
                await module.DisposeAsync();
            }
        }
    }
}
