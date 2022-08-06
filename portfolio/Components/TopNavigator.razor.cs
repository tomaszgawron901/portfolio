using Microsoft.AspNetCore.Components;


namespace portfolio.Components
{
    public partial class TopNavigator
    {
        [Parameter] public RenderFragment? ChildContent { get; set; }

        private bool collapseNavMenu = true;

        private string NavMenuCssClass => collapseNavMenu ? "collapse" : "";

        public void ToggleNavMenu()
        {
            collapseNavMenu = !collapseNavMenu;
        }

        public void CloseNavMenu()
        {
            collapseNavMenu = true;
        }
    }
}
