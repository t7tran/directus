<template>
	<v-notice v-if="collection === null" class="full" type="warning">
		{{ t('interfaces.list-o2m.no_collection') }}
	</v-notice>
	<div v-else class="form-grid">
		<div class="field full">
			<p class="type-label">{{ t('interfaces.select-dropdown-m2o.display_template') }}</p>
			<v-field-template v-model="template" :collection="relatedCollection" :depth="2"></v-field-template>
		</div>

		<v-form v-model="formOptions" :fields="formFields" class="field full" />
	</div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { Field, Relation } from '@directus/shared/types';
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
	props: {
		collection: {
			type: String,
			required: true,
		},
		fieldData: {
			type: Object as PropType<Field>,
			default: null,
		},
		relations: {
			type: Array as PropType<Relation[]>,
			default: () => [],
		},
		value: {
			type: Object as PropType<Record<string, any>>,
			default: null,
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const { t } = useI18n();

		const template = computed({
			get() {
				return props.value?.template;
			},
			set(newTemplate: string) {
				emit('input', {
					...(props.value || {}),
					template: newTemplate,
				});
			},
		});

		const relatedCollection = computed(() => {
			if (!props.fieldData || !props.relations || props.relations.length === 0) return null;
			const { field } = props.fieldData;
			const relation = props.relations.find(
				(relation) => relation.collection === props.collection && relation.field === field
			);
			return relation?.related_collection || null;
		});

		const formOptions = computed({
			get() {
				return { filter: props.value?.filter || null };
			},
			set(options: Record<string, unknown>) {
				emit('input', {
					...(props.value || {}),
					...options,
				});
			},
		});

		const formFields = computed(() => [
			{
				field: 'filter',
				name: t('filter'),
				type: 'json',
				meta: {
					interface: 'system-filter',
					options: {
						collectionName: relatedCollection.value,
					},
				},
			},
		]);

		return { t, template, relatedCollection, formOptions, formFields };
	},
});
</script>
