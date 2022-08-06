
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace portfolio.JsInteropTolls.background;
public class JsBackgroundModuleService : JsModuleService
{
    public JsBackgroundModuleService(IJSRuntime JsRuntime) : base(JsRuntime, "./backgroundApp.js") { }

    public async ValueTask<Background> CreateBackgroundApp(ElementReference element)
    {
        var jsObjRef = await InvokeAsync<IJSObjectReference>("createBackgroundApp", element);
        return new Background(jsObjRef);
    }
}
