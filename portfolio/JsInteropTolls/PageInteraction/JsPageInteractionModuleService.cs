using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using portfolio.Models;
using System;
using System.Threading.Tasks;

namespace portfolio.JsInteropTolls.PageInteraction;

public partial class JsPageInteractionModuleService : JsModuleService, IAsyncDisposable
{
    public JsPageInteractionModuleService(IJSRuntime JsRuntime) : base(JsRuntime, "./pageInteractionInterop.js") {}

    public ValueTask ScrollToElement(ElementReference element)
    {
        return InvokeVoidAsync("scrollToElement", element);
    }

    public ValueTask<bool> IsInCenter(ElementReference element)
    {
        return InvokeAsync<bool>("isInCenter", element);
    }
    
    public ValueTask<WindowSizeArgs> GetWindowSize()
    {
        return InvokeAsync<WindowSizeArgs>("getWindowSize");
    }

    //public ValueTask<IJSObjectReference> SubscribeToWindowEvent<T>(string eventName, DOMEventBridge<T> eventBridge) where T : class
    //{
    //    return InvokeAsync<IJSObjectReference>("subscribeToWindowEvent", eventName, DotNetObjectReference.Create(eventBridge));
    //}    

    //public ValueTask<IJSObjectReference> SubscribeToDocumentEvents<T>(string eventName, DOMEventBridge<T> eventBridge) where T : EventArgs
    //{
    //    return InvokeAsync<IJSObjectReference>("subscribeToDocumentEvent", eventName, eventBridge);
    //}

    public override async ValueTask DisposeAsync()
    {
        await base.DisposeAsync();
    }
}
