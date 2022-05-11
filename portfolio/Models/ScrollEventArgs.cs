using Microsoft.AspNetCore.Components;
using System;

namespace portfolio.Models
{
    [EventHandler("oncustomscroll", typeof(ScrollEventArgs), enableStopPropagation: true, enablePreventDefault: true)]
    public static class EventHandlers
    {
    }

    public class ScrollEventArgs: EventArgs
    {
        public int? ScrollTop { get; set; }
        public int? ScrollHeight { get; set; }
        public int? ScrollLeft { get; set; }
        public int? ScrollWidth { get; set; }
        public int? ScrollTopMax { get; set; }
        public int? ScrollLeftMax { get; set; }
    }
}
