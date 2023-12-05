import { computed, toRef, useAttrs, useSlots, watch } from 'vue';
import ErrorBoundary from './ErrorBoundary.vue';
import { useParseBinding } from '@/core/JsRuntime/useBinding';
import { __VLS_TypePropsToRuntimeProps, __VLS_WithTemplateSlots } from './index.vue';

export default await (async () => {
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps<{
componentName: string;
nodeProps: Record<string, any>;
}>();

// 绑定组件props
const nodePropsRef = toRef(props, 'nodeProps');

const { memoizedProps } = useParseBinding(nodePropsRef);

const modelValue = computed({
get: () => memoizedProps.value?.modelValue ?? '',
set: _val => {
}
});

watch(
() => nodePropsRef.value,
() => {
// console.log('nodePropsRef', nodePropsRef.value)
},
{ immediate: true, deep: true }
);

const slots = useSlots();
const attrs = useAttrs();

const __VLS_componentsOption = {};

const __VLS_name = 'WrapComponent' as const;
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'ErrorBoundary', typeof __VLS_localComponents, "ErrorBoundary", "ErrorBoundary", "ErrorBoundary">;
__VLS_components.ErrorBoundary; __VLS_components.ErrorBoundary;
// @ts-ignore
[ErrorBoundary, ErrorBoundary,];
__VLS_intrinsicElements.template; __VLS_intrinsicElements.template;
{
const __VLS_0 = ({} as 'ErrorBoundary' extends keyof typeof __VLS_ctx ? { 'ErrorBoundary': typeof __VLS_ctx.ErrorBoundary; } : typeof __VLS_resolvedLocalAndGlobalComponents).ErrorBoundary;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, }));
({} as { ErrorBoundary: typeof __VLS_0; }).ErrorBoundary;
({} as { ErrorBoundary: typeof __VLS_0; }).ErrorBoundary;
const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
const __VLS_5 = (__VLS_ctx.componentName);
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{ "onUpdate:modelValue": {} as any, }, ...({ ...__VLS_ctx.attrs, ...__VLS_ctx.memoizedProps, 'model-value': __VLS_ctx.modelValue }), }));
const __VLS_7 = __VLS_6({ ...{ "onUpdate:modelValue": {} as any, }, ...({ ...__VLS_ctx.attrs, ...__VLS_ctx.memoizedProps, 'model-value': __VLS_ctx.modelValue }), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ "onUpdate:modelValue": {} as any, }, ...({ ...__VLS_ctx.attrs, ...__VLS_ctx.memoizedProps, 'model-value': __VLS_ctx.modelValue }), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
let __VLS_10 = { 'update:model-value': __VLS_pickEvent(__VLS_9['update:model-value'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_6, typeof __VLS_7>)["onUpdate:modelValue"]) };
__VLS_10 = { "update:model-value": ((newValue: number) => (__VLS_ctx.modelValue = newValue)) };
for (const [k] of __VLS_getVForSourceType((Object.keys(__VLS_ctx.slots))!)) {
{
const __VLS_11 = __VLS_intrinsicElements["template"];
const __VLS_12 = __VLS_elementAsFunctionalComponent(__VLS_11);
const __VLS_13 = __VLS_12({ ...{}, key: ((k)), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_11, typeof __VLS_13> & Record<string, unknown>) => void)({ ...{}, key: ((k)), });
{
(__VLS_8.slots!)[k];
{
const __VLS_14 = ({} as 'Slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.Slot; } : 'slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.slot; } : typeof __VLS_resolvedLocalAndGlobalComponents).slot;
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ ...{}, }));
const __VLS_16 = __VLS_15({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_15));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_14, typeof __VLS_16> & Record<string, unknown>) => void)({ ...{}, });
(k);
var __VLS_17 = {};
var __VLS_18 = (k) as const;
}
// @ts-ignore
[componentName, attrs, memoizedProps, modelValue, attrs, memoizedProps, modelValue, attrs, memoizedProps, modelValue, modelValue, slots,];
}
}
}
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: Partial<Record<NonNullable<typeof __VLS_18>, (_: typeof __VLS_17) => any>> &
{};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
ErrorBoundary: ErrorBoundary as typeof ErrorBoundary,
memoizedProps: memoizedProps as typeof memoizedProps,
modelValue: modelValue as typeof modelValue,
slots: slots as typeof slots,
attrs: attrs as typeof attrs,
};
},
props: {} as __VLS_TypePropsToRuntimeProps<{
componentName: string;
nodeProps: Record<string, any>;
}>,

name: 'WrapComponent'
});
const __VLS_component = (await import('vue')).defineComponent({
setup() {
return {};
},
props: {} as __VLS_TypePropsToRuntimeProps<{
componentName: string;
nodeProps: Record<string, any>;
}>,

name: 'WrapComponent'
});
return {} as __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
})();
