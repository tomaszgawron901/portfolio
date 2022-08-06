using Microsoft.AspNetCore.Components;
using System.Threading.Tasks;


namespace portfolio.Content
{
    public partial class Home
    {
        [Parameter] public EventCallback OnLearnMoreClicked { get; set; }

        public Home(){}
        
        protected override void OnParametersSet()
        {
            Icon = "oi oi-home";
            Label = "Home";
        }
        
        private Task LearnMoreClicked()
        {
            return OnLearnMoreClicked.InvokeAsync();
        }

    }
}
