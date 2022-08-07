using Microsoft.AspNetCore.Components;


namespace portfolio.Components
{
    public partial class TopNavigator
    {
        [Parameter] public RenderFragment? ChildContent { get; set; }

        private bool SolidBackground { get; set; } = false;

        private bool CollapseNavMenu { get; set; } = true;

        public void ToggleNavMenu()
        {
            CollapseNavMenu = !CollapseNavMenu;
        }

        public void CloseNavMenu()
        {
            CollapseNavMenu = true;
        }

        public void SetBackgroundTransparency(bool transparent=true)
        {
            SolidBackground = !transparent;
        }
    }
}
