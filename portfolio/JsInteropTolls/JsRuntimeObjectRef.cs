using Microsoft.JSInterop;
using System;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace portfolio.JsInteropTolls
{
    public class JsRuntimeObjectRef : IAsyncDisposable
    {
        internal IJSRuntime JsRuntime { get; set; }

        public JsRuntimeObjectRef()
        {
        }

        [JsonPropertyName("__jsObjectRefId")]
        public int JsObjectRefId { get; set; }

        public async ValueTask DisposeAsync()
        {
            await JsRuntime.InvokeVoidAsync("deleteObjectRef", JsObjectRefId);
        }
    }
}
