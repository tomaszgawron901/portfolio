using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace portfolio.JsInteropTolls.PageInteraction
{
    public class DOMEventBridge<T> where T: class
    {
        public delegate void DOMEventHandler(T args);
        private DOMEventHandler? DotNetEventHandlers;

        public void Subscribe(DOMEventHandler eventHandler)
        {
            DotNetEventHandlers += eventHandler;
        }

        public void Unsubscribe(DOMEventHandler eventHandler)
        {
            DotNetEventHandlers -= eventHandler;
        }
        
        [JSInvokable("invoke")]
        public void JsInvoke(T args)
        {
            DotNetEventHandlers?.Invoke(args);
        }
    }
}
