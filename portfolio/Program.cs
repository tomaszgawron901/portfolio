using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using portfolio;
using portfolio.JsInteropTolls;
using portfolio.JsInteropTolls.background;
using portfolio.JsInteropTolls.PageInteraction;
using System;
using System.Net.Http;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton<JsBackgroundModuleService>();
builder.Services.AddSingleton<JsPageInteractionModuleService>();

await builder.Build().RunAsync();
