import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProviderRequirement } from '../../../core/models/provider.interface';

export const providerStockManagementActions = createActionGroup({
    source: 'Provider Stock Events In Management Module',
    events: {
        'Load All Provider Requirements': emptyProps(),
        'Load All Provider Requirements Success': props<{
            loadedProviderRequirements: IProviderRequirement[];
        }>(),
        'Load All Provider Requirements Failed': props<{error: any}>(),

        'Select Provider Requirement': props<{providerRequirementId: string}>(),
    }
});
