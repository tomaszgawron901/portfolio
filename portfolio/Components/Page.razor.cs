using Microsoft.AspNetCore.Components;
using portfolio.JsInteropTolls.PageInteraction;
using System;
using System.Threading.Tasks;


namespace portfolio.Components;

public partial class Page
{
    [Inject]
    JsPageInteractionModuleService JsPageInteractionModuleService { get; set; }
    
    [Parameter]
    public string Icon { get; set; }

    [Parameter]
    public string Label { get; set; }

    [Parameter]
    public RenderFragment ChildContent { get; set; }

    [CascadingParameter]
    public TabControll Parent { get; set; }

    public ElementReference self;


    public virtual void Activate() { }

    public virtual void Deactivate() { }


    public async void ScrollTo()
    {
        await JsPageInteractionModuleService.ScrollToElement(self);
    }

    public async Task<bool> IsInCenter()
    {
        return await JsPageInteractionModuleService.IsInCenter(self);
    }

    protected override void OnInitialized()
    {
        if (Parent is null)
        {
            throw new ArgumentNullException("Page must exist within a TabControl");
        }
        Parent.AddPage(this);
        base.OnInitialized();
    }
}
