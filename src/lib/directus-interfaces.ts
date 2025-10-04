export type AccommodationBlocks = {
    accommodation?: (string & Accommodations) | null;
    code?: string | null;
    end_date?: string | null;
    id: string;
    notes?: string | null;
    rate?: number | null;
    room_type?: string | null;
    start_date?: string | null;
    wedding?: (string & Weddings) | null;
};

export type Accommodations = {
    address?: string | null;
    contact?: (string & People) | null;
    id: string;
    name?: string | null;
    phone?: string | null;
    website?: string | null;
};

export type BudgetCategories = {
    id: string;
    name?: string | null;
    notes?: string | null;
    parent?: (string & BudgetCategories) | null;
    planned_amount?: number | null;
    sort?: number | null;
    wedding?: (string & Weddings) | null;
};

export type BudgetItems = {
    actual_amount?: number | null;
    category?: (string & BudgetCategories) | null;
    description?: string | null;
    id: string;
    notes?: string | null;
    planned_amount?: number | null;
    vendor_booking?: (string & VendorBookings) | null;
};

export type ChecklistItems = {
    category?: string | null;
    id: string;
    notes?: string | null;
    sort?: number | null;
    status?: string | null;
    task?: (string & Tasks) | null;
    title?: string | null;
    wedding?: (string & Weddings) | null;
};

export type Communications = {
    channel?: string | null;
    content?: string | null;
    date?: string | null;
    files?: string | null;
    files: string;
    files: string;
    files: string;
    id: string;
    subject?: string | null;
    to_person?: (string & People) | null;
    vendor_booking?: (string & VendorBookings) | null;
    wedding?: (string & Weddings) | null;
};

export type Contracts = {
    files: any[] & ContractsFiles[];
    id: string;
    sign_status?: string | null;
    signed_at?: string | null;
    terms?: string | null;
    vendor_booking?: (string & VendorBookings) | null;
};

export type ContractsFiles = {
    contracts_id?: (string & Contracts) | null;
    directus_files_id?: (string & DirectusFiles) | null;
    id: number;
};

export type Couples = {
    budget_total?: number | null;
    city?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name?: string | null;
    partner_1?: (string & People) | null;
    partner_2?: (string & People) | null;
    photo?: string | null;
    status?: string | null;
    timezone?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
    website_url?: string | null;
    wedding_date?: string | null;
};

export type DirectusAccess = {
    id: string;
    policy: string & DirectusPolicies;
    role?: (string & DirectusRoles) | null;
    sort?: number | null;
    user?: (string & DirectusUsers) | null;
};

export type DirectusActivity = {
    action: string;
    collection: string;
    comment?: string | null;
    id: number;
    ip?: string | null;
    item: string;
    origin?: string | null;
    revisions: any[] & DirectusRevisions[];
    timestamp: string;
    user?: (string & DirectusUsers) | null;
    user_agent?: string | null;
};

export type DirectusCollections = {
    accountability?: string | null;
    archive_app_filter: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse: string;
    collection: string;
    color?: string | null;
    display_template?: string | null;
    group?: (string & DirectusCollections) | null;
    hidden: boolean;
    icon?: string | null;
    item_duplication_fields?: unknown | null;
    note?: string | null;
    preview_url?: string | null;
    singleton: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: unknown | null;
    unarchive_value?: string | null;
    versioning: boolean;
};

