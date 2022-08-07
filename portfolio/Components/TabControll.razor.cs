using Microsoft.AspNetCore.Components;
using portfolio.Content;
using portfolio.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace portfolio.Components;

public partial class TabControll
{
    [Parameter] public RenderFragment? ChildContent { get; set; }
    [Parameter] public RenderFragment? MainPage { get; set; }

    [Parameter] public EventCallback<ScrollEventArgs> OnScroll { get; set; }
    

    protected List<Page> Pages = new List<Page>();
    public Page? ActivePage { get; set; }

    private TopNavigator? Navigation;

    private Background? Background;

    private async Task Scrolled(ScrollEventArgs e)
    {
        if (e is null) return;

        await OnScroll.InvokeAsync(e);
        
        if ( e.ScrollTop is not null)
        {
            Background?.ScrollTop((int)e.ScrollTop / 2);
            Navigation?.SetBackgroundTransparency(e.ScrollTop == 0);
        }

        foreach (Page page in Pages)
        {
            if (await page.IsInCenter())
            {
                ActivePage = page;
                break;
            }
        }
    }

    internal void AddPage(Page page)
    {
        Pages.Add(page);
        if (Pages.Count == 1)
        {
            ActivePage = page;
        }
        StateHasChanged();
    }

    public Task ScrollTo(int index)
    {
        if (index > Pages.Count || index < 0) return Task.CompletedTask;
        return Pages[index].ScrollTo();
    }
}
