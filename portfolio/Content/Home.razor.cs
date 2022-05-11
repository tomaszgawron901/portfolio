using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using Microsoft.JSInterop;
using portfolio.Components;
using portfolio.JsInteropTolls.background;
using portfolio.JsInteropTolls.PageInteraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace portfolio.Content
{
    public partial class Home
    {
        public Home()
        {

        }
        

        protected override void OnParametersSet()
        {
            Icon = "oi oi-home";
            Label = "Home";
        }

    }
}
