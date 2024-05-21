import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";

export interface ITabData {
    tabRouterLink: string;
    tabTitle: string;
    iconName: OutlineSvgNames;
    fillColor: string;
}

export interface IFeatureLinkData {
    featurePrimaryOutletLink: string;
    featureTitle: string;
    iconName: OutlineSvgNames;
    tabs: ITabData[];
}

export const featureLinkDatas: IFeatureLinkData[] = [
    {
        featurePrimaryOutletLink: 'product-catalog',
        featureTitle: 'Product and catalog features',
        iconName: OutlineSvgNames.Cart,
        tabs: [
            {
                tabRouterLink: 'product-catalog/product-list',
                tabTitle: 'All products',
                iconName: OutlineSvgNames.PriceTags,
                fillColor: '#ddd'
            },
            {
                tabRouterLink: 'product-catalog/catalog-list',
                tabTitle: 'All catalogs',
                iconName: OutlineSvgNames.CatalogList,
                fillColor: '#ddd'
            },
            {
                tabRouterLink: 'product-catalog/catalog-add',
                tabTitle: 'Add new catalog',
                iconName: OutlineSvgNames.ActionAdd,
                fillColor: '#ddd'
            },
            {
                tabRouterLink: 'product-catalog/subcatalog-add',
                tabTitle: 'Add new subcatalog',
                iconName: OutlineSvgNames.ActionAdd,
                fillColor: '#ddd'
            }
        ]
    },
    {
        featurePrimaryOutletLink: 'provider-stock',
        featureTitle: 'Provider and stock features',
        iconName: OutlineSvgNames.Cube,
        tabs: [
            {
                tabRouterLink: 'provider-stock/provider-list',
                tabTitle: 'Provider list',
                iconName: OutlineSvgNames.StocksStack,
                fillColor: '#000'
            },
            {
                tabRouterLink: 'provider-stock/stock-list',
                tabTitle: 'Make stock adjustments',
                iconName: OutlineSvgNames.StocksWarehouse,
                fillColor: '#000'
            },
            {
                tabRouterLink: 'provider-stock/add-stock',
                tabTitle: 'Add Stock',
                iconName: OutlineSvgNames.StocksOpen,
                fillColor: '#000'
            }
        ]
    },
    {
        featurePrimaryOutletLink: 'sale-coupon',
        featureTitle: 'Sale and coupons features',
        iconName: OutlineSvgNames.Discount,
        tabs: [
            {
                tabRouterLink: 'sale-coupon/coupon-list',
                tabTitle: 'All coupons',
                iconName: OutlineSvgNames.PriceTags,
                fillColor: '#ddd'
            },
            {
                tabRouterLink: 'sale-coupon/sale-list',
                tabTitle: 'All Sale Items',
                iconName: OutlineSvgNames.CatalogList,
                fillColor: '#ddd'
            }
        ]
    },
    {
        featurePrimaryOutletLink: 'order',
        featureTitle: 'Orders features',
        iconName: OutlineSvgNames.Clipboard,
        tabs: [
            {
                tabRouterLink: 'order/order-approve',
                tabTitle: 'Order Approve',
                iconName: OutlineSvgNames.CartCheck,
                fillColor: '#000'
            }
        ]
    },
];
