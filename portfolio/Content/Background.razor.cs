using Microsoft.AspNetCore.Components;
using portfolio.JsInteropTolls.background;
using portfolio.JsInteropTolls.PageInteraction;
using System;
using System.Threading.Tasks;


namespace portfolio.Content
{
    public partial class Background
    {
        [Inject] JsBackgroundModuleService _backgroundModuleService { get; set; }
        [Inject] JsPageInteractionModuleService _jsPageInteractionModuleService { get; set; }

        private string top = "0px";
        private ElementReference Container;

        public Background() {}


        public void ScrollTop(int pixels)
        {
            top = $"-{pixels}px";
            StateHasChanged();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await _backgroundModuleService.CreateBackgroundApp(Container);
            }
        }
    }
}
