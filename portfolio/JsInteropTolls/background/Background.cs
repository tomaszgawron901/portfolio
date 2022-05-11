using Microsoft.JSInterop;
using portfolio.JsInteropTolls.PageInteraction;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;

namespace portfolio.JsInteropTolls.background
{
    public class Background: IJSObjectReference
    {
        protected IJSObjectReference jSObjectReference {  get; set; }
        public Background(IJSObjectReference jSObjectReference)
        {
            this.jSObjectReference = jSObjectReference;
        }

        public ValueTask StartAsync()
        {
            return jSObjectReference.InvokeVoidAsync("start");
        }

        public ValueTask StopAsync()
        {
            return jSObjectReference.InvokeVoidAsync("stop");
        }

        public ValueTask<TValue> InvokeAsync<[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.PublicFields | DynamicallyAccessedMemberTypes.PublicProperties)] TValue>(string identifier, object?[]? args)
        {
            return jSObjectReference.InvokeAsync<TValue>(identifier, args);
        }

        public ValueTask<TValue> InvokeAsync<[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.PublicFields | DynamicallyAccessedMemberTypes.PublicProperties)] TValue>(string identifier, CancellationToken cancellationToken, object?[]? args)
        {
            return jSObjectReference.InvokeAsync<TValue>(identifier, cancellationToken, args);
        }

        public ValueTask DisposeAsync()
        {
            return jSObjectReference.DisposeAsync();
        }
    }
}
