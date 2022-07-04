using Microsoft.AspNetCore.Components;
using portfolio.Components;
using System.Threading.Tasks;

namespace portfolio.Pages
{
    public partial class Index: ComponentBase
    {
        private TabControll? TabControll { get; set; }
        private Task LearnMoreClicked()
        {
            if (TabControll is null) return Task.CompletedTask;

            return TabControll.ScrollTo(1);
        }
    }
}
