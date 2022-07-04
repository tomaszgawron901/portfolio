using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace portfolio.JsInteropTolls.PageInteraction
{
    public class DOMEventBridge<T> where T: EventArgs
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

        public static DOMEventBridge<T> operator + (DOMEventBridge<T> bridge, DOMEventHandler eventHandler)
        {
            bridge.Subscribe(eventHandler);
            return bridge;
        }

        public static DOMEventBridge<T> operator - (DOMEventBridge<T> bridge, DOMEventHandler eventHandler)
        {
            bridge.Unsubscribe(eventHandler);
            return bridge;
        }
    }
}
