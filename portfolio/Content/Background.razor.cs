using Microsoft.AspNetCore.Components;
using portfolio.JsInteropTolls.background;
using portfolio.JsInteropTolls.PageInteraction;
using System.Threading.Tasks;


namespace portfolio.Content
{
    public partial class Background
    {
        [Inject] JsBackgroundModuleService? _backgroundModuleService { get; init; }
        [Inject] JsPageInteractionModuleService? _jsPageInteractionModuleService { get; init; }

        private string top = "0px";
        private ElementReference Container;



        public void ScrollTop(int pixels)
        {
            top = $"-{pixels}px";
            StateHasChanged();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender && _backgroundModuleService is not null)
            {
                await _backgroundModuleService.CreateBackgroundApp(Container);
            }
        }
    }
}