export type DirectusDashboards = {
    color?: string | null;
    date_created?: string | null;
    icon: string;
    id: string;
    name: string;
    note?: string | null;
    panels: any[] & DirectusPanels[];
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusExtensions = {
    bundle?: string | null;
    enabled: boolean;
    folder: string;
    id: string;
    source: string;
};

export type DirectusFields = {
    collection: string & DirectusCollections;
    conditions?: unknown | null;
    display?: string | null;
    display_options?: unknown | null;
    field: string;
    group?: (string & DirectusFields) | null;
    hidden: boolean;
    id: number;
    interface?: string | null;
    note?: string | null;
    options?: unknown | null;
    readonly: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: unknown | null;
    translations?: unknown | null;
    validation?: unknown | null;
    validation_message?: string | null;
    width?: string | null;
};

export type DirectusFiles = {
    charset?: string | null;
    created_on: string;
    description?: string | null;
    duration?: number | null;
    embed?: string | null;
    filename_disk?: string | null;
    filename_download: string;
    filesize?: number | null;
    focal_point_x?: number | null;
    focal_point_y?: number | null;
    folder?: (string & DirectusFolders) | null;
    height?: number | null;
    id: string;
    location?: string | null;
    metadata?: unknown | null;
    modified_by?: (string & DirectusUsers) | null;
    modified_on: string;
    storage: string;
    tags?: unknown | null;
    title?: string | null;
    tus_data?: unknown | null;
    tus_id?: string | null;
    type?: string | null;
    uploaded_by?: (string & DirectusUsers) | null;
    uploaded_on?: string | null;
    width?: number | null;
};

export type DirectusFlows = {
    accountability?: string | null;
    color?: string | null;
    date_created?: string | null;
    description?: string | null;
    icon?: string | null;
    id: string;
    name: string;
    operation?: (string & DirectusOperations) | null;
    operations: any[] & DirectusOperations[];
    options?: unknown | null;
    status: string;
    trigger?: string | null;
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusFolders = {
    id: string;
    name: string;
    parent?: (string & DirectusFolders) | null;
};

export type DirectusMigrations = {
    name: string;
    timestamp?: string | null;
    version: string;
};

export type DirectusNotifications = {
    collection?: string | null;
    id: number;
    item?: string | null;
    message?: string | null;
    recipient: string & DirectusUsers;
    sender?: (string & DirectusUsers) | null;
    status?: string | null;
    subject: string;
    timestamp?: string | null;
};

export type DirectusOperations = {
    date_created?: string | null;
    flow: string & DirectusFlows;
    id: string;
    key: string;
    name?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    reject?: (string & DirectusOperations) | null;
    resolve?: (string & DirectusOperations) | null;
    type: string;
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusPanels = {
    color?: string | null;
    dashboard: string & DirectusDashboards;
    date_created?: string | null;
    height: number;
    icon?: string | null;
    id: string;
    name?: string | null;
    note?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    show_header: boolean;
    type: string;
    user_created?: (string & DirectusUsers) | null;
    width: number;
};

export type DirectusPermissions = {
    action: string;
    collection: string;
    fields?: unknown | null;
    id: number;
    permissions?: unknown | null;
    policy: string & DirectusPolicies;
    presets?: unknown | null;
    validation?: unknown | null;
};

export type DirectusPolicies = {
    admin_access: boolean;
    app_access: boolean;
    description?: string | null;
    enforce_tfa: boolean;
    icon: string;
    id: string;
    ip_access?: unknown | null;
    name: string;
    permissions: any[] & DirectusPermissions[];
    roles: any[] & DirectusAccess[];
    users: any[] & DirectusAccess[];
};

export type DirectusPresets = {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: unknown | null;
    icon?: string | null;
    id: number;
    layout?: string | null;
    layout_options?: unknown | null;
    layout_query?: unknown | null;
    refresh_interval?: number | null;
    role?: (string & DirectusRoles) | null;
    search?: string | null;
    user?: (string & DirectusUsers) | null;
};

export type DirectusRelations = {
    id: number;
    junction_field?: string | null;
    many_collection: string;
    many_field: string;
    one_allowed_collections?: unknown | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action: string;
    one_field?: string | null;
    sort_field?: string | null;
};

export type DirectusRevisions = {
    activity: number & DirectusActivity;
    collection: string;
    data?: unknown | null;
    delta?: unknown | null;
    id: number;
    item: string;
    parent?: (number & DirectusRevisions) | null;
    version?: (string & DirectusVersions) | null;
};

export type DirectusRoles = {
    children: any[] & DirectusRoles[];
    description?: string | null;
    icon: string;
    id: string;
    name: string;
    parent?: (string & DirectusRoles) | null;
    policies: any[] & DirectusAccess[];
    users: any[] & DirectusUsers[];
    users_group: string;
};

export type DirectusSessions = {
    expires: string;
    ip?: string | null;
    next_token?: string | null;
    origin?: string | null;
    share?: (string & DirectusShares) | null;
    token: string;
    user?: (string & DirectusUsers) | null;
    user_agent?: string | null;
};

export type DirectusSettings = {
    accepted_terms?: boolean | null;
    auth_login_attempts?: number | null;
    auth_password_policy?: string | null;
    basemaps?: unknown | null;
    custom_aspect_ratios?: unknown | null;
    custom_css?: string | null;
    default_appearance: string;
    default_language: string;
    default_theme_dark?: string | null;
    default_theme_light?: string | null;
    id: number;
    mapbox_key?: string | null;
    module_bar?: unknown | null;
    project_color: string;
    project_descriptor?: string | null;
    project_id?: string | null;
    project_logo?: (string & DirectusFiles) | null;
    project_name: string;
    project_url?: string | null;
    public_background?: (string & DirectusFiles) | null;
    public_favicon?: (string & DirectusFiles) | null;
    public_foreground?: (string & DirectusFiles) | null;
    public_note?: string | null;
    public_registration: boolean;
    public_registration_email_filter?: unknown | null;
    public_registration_role?: (string & DirectusRoles) | null;
    public_registration_verify_email: boolean;
    report_bug_url?: string | null;
    report_error_url?: string | null;
    report_feature_url?: string | null;
    storage_asset_presets?: unknown | null;
    storage_asset_transform?: string | null;
    storage_default_folder?: (string & DirectusFolders) | null;
    theme_dark_overrides?: unknown | null;
    theme_light_overrides?: unknown | null;
    theming_group: string;
    visual_editor_urls?: unknown | null;
};

export type DirectusShares = {
    collection: string & DirectusCollections;
    date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
    id: string;
    item: string;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: (string & DirectusRoles) | null;
    times_used?: number | null;
    user_created?: (string & DirectusUsers) | null;
};

export type DirectusTranslations = {
    id: string;
    key: string;
    language: string;
    value: string;
};

export type DirectusUsers = {
    appearance?: string | null;
    auth_data?: unknown | null;
    avatar?: (string & DirectusFiles) | null;
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id: string;
    language?: string | null;
    last_access?: string | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    policies: any[] & DirectusAccess[];
    provider: string;
    role?: (string & DirectusRoles) | null;
    status: string;
    tags?: unknown | null;
    text_direction: string;
    tfa_secret?: string | null;
    theme_dark?: string | null;
    theme_dark_overrides?: unknown | null;
    theme_light?: string | null;
    theme_light_overrides?: unknown | null;
    title?: string | null;
    token?: string | null;
};

export type DirectusVersions = {
    collection: string & DirectusCollections;
    date_created?: string | null;
    date_updated?: string | null;
    delta?: unknown | null;
    hash?: string | null;
    id: string;
    item: string;
    key: string;
    name?: string | null;
    user_created?: (string & DirectusUsers) | null;
    user_updated?: (string & DirectusUsers) | null;
};

export type DirectusWebhooks = {
    actions: unknown;
    collections: unknown;
    data: boolean;
    headers?: unknown | null;
    id: number;
    method: string;
    migrated_flow?: (string & DirectusFlows) | null;
    name: string;
    status: string;
    url: string;
    was_active_before_deprecation: boolean;
};

export type GalleryAssets = {
    event?: (string & WeddingEvents) | null;
    id: string;
    is_favorite?: boolean | null;
    notes?: string | null;
    source_file?: string | null;
    source_url?: string | null;
    type?: string | null;
    vendor_booking?: (string & VendorBookings) | null;
    wedding?: (string & Weddings) | null;
};

export type GuestGroups = {
    guests: any[] & Guests[];
    id: string;
    name?: string | null;
    notes?: string | null;
    type?: string | null;
    wedding?: (string & Weddings) | null;
};

export type Guests = {
    dietary_notes?: string | null;
    group?: (string & GuestGroups) | null;
    id: string;
    invitation_status?: string | null;
    invitations: any[] & InvitationsGuests[];
    is_vip?: boolean | null;
    meal_choice?: (string & MealOptions) | null;
    person?: (string & People) | null;
    rsvp_at?: string | null;
    rsvp_status?: string | null;
    side?: string | null;
    wedding?: (string & Weddings) | null;
};

export type Invitations = {
    code?: string | null;
    guests: any[] & InvitationsGuests[];
    id: string;
    invite_type?: string | null;
    notes?: string | null;
    public_link?: string | null;
    sent_at?: string | null;
    status?: string | null;
    wedding?: (string & Weddings) | null;
};

export type InvitationsGuests = {
    guest?: (string & Guests) | null;
    id: string;
    invitation?: (string & Invitations) | null;
    migrated?: boolean | null;
    role_on_invite?: string | null;
    seats_reserved?: number | null;
};

export type Invoices = {
    currency?: string | null;
    description?: string | null;
    due_date?: string | null;
    files: any[] & InvoicesFiles[];
    id: string;
    issue_date?: string | null;
    number?: string | null;
    payments: any[] & Payments[];
    status?: string | null;
    total_amount?: number | null;
    vendor_booking?: (string & VendorBookings) | null;
};

export type InvoicesFiles = {
    directus_files_id?: (string & DirectusFiles) | null;
    id: number;
    invoices_id?: (string & Invoices) | null;
};

export type MealOptions = {
    id: string;
    menu_description?: string | null;
    name?: string | null;
    wedding?: (string & Weddings) | null;
};

export type MusicPlaylistItems = {
    artist?: string | null;
    event?: (string & WeddingEvents) | null;
    id: string;
    moment?: string | null;
    notes?: string | null;
    song_title?: string | null;
    url?: string | null;
    wedding?: (string & Weddings) | null;
};

export type Payments = {
    amount?: number | null;
    date?: string | null;
    id: string;
    invoice?: (string & Invoices) | null;
    method?: string | null;
    notes?: string | null;
    payment_type?: string | null;
    Receipt: any[] & PaymentsFiles1[];
};

export type PaymentsFiles = {
    directus_files_id?: (string & DirectusFiles) | null;
    id: number;
    payments_id?: (string & Payments) | null;
};

export type PaymentsFiles1 = {
    directus_files_id?: (string & DirectusFiles) | null;
    id: number;
    payments_id?: (string & Payments) | null;
};

export type People = {
    date_created?: string | null;
    date_updated?: string | null;
    email?: string | null;
    first_name?: string | null;
    fullname?: string | null;
    id: string;
    invitations: any[] & Guests[];
    last_name?: string | null;
    notes?: string | null;
    person_type?: string | null;
    phone?: string | null;
    photo?: string | null;
    role?: string | null;
    status?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
    WhatsApp?: string | null;
};

export type Printables = {
    file_design?: string | null;
    file_print?: string | null;
    id: string;
    notes?: string | null;
    quantity?: number | null;
    status?: string | null;
    type?: string | null;
    vendor?: (string & Vendors) | null;
    wedding?: (string & Weddings) | null;
};

export type SeatingAssignments = {
    guest?: (string & Guests) | null;
    id: string;
    notes?: string | null;
    seat_number?: number | null;
    table?: (string & SeatingTables) | null;
    wedding?: (string & Weddings) | null;
};

export type SeatingTables = {
    capacity?: number | null;
    id: string;
    label?: string | null;
    location_notes?: string | null;
    wedding?: (string & Weddings) | null;
};

export type Tasks = {
    description?: string | null;
    due_date?: string | null;
    id: string;
    owner?: (string & People) | null;
    priority?: string | null;
    related_event?: (string & WeddingEvents) | null;
    related_vendor_booking?: (string & VendorBookings) | null;
    status?: string | null;
    title?: string | null;
    wedding?: (string & Weddings) | null;
};

export type TimelineItems = {
    description?: string | null;
    duration_min?: number | null;
    event?: (string & WeddingEvents) | null;
    id: string;
    responsible?: (string & People) | null;
    time?: string | null;
    title?: string | null;
    wedding?: (string & Weddings) | null;
};

export type TransportRides = {
    arrival_time?: string | null;
    capacity?: number | null;
    departure_time?: string | null;
    end_location?: string | null;
    id: string;
    notes?: string | null;
    provider?: (string & Vendors) | null;
    start_location?: string | null;
    type?: string | null;
    wedding?: (string & Weddings) | null;
};

export type VendorBookings = {
    balance_due?: string | null;
    contract?: (string & Contracts) | null;
    currency?: string | null;
    deposit_amount?: number | null;
    deposit_due?: string | null;
    id: string;
    invoice?: (string & Invoices) | null;
    notes?: string | null;
    package?: (string & VendorPackages) | null;
    status?: string | null;
    total_price?: number | null;
    vendor?: (string & Vendors) | null;
    wedding?: (string & Weddings) | null;
};

export type VendorFinancialsView = {
    balance_invoice?: number | null;
    balance_vs_contract?: number | null;
    booking_status?: string | null;
    contracted_total?: number | null;
    id: number;
    invoiced_total?: number | null;
    paid_total?: number | null;
    planned_total?: number | null;
    vendor_booking_id?: string | null;
    vendor_id?: string | null;
    vendor_name?: string | null;
    wedding_code?: string | null;
    wedding_id?: string | null;
};

export type VendorPackages = {
    base_price?: number | null;
    currency?: string | null;
    description?: string | null;
    id: string;
    includes?: unknown | null;
    lead_time_days?: number | null;
    name?: string | null;
    vendor?: (string & Vendors) | null;
};

export type Vendors = {
    business_name?: string | null;
    category?: string | null;
    contact?: (string & People) | null;
    date_created?: string | null;
    date_updated?: string | null;
    email?: string | null;
    id: string;
    instagram?: string | null;
    notes?: string | null;
    phone?: string | null;
    rating?: number | null;
    user_created?: string | null;
    user_updated?: string | null;
    website?: string | null;
    WhatsApp?: string | null;
};

export type Venues = {
    address?: string | null;
    capacity?: number | null;
    contact?: (string & People) | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    latitude?: number | null;
    longitude?: number | null;
    name?: string | null;
    notes?: string | null;
    type?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
};

export type WeddingEvents = {
    date_created?: string | null;
    date_updated?: string | null;
    end_datetime?: string | null;
    id: string;
    notes?: string | null;
    start_datetime?: string | null;
    type?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
    venue?: (string & Venues) | null;
    wedding?: (string & Weddings) | null;
};

export type Weddings = {
    code?: string | null;
    color_palette?: unknown | null;
    couple?: (string & Couples) | null;
    date?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    end_time?: string | null;
    estimated_guests?: number | null;
    hashtag?: string | null;
    id: string;
    public_base_url?: string | null;
    start_time?: string | null;
    status?: string | null;
    timezone?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
};

export type CustomDirectusTypes = {
    accommodation_blocks: AccommodationBlocks[];
    accommodations: Accommodations[];
    budget_categories: BudgetCategories[];
    budget_items: BudgetItems[];
    checklist_items: ChecklistItems[];
    communications: Communications[];
    contracts: Contracts[];
    contracts_files: ContractsFiles[];
    couples: Couples[];
    directus_access: DirectusAccess[];
    directus_activity: DirectusActivity[];
    directus_collections: DirectusCollections[];
    directus_dashboards: DirectusDashboards[];
    directus_extensions: DirectusExtensions[];
    directus_fields: DirectusFields[];
    directus_files: DirectusFiles[];
    directus_flows: DirectusFlows[];
    directus_folders: DirectusFolders[];
    directus_migrations: DirectusMigrations[];
    directus_notifications: DirectusNotifications[];
    directus_operations: DirectusOperations[];
    directus_panels: DirectusPanels[];
    directus_permissions: DirectusPermissions[];
    directus_policies: DirectusPolicies[];
    directus_presets: DirectusPresets[];
    directus_relations: DirectusRelations[];
    directus_revisions: DirectusRevisions[];
    directus_roles: DirectusRoles[];
    directus_sessions: DirectusSessions[];
    directus_settings: DirectusSettings;
    directus_shares: DirectusShares[];
    directus_translations: DirectusTranslations[];
    directus_users: DirectusUsers[];
    directus_versions: DirectusVersions[];
    directus_webhooks: DirectusWebhooks[];
    gallery_assets: GalleryAssets[];
    guest_groups: GuestGroups[];
    guests: Guests[];
    invitations: Invitations[];
    invitations_guests: InvitationsGuests[];
    invoices: Invoices[];
    invoices_files: InvoicesFiles[];
    meal_options: MealOptions[];
    music_playlist_items: MusicPlaylistItems[];
    payments: Payments[];
    payments_files: PaymentsFiles[];
    payments_files_1: PaymentsFiles1[];
    people: People[];
    printables: Printables[];
    seating_assignments: SeatingAssignments[];
    seating_tables: SeatingTables[];
    tasks: Tasks[];
    timeline_items: TimelineItems[];
    transport_rides: TransportRides[];
    vendor_bookings: VendorBookings[];
    vendor_financials_view: VendorFinancialsView[];
    vendor_packages: VendorPackages[];
    vendors: Vendors[];
    venues: Venues[];
    wedding_events: WeddingEvents[];
    weddings: Weddings[];
};
