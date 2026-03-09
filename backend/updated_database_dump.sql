--
-- PostgreSQL database dump
--

\restrict ZcsjXzu80dV3yjeYDrHzQgBRxGlMWg4Kqx8fKLlhxX11qeLvmLqpTJK3RHWsa0q

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_AccountProfiles_reach_preference; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_AccountProfiles_reach_preference" AS ENUM (
    'call',
    'text'
);


ALTER TYPE public."enum_AccountProfiles_reach_preference" OWNER TO postgres;

--
-- Name: enum_AdminNotifications_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_AdminNotifications_status" AS ENUM (
    'sent',
    'scheduled',
    'failed'
);


ALTER TYPE public."enum_AdminNotifications_status" OWNER TO postgres;

--
-- Name: enum_Comments_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Comments_status" AS ENUM (
    'pending',
    'approved',
    'flagged',
    'removed'
);


ALTER TYPE public."enum_Comments_status" OWNER TO postgres;

--
-- Name: enum_Comments_target_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Comments_target_type" AS ENUM (
    'post',
    'reel'
);


ALTER TYPE public."enum_Comments_target_type" OWNER TO postgres;

--
-- Name: enum_Comments_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Comments_type" AS ENUM (
    'text',
    'sticker'
);


ALTER TYPE public."enum_Comments_type" OWNER TO postgres;

--
-- Name: enum_Conversations_riskLevel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Conversations_riskLevel" AS ENUM (
    'high',
    'medium',
    'low'
);


ALTER TYPE public."enum_Conversations_riskLevel" OWNER TO postgres;

--
-- Name: enum_Conversations_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Conversations_status" AS ENUM (
    'flagged',
    'investigating',
    'cleared'
);


ALTER TYPE public."enum_Conversations_status" OWNER TO postgres;

--
-- Name: enum_FollowRequests_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_FollowRequests_status" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED'
);


ALTER TYPE public."enum_FollowRequests_status" OWNER TO postgres;

--
-- Name: enum_Media_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Media_type" AS ENUM (
    'image',
    'video'
);


ALTER TYPE public."enum_Media_type" OWNER TO postgres;

--
-- Name: enum_Media_uploadStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Media_uploadStatus" AS ENUM (
    'uploading',
    'processing',
    'completed',
    'failed'
);


ALTER TYPE public."enum_Media_uploadStatus" OWNER TO postgres;

--
-- Name: enum_Messages_call_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Messages_call_type" AS ENUM (
    'audio',
    'video'
);


ALTER TYPE public."enum_Messages_call_type" OWNER TO postgres;

--
-- Name: enum_Messages_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Messages_type" AS ENUM (
    'text',
    'image',
    'video',
    'story_reply',
    'sticker',
    'voice',
    'post_share',
    'reel_share',
    'call_history'
);


ALTER TYPE public."enum_Messages_type" OWNER TO postgres;

--
-- Name: enum_NotificationSettings_comments; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_NotificationSettings_comments" AS ENUM (
    'OFF',
    'FOLLOWING',
    'EVERYONE'
);


ALTER TYPE public."enum_NotificationSettings_comments" OWNER TO postgres;

--
-- Name: enum_NotificationSettings_likes; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_NotificationSettings_likes" AS ENUM (
    'OFF',
    'FOLLOWING',
    'EVERYONE'
);


ALTER TYPE public."enum_NotificationSettings_likes" OWNER TO postgres;

--
-- Name: enum_NotificationSettings_mentions; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_NotificationSettings_mentions" AS ENUM (
    'OFF',
    'FOLLOWING',
    'EVERYONE'
);


ALTER TYPE public."enum_NotificationSettings_mentions" OWNER TO postgres;

--
-- Name: enum_Notifications_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Notifications_type" AS ENUM (
    'LIKE',
    'COMMENT',
    'FOLLOW',
    'REPLY',
    'MENTION',
    'MESSAGE'
);


ALTER TYPE public."enum_Notifications_type" OWNER TO postgres;

--
-- Name: enum_Posts_mediaType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Posts_mediaType" AS ENUM (
    'IMAGE',
    'VIDEO'
);


ALTER TYPE public."enum_Posts_mediaType" OWNER TO postgres;

--
-- Name: enum_Reports_reason; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Reports_reason" AS ENUM (
    'spam',
    'violence',
    'hate',
    'nudity',
    'scam',
    'false_information',
    'bullying',
    'other'
);


ALTER TYPE public."enum_Reports_reason" OWNER TO postgres;

--
-- Name: enum_Reports_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Reports_status" AS ENUM (
    'pending',
    'reviewed',
    'reviewing',
    'resolved',
    'dismissed'
);


ALTER TYPE public."enum_Reports_status" OWNER TO postgres;

--
-- Name: enum_SearchIndices_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_SearchIndices_type" AS ENUM (
    'USER',
    'POST',
    'HASHTAG'
);


ALTER TYPE public."enum_SearchIndices_type" OWNER TO postgres;

--
-- Name: enum_Stories_mediaType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Stories_mediaType" AS ENUM (
    'IMAGE',
    'VIDEO'
);


ALTER TYPE public."enum_Stories_mediaType" OWNER TO postgres;

--
-- Name: enum_account_status_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_account_status_status AS ENUM (
    'OK',
    'WARNING',
    'LIMITED'
);


ALTER TYPE public.enum_account_status_status OWNER TO postgres;

--
-- Name: enum_ad_media_mediaType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_ad_media_mediaType" AS ENUM (
    'IMAGE',
    'VIDEO'
);


ALTER TYPE public."enum_ad_media_mediaType" OWNER TO postgres;

--
-- Name: enum_ad_targets_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_ad_targets_gender AS ENUM (
    'ALL',
    'MALE',
    'FEMALE'
);


ALTER TYPE public.enum_ad_targets_gender OWNER TO postgres;

--
-- Name: enum_ad_targets_targetType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_ad_targets_targetType" AS ENUM (
    'AUTOMATIC',
    'CUSTOM'
);


ALTER TYPE public."enum_ad_targets_targetType" OWNER TO postgres;

--
-- Name: enum_admin_audit_logs_targetType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_admin_audit_logs_targetType" AS ENUM (
    'user',
    'post',
    'reel',
    'story',
    'report',
    'hashtag',
    'comment',
    'auth',
    'system',
    'avatar',
    'admin',
    'language'
);


ALTER TYPE public."enum_admin_audit_logs_targetType" OWNER TO postgres;

--
-- Name: enum_ads_adType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_ads_adType" AS ENUM (
    'NEW_MEDIA',
    'BOOST_CONTENT'
);


ALTER TYPE public."enum_ads_adType" OWNER TO postgres;

--
-- Name: enum_ads_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_ads_status AS ENUM (
    'DRAFT',
    'REVIEW',
    'ACTIVE',
    'PAUSED',
    'COMPLETED',
    'REJECTED'
);


ALTER TYPE public.enum_ads_status OWNER TO postgres;

--
-- Name: enum_boosted_content_references_contentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_boosted_content_references_contentType" AS ENUM (
    'POST',
    'REEL',
    'STORY'
);


ALTER TYPE public."enum_boosted_content_references_contentType" OWNER TO postgres;

--
-- Name: enum_call_logs_call_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_call_logs_call_type AS ENUM (
    'audio',
    'video'
);


ALTER TYPE public.enum_call_logs_call_type OWNER TO postgres;

--
-- Name: enum_call_logs_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_call_logs_status AS ENUM (
    'missed',
    'rejected',
    'completed'
);


ALTER TYPE public.enum_call_logs_status OWNER TO postgres;

--
-- Name: enum_call_sessions_call_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_call_sessions_call_type AS ENUM (
    'audio',
    'video'
);


ALTER TYPE public.enum_call_sessions_call_type OWNER TO postgres;

--
-- Name: enum_call_sessions_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_call_sessions_status AS ENUM (
    'ringing',
    'rejected',
    'missed',
    'active',
    'ended'
);


ALTER TYPE public.enum_call_sessions_status OWNER TO postgres;

--
-- Name: enum_connected_apps_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_connected_apps_status AS ENUM (
    'active',
    'expired',
    'removed'
);


ALTER TYPE public.enum_connected_apps_status OWNER TO postgres;

--
-- Name: enum_content_metrics_contentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_content_metrics_contentType" AS ENUM (
    'POST',
    'REEL',
    'STORY',
    'AD'
);


ALTER TYPE public."enum_content_metrics_contentType" OWNER TO postgres;

--
-- Name: enum_content_preferences_sensitive_content_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_content_preferences_sensitive_content_level AS ENUM (
    'allow',
    'limit',
    'limit_more'
);


ALTER TYPE public.enum_content_preferences_sensitive_content_level OWNER TO postgres;

--
-- Name: enum_dm_moderation_logs_actionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_dm_moderation_logs_actionType" AS ENUM (
    'mark_safe',
    'ban_users'
);


ALTER TYPE public."enum_dm_moderation_logs_actionType" OWNER TO postgres;

--
-- Name: enum_featured_content_contentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_featured_content_contentType" AS ENUM (
    'post',
    'reel'
);


ALTER TYPE public."enum_featured_content_contentType" OWNER TO postgres;

--
-- Name: enum_hashtags_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_hashtags_status AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.enum_hashtags_status OWNER TO postgres;

--
-- Name: enum_help_articles_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_help_articles_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_help_articles_status OWNER TO postgres;

--
-- Name: enum_impressions_contentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_impressions_contentType" AS ENUM (
    'POST',
    'REEL',
    'STORY',
    'AD'
);


ALTER TYPE public."enum_impressions_contentType" OWNER TO postgres;

--
-- Name: enum_interactions_contentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_interactions_contentType" AS ENUM (
    'POST',
    'REEL',
    'STORY',
    'AD'
);


ALTER TYPE public."enum_interactions_contentType" OWNER TO postgres;

--
-- Name: enum_interactions_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_interactions_type AS ENUM (
    'LIKE',
    'COMMENT',
    'SHARE',
    'SAVE'
);


ALTER TYPE public.enum_interactions_type OWNER TO postgres;

--
-- Name: enum_live_guest_requests_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_live_guest_requests_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'left'
);


ALTER TYPE public.enum_live_guest_requests_status OWNER TO postgres;

--
-- Name: enum_live_streams_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_live_streams_category AS ENUM (
    'Social',
    'Gaming',
    'Education',
    'Music',
    'Fitness',
    'Tech'
);


ALTER TYPE public.enum_live_streams_category OWNER TO postgres;

--
-- Name: enum_live_streams_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_live_streams_status AS ENUM (
    'SCHEDULED',
    'LIVE',
    'ENDED',
    'idle',
    'scheduled',
    'preview',
    'live',
    'paused',
    'ended'
);


ALTER TYPE public.enum_live_streams_status OWNER TO postgres;

--
-- Name: enum_live_streams_visibility; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_live_streams_visibility AS ENUM (
    'Public',
    'Followers',
    'Private',
    'public',
    'followers',
    'private',
    'close_friends',
    'practice'
);


ALTER TYPE public.enum_live_streams_visibility OWNER TO postgres;

--
-- Name: enum_pending_tags_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_pending_tags_status AS ENUM (
    'pending',
    'approved',
    'removed'
);


ALTER TYPE public.enum_pending_tags_status OWNER TO postgres;

--
-- Name: enum_reports_content_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_reports_content_type AS ENUM (
    'post',
    'reel',
    'comment',
    'dm',
    'user'
);


ALTER TYPE public.enum_reports_content_type OWNER TO postgres;

--
-- Name: enum_reports_resolution_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_reports_resolution_type AS ENUM (
    'ignored',
    'user_banned'
);


ALTER TYPE public.enum_reports_resolution_type OWNER TO postgres;

--
-- Name: enum_reports_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_reports_status AS ENUM (
    'pending',
    'review',
    'resolved'
);


ALTER TYPE public.enum_reports_status OWNER TO postgres;

--
-- Name: enum_reports_targetType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_reports_targetType" AS ENUM (
    'post',
    'reel',
    'story',
    'comment',
    'user'
);


ALTER TYPE public."enum_reports_targetType" OWNER TO postgres;

--
-- Name: enum_scheduled_streams_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_scheduled_streams_category AS ENUM (
    'Social',
    'Gaming',
    'Education',
    'Music',
    'Fitness',
    'Tech'
);


ALTER TYPE public.enum_scheduled_streams_category OWNER TO postgres;

--
-- Name: enum_scheduled_streams_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_scheduled_streams_status AS ENUM (
    'SCHEDULED',
    'STARTED',
    'CANCELLED'
);


ALTER TYPE public.enum_scheduled_streams_status OWNER TO postgres;

--
-- Name: enum_scheduled_streams_visibility; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_scheduled_streams_visibility AS ENUM (
    'Public',
    'Followers',
    'Private'
);


ALTER TYPE public.enum_scheduled_streams_visibility OWNER TO postgres;

--
-- Name: enum_subscriptions_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_subscriptions_status AS ENUM (
    'active',
    'cancelled'
);


ALTER TYPE public.enum_subscriptions_status OWNER TO postgres;

--
-- Name: enum_support_requests_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_support_requests_category AS ENUM (
    'report',
    'safety',
    'violation',
    'monetisation'
);


ALTER TYPE public.enum_support_requests_category OWNER TO postgres;

--
-- Name: enum_support_requests_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_support_requests_status AS ENUM (
    'pending',
    'resolved',
    'closed'
);


ALTER TYPE public.enum_support_requests_status OWNER TO postgres;

--
-- Name: enum_user_avatars_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_avatars_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_user_avatars_status OWNER TO postgres;

--
-- Name: enum_user_comment_settings_allow_from; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_comment_settings_allow_from AS ENUM (
    'everyone',
    'following',
    'followers',
    'mutual',
    'off'
);


ALTER TYPE public.enum_user_comment_settings_allow_from OWNER TO postgres;

--
-- Name: enum_user_message_settings_group_add_permission; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_message_settings_group_add_permission AS ENUM (
    'everyone',
    'followers_only'
);


ALTER TYPE public.enum_user_message_settings_group_add_permission OWNER TO postgres;

--
-- Name: enum_user_message_settings_message_requests_from; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_message_settings_message_requests_from AS ENUM (
    'everyone',
    'followers',
    'no_one'
);


ALTER TYPE public.enum_user_message_settings_message_requests_from OWNER TO postgres;

--
-- Name: enum_user_privacy_settings_allow_mentions_from; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_privacy_settings_allow_mentions_from AS ENUM (
    'everyone',
    'following',
    'no_one'
);


ALTER TYPE public.enum_user_privacy_settings_allow_mentions_from OWNER TO postgres;

--
-- Name: enum_user_privacy_settings_allow_tags_from; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_privacy_settings_allow_tags_from AS ENUM (
    'everyone',
    'following',
    'no_one'
);


ALTER TYPE public.enum_user_privacy_settings_allow_tags_from OWNER TO postgres;

--
-- Name: enum_user_story_settings_story_replies; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_story_settings_story_replies AS ENUM (
    'everyone',
    'followers',
    'off'
);


ALTER TYPE public.enum_user_story_settings_story_replies OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AccountAnalytics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AccountAnalytics" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    profile_views integer DEFAULT 0,
    post_reach integer DEFAULT 0,
    engagement numeric DEFAULT 0,
    followers_growth integer DEFAULT 0,
    recorded_at timestamp with time zone
);


ALTER TABLE public."AccountAnalytics" OWNER TO postgres;

--
-- Name: AccountAnalytics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AccountAnalytics_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AccountAnalytics_id_seq" OWNER TO postgres;

--
-- Name: AccountAnalytics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AccountAnalytics_id_seq" OWNED BY public."AccountAnalytics".id;


--
-- Name: AccountCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AccountCategories" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AccountCategories" OWNER TO postgres;

--
-- Name: AccountCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AccountCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AccountCategories_id_seq" OWNER TO postgres;

--
-- Name: AccountCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AccountCategories_id_seq" OWNED BY public."AccountCategories".id;


--
-- Name: AccountHistories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AccountHistories" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    action character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "oldValue" character varying(255),
    "newValue" character varying(255),
    icon character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AccountHistories" OWNER TO postgres;

--
-- Name: AccountHistories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AccountHistories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AccountHistories_id_seq" OWNER TO postgres;

--
-- Name: AccountHistories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AccountHistories_id_seq" OWNED BY public."AccountHistories".id;


--
-- Name: AccountProfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AccountProfiles" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    category character varying(255),
    business_email character varying(255),
    business_phone character varying(255),
    business_address text,
    website character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    whatsapp_number character varying(255),
    reach_preference public."enum_AccountProfiles_reach_preference" DEFAULT 'call'::public."enum_AccountProfiles_reach_preference",
    display_category boolean DEFAULT true,
    display_contact boolean DEFAULT true
);


ALTER TABLE public."AccountProfiles" OWNER TO postgres;

--
-- Name: AccountProfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AccountProfiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AccountProfiles_id_seq" OWNER TO postgres;

--
-- Name: AccountProfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AccountProfiles_id_seq" OWNED BY public."AccountProfiles".id;


--
-- Name: AdminNotifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AdminNotifications" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    target character varying(255) DEFAULT 'all'::character varying,
    "targetValue" character varying(255),
    "recipientsCount" integer DEFAULT 0,
    status public."enum_AdminNotifications_status" DEFAULT 'sent'::public."enum_AdminNotifications_status",
    "scheduledFor" timestamp with time zone,
    "sentAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AdminNotifications" OWNER TO postgres;

--
-- Name: AdminNotifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AdminNotifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AdminNotifications_id_seq" OWNER TO postgres;

--
-- Name: AdminNotifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AdminNotifications_id_seq" OWNED BY public."AdminNotifications".id;


--
-- Name: Admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admins" (
    id uuid NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "roleId" integer,
    "isActive" boolean DEFAULT true,
    "lastLogin" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Admins" OWNER TO postgres;

--
-- Name: AppFeedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AppFeedback" (
    id uuid NOT NULL,
    "userId" integer,
    username character varying(255),
    text text,
    files jsonb DEFAULT '[]'::jsonb,
    status character varying(255) DEFAULT 'pending'::character varying,
    "browserInfo" jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AppFeedback" OWNER TO postgres;

--
-- Name: AuditLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AuditLogs" (
    id uuid NOT NULL,
    "adminId" uuid NOT NULL,
    "adminUsername" character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    "resourceType" character varying(255) NOT NULL,
    "resourceId" character varying(255),
    details jsonb,
    "ipAddress" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AuditLogs" OWNER TO postgres;

--
-- Name: CommentLikes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CommentLikes" (
    id integer NOT NULL,
    "commentId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."CommentLikes" OWNER TO postgres;

--
-- Name: CommentLikes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CommentLikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CommentLikes_id_seq" OWNER TO postgres;

--
-- Name: CommentLikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CommentLikes_id_seq" OWNED BY public."CommentLikes".id;


--
-- Name: Comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comments" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    username character varying(255) NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp with time zone,
    "likesCount" integer DEFAULT 0,
    status public."enum_Comments_status" DEFAULT 'pending'::public."enum_Comments_status",
    "reportedCount" integer DEFAULT 0,
    "updatedAt" timestamp with time zone NOT NULL,
    parent_id integer,
    type public."enum_Comments_type" DEFAULT 'text'::public."enum_Comments_type",
    media_url text,
    target_type public."enum_Comments_target_type" DEFAULT 'post'::public."enum_Comments_target_type"
);


ALTER TABLE public."Comments" OWNER TO postgres;

--
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comments_id_seq" OWNER TO postgres;

--
-- Name: Comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comments_id_seq" OWNED BY public."Comments".id;


--
-- Name: ContactMatches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactMatches" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "matchedUserId" integer NOT NULL,
    source character varying(255) DEFAULT 'phonebook'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ContactMatches" OWNER TO postgres;

--
-- Name: ContactMatches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContactMatches_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactMatches_id_seq" OWNER TO postgres;

--
-- Name: ContactMatches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContactMatches_id_seq" OWNED BY public."ContactMatches".id;


--
-- Name: Conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Conversations" (
    id integer NOT NULL,
    user1_id integer NOT NULL,
    user2_id integer NOT NULL,
    last_message_id integer,
    last_message_content text,
    last_message_sender_id integer,
    "lastMessageAt" timestamp with time zone,
    "riskScore" integer DEFAULT 0,
    "riskLevel" public."enum_Conversations_riskLevel",
    "flaggedAt" timestamp with time zone,
    status public."enum_Conversations_status" DEFAULT 'cleared'::public."enum_Conversations_status",
    "aiFlags" jsonb DEFAULT '[]'::jsonb,
    user1_muted boolean DEFAULT false,
    user2_muted boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Conversations" OWNER TO postgres;

--
-- Name: Conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Conversations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Conversations_id_seq" OWNER TO postgres;

--
-- Name: Conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Conversations_id_seq" OWNED BY public."Conversations".id;


--
-- Name: Feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Feedbacks" (
    id uuid NOT NULL,
    "articleId" uuid NOT NULL,
    "isHelpful" boolean NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Feedbacks" OWNER TO postgres;

--
-- Name: FollowRequests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FollowRequests" (
    id uuid NOT NULL,
    "requesterId" integer NOT NULL,
    "targetUserId" integer NOT NULL,
    status public."enum_FollowRequests_status" DEFAULT 'PENDING'::public."enum_FollowRequests_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."FollowRequests" OWNER TO postgres;

--
-- Name: Interests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Interests" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    category character varying(255),
    icon character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Interests" OWNER TO postgres;

--
-- Name: Interests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Interests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Interests_id_seq" OWNER TO postgres;

--
-- Name: Interests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Interests_id_seq" OWNED BY public."Interests".id;


--
-- Name: Likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Likes" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Likes" OWNER TO postgres;

--
-- Name: Likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Likes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Likes_id_seq" OWNER TO postgres;

--
-- Name: Likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Likes_id_seq" OWNED BY public."Likes".id;


--
-- Name: Media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Media" (
    id uuid NOT NULL,
    filename character varying(255) NOT NULL,
    "originalName" character varying(255),
    url character varying(255) NOT NULL,
    "r2Key" character varying(255),
    "cdnUrl" character varying(255),
    "tempKey" character varying(255),
    "thumbnailUrl" character varying(255),
    type public."enum_Media_type" NOT NULL,
    "mimeType" character varying(255),
    size integer,
    width integer,
    height integer,
    duration double precision,
    "uploadStatus" public."enum_Media_uploadStatus" DEFAULT 'uploading'::public."enum_Media_uploadStatus",
    "processingError" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Media" OWNER TO postgres;

--
-- Name: Messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Messages" (
    id integer NOT NULL,
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    type public."enum_Messages_type" DEFAULT 'text'::public."enum_Messages_type",
    content text,
    media_url character varying(255),
    reply_to_story_id integer,
    "isSeen" boolean DEFAULT false,
    flagged boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    call_type public."enum_Messages_call_type"
);


ALTER TABLE public."Messages" OWNER TO postgres;

--
-- Name: Messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Messages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Messages_id_seq" OWNER TO postgres;

--
-- Name: Messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Messages_id_seq" OWNED BY public."Messages".id;


--
-- Name: NotificationSettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NotificationSettings" (
    id uuid NOT NULL,
    "userId" integer NOT NULL,
    "pauseAllPush" boolean DEFAULT false,
    likes public."enum_NotificationSettings_likes" DEFAULT 'EVERYONE'::public."enum_NotificationSettings_likes",
    comments public."enum_NotificationSettings_comments" DEFAULT 'EVERYONE'::public."enum_NotificationSettings_comments",
    mentions public."enum_NotificationSettings_mentions" DEFAULT 'EVERYONE'::public."enum_NotificationSettings_mentions",
    follows boolean DEFAULT true,
    messages boolean DEFAULT true,
    "storyReplies" boolean DEFAULT true,
    "feedbackEmails" boolean DEFAULT true,
    "reminderEmails" boolean DEFAULT true,
    "productEmails" boolean DEFAULT true,
    "newsEmails" boolean DEFAULT true,
    "supportEmails" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "likeMilestones" boolean DEFAULT true
);


ALTER TABLE public."NotificationSettings" OWNER TO postgres;

--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "fromUserId" integer NOT NULL,
    "fromUsername" character varying(255) NOT NULL,
    "fromUserAvatar" character varying(255),
    type public."enum_Notifications_type" NOT NULL,
    "resourceId" integer DEFAULT 0,
    "resourceImage" character varying(255),
    "isRead" boolean DEFAULT false,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- Name: Notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notifications_id_seq" OWNER TO postgres;

--
-- Name: Notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notifications_id_seq" OWNED BY public."Notifications".id;


--
-- Name: PostReports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PostReports" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    reason character varying(255) NOT NULL,
    details text,
    status character varying(255) DEFAULT 'pending'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PostReports" OWNER TO postgres;

--
-- Name: PostReports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PostReports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PostReports_id_seq" OWNER TO postgres;

--
-- Name: PostReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PostReports_id_seq" OWNED BY public."PostReports".id;


--
-- Name: Posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Posts" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    username character varying(255) NOT NULL,
    caption text,
    "mediaUrl" character varying(255) NOT NULL,
    "thumbnailUrl" character varying(255),
    "mediaType" public."enum_Posts_mediaType" DEFAULT 'IMAGE'::public."enum_Posts_mediaType",
    "likesCount" integer DEFAULT 0,
    "commentsCount" integer DEFAULT 0,
    "viewsCount" integer DEFAULT 0,
    "hideLikes" boolean DEFAULT false,
    "commentsDisabled" boolean DEFAULT false,
    "isHidden" boolean DEFAULT false,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Posts" OWNER TO postgres;

--
-- Name: Posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Posts_id_seq" OWNER TO postgres;

--
-- Name: Posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Posts_id_seq" OWNED BY public."Posts".id;


--
-- Name: ReelBookmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReelBookmarks" (
    id integer NOT NULL,
    "reelId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReelBookmarks" OWNER TO postgres;

--
-- Name: ReelBookmarks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ReelBookmarks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReelBookmarks_id_seq" OWNER TO postgres;

--
-- Name: ReelBookmarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ReelBookmarks_id_seq" OWNED BY public."ReelBookmarks".id;


--
-- Name: ReelLikes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReelLikes" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "reelId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReelLikes" OWNER TO postgres;

--
-- Name: ReelLikes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ReelLikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReelLikes_id_seq" OWNER TO postgres;

--
-- Name: ReelLikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ReelLikes_id_seq" OWNED BY public."ReelLikes".id;


--
-- Name: ReelReports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReelReports" (
    id integer NOT NULL,
    "reelId" integer NOT NULL,
    "userId" integer NOT NULL,
    reason character varying(255) NOT NULL,
    details text,
    status character varying(255) DEFAULT 'pending'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReelReports" OWNER TO postgres;

--
-- Name: ReelReports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ReelReports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReelReports_id_seq" OWNER TO postgres;

--
-- Name: ReelReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ReelReports_id_seq" OWNED BY public."ReelReports".id;


--
-- Name: Reels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reels" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    username character varying(255) NOT NULL,
    caption text,
    "videoUrl" character varying(255) NOT NULL,
    "likesCount" integer DEFAULT 0,
    "commentsCount" integer DEFAULT 0,
    "viewsCount" integer DEFAULT 0,
    "isHidden" boolean DEFAULT false,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL,
    "hideLikes" boolean DEFAULT false,
    "commentsDisabled" boolean DEFAULT false
);


ALTER TABLE public."Reels" OWNER TO postgres;

--
-- Name: Reels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reels_id_seq" OWNER TO postgres;

--
-- Name: Reels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reels_id_seq" OWNED BY public."Reels".id;


--
-- Name: ReportReviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReportReviews" (
    id uuid NOT NULL,
    "reportId" uuid NOT NULL,
    "adminId" uuid NOT NULL,
    "actionTaken" character varying(255) NOT NULL,
    notes text,
    "resolvedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReportReviews" OWNER TO postgres;

--
-- Name: Reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reports" (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    username character varying(255),
    text text,
    files jsonb DEFAULT '[]'::jsonb,
    "browserInfo" jsonb
);


ALTER TABLE public."Reports" OWNER TO postgres;

--
-- Name: Reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reports_id_seq" OWNER TO postgres;

--
-- Name: Reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reports_id_seq" OWNED BY public."Reports".id;


--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "targetId" integer NOT NULL,
    type character varying(255) NOT NULL,
    rating integer DEFAULT 5,
    content text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Reviews" OWNER TO postgres;

--
-- Name: Reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reviews_id_seq" OWNER TO postgres;

--
-- Name: Reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;


--
-- Name: Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    permissions jsonb DEFAULT '[]'::jsonb,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Roles" OWNER TO postgres;

--
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Roles_id_seq" OWNER TO postgres;

--
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;


--
-- Name: SavedPosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SavedPosts" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SavedPosts" OWNER TO postgres;

--
-- Name: SavedPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SavedPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SavedPosts_id_seq" OWNER TO postgres;

--
-- Name: SavedPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SavedPosts_id_seq" OWNED BY public."SavedPosts".id;


--
-- Name: SearchIndices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SearchIndices" (
    id integer NOT NULL,
    type public."enum_SearchIndices_type" NOT NULL,
    "referenceId" integer NOT NULL,
    content text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SearchIndices" OWNER TO postgres;

--
-- Name: SearchIndices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SearchIndices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SearchIndices_id_seq" OWNER TO postgres;

--
-- Name: SearchIndices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SearchIndices_id_seq" OWNED BY public."SearchIndices".id;


--
-- Name: Stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Stories" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    username character varying(255) NOT NULL,
    "mediaUrl" character varying(255) NOT NULL,
    "thumbnailUrl" character varying(255),
    "mediaType" public."enum_Stories_mediaType" DEFAULT 'IMAGE'::public."enum_Stories_mediaType",
    "expiresAt" timestamp with time zone NOT NULL,
    "viewsCount" integer DEFAULT 0,
    "likesCount" integer DEFAULT 0,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Stories" OWNER TO postgres;

--
-- Name: Stories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Stories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Stories_id_seq" OWNER TO postgres;

--
-- Name: Stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Stories_id_seq" OWNED BY public."Stories".id;


--
-- Name: StoryReplies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StoryReplies" (
    id integer NOT NULL,
    "storyId" integer NOT NULL,
    "senderId" integer NOT NULL,
    content character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."StoryReplies" OWNER TO postgres;

--
-- Name: StoryReplies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StoryReplies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StoryReplies_id_seq" OWNER TO postgres;

--
-- Name: StoryReplies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StoryReplies_id_seq" OWNED BY public."StoryReplies".id;


--
-- Name: StoryReports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StoryReports" (
    id integer NOT NULL,
    "storyId" integer NOT NULL,
    "reporterId" integer NOT NULL,
    reason character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."StoryReports" OWNER TO postgres;

--
-- Name: StoryReports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StoryReports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StoryReports_id_seq" OWNER TO postgres;

--
-- Name: StoryReports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StoryReports_id_seq" OWNED BY public."StoryReports".id;


--
-- Name: StoryViews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StoryViews" (
    id integer NOT NULL,
    "storyId" integer NOT NULL,
    "viewerId" integer NOT NULL,
    "viewedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."StoryViews" OWNER TO postgres;

--
-- Name: StoryViews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StoryViews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StoryViews_id_seq" OWNER TO postgres;

--
-- Name: StoryViews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StoryViews_id_seq" OWNED BY public."StoryViews".id;


--
-- Name: SystemSettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SystemSettings" (
    key character varying(255) NOT NULL,
    value jsonb NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SystemSettings" OWNER TO postgres;

--
-- Name: UserInterests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserInterests" (
    "userId" integer NOT NULL,
    "interestId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserInterests" OWNER TO postgres;

--
-- Name: UserOnboardingEvents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserOnboardingEvents" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "eventType" character varying(255) NOT NULL,
    "completedDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserOnboardingEvents" OWNER TO postgres;

--
-- Name: UserOnboardingEvents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserOnboardingEvents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserOnboardingEvents_id_seq" OWNER TO postgres;

--
-- Name: UserOnboardingEvents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserOnboardingEvents_id_seq" OWNED BY public."UserOnboardingEvents".id;


--
-- Name: UserProfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserProfiles" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    username character varying(255) NOT NULL,
    "fullName" character varying(255),
    bio text,
    "profilePicture" character varying(255) DEFAULT ''::character varying,
    website character varying(255),
    gender character varying(255),
    "isPrivate" boolean DEFAULT false,
    "showAccountSuggestions" boolean DEFAULT true,
    "allowSearchIndexing" boolean DEFAULT true,
    "followersCount" integer DEFAULT 0,
    "followingCount" integer DEFAULT 0,
    "postCount" integer DEFAULT 0,
    country character varying(255) DEFAULT 'Unknown'::character varying,
    "loginProvider" character varying(255) DEFAULT 'email'::character varying,
    "accountStatus" character varying(255) DEFAULT 'active'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "birthDate" date,
    "isBirthdatePublic" boolean DEFAULT false,
    "onboardingCompleted" boolean DEFAULT false,
    "onboardingStep" integer DEFAULT 1,
    "tutorialCompleted" boolean DEFAULT false,
    "notificationsEnabled" boolean DEFAULT false,
    "accountType" character varying(255) DEFAULT 'personal'::character varying,
    "displayName" character varying(255),
    pronouns character varying(255),
    "pronounVisibility" character varying(255) DEFAULT 'Everyone'::character varying,
    "categoryId" integer,
    "contactEmail" character varying(255),
    "contactPhone" character varying(255),
    "contactAddress" character varying(255),
    "avatarType" character varying(255) DEFAULT 'image'::character varying,
    "avatarUrl" character varying(255),
    "followersVisibility" character varying(255) DEFAULT 'Everyone'::character varying
);


ALTER TABLE public."UserProfiles" OWNER TO postgres;

--
-- Name: UserProfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserProfiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserProfiles_id_seq" OWNER TO postgres;

--
-- Name: UserProfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserProfiles_id_seq" OWNED BY public."UserProfiles".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "resetToken" character varying(255),
    "resetTokenExpiry" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: account_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_history (
    id integer NOT NULL,
    user_id integer NOT NULL,
    action character varying(255) NOT NULL,
    old_value text,
    new_value text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.account_history OWNER TO postgres;

--
-- Name: account_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_history_id_seq OWNER TO postgres;

--
-- Name: account_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_history_id_seq OWNED BY public.account_history.id;


--
-- Name: account_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_metrics (
    id uuid NOT NULL,
    "userId" integer NOT NULL,
    date date NOT NULL,
    "totalReach" integer DEFAULT 0,
    "totalEngaged" integer DEFAULT 0,
    "profileVisits" integer DEFAULT 0,
    "newFollowers" integer DEFAULT 0,
    "lostFollowers" integer DEFAULT 0,
    "followersFromPosts" integer DEFAULT 0,
    "followersFromAds" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.account_metrics OWNER TO postgres;

--
-- Name: account_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_status (
    user_id integer NOT NULL,
    status public.enum_account_status_status DEFAULT 'OK'::public.enum_account_status_status,
    last_checked timestamp with time zone
);


ALTER TABLE public.account_status OWNER TO postgres;

--
-- Name: ad_bookmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_bookmarks (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_bookmarks OWNER TO postgres;

--
-- Name: ad_budgets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_budgets (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    "dailyBudget" numeric(10,2) NOT NULL,
    "totalBudget" numeric(10,2),
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone,
    "durationDays" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_budgets OWNER TO postgres;

--
-- Name: ad_clicks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_clicks (
    id integer NOT NULL,
    "adId" uuid NOT NULL,
    "clickerId" integer,
    "timestamp" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_clicks OWNER TO postgres;

--
-- Name: ad_clicks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ad_clicks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ad_clicks_id_seq OWNER TO postgres;

--
-- Name: ad_clicks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ad_clicks_id_seq OWNED BY public.ad_clicks.id;


--
-- Name: ad_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_comments (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    "userId" integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_comments OWNER TO postgres;

--
-- Name: ad_impressions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_impressions (
    id integer NOT NULL,
    "adId" uuid NOT NULL,
    "viewerId" integer,
    "timestamp" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_impressions OWNER TO postgres;

--
-- Name: ad_impressions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ad_impressions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ad_impressions_id_seq OWNER TO postgres;

--
-- Name: ad_impressions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ad_impressions_id_seq OWNED BY public.ad_impressions.id;


--
-- Name: ad_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_likes (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_likes OWNER TO postgres;

--
-- Name: ad_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_media (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    "mediaType" public."enum_ad_media_mediaType" NOT NULL,
    "r2Key" character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    "thumbnailUrl" character varying(255),
    "aspectRatio" character varying(255),
    "order" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_media OWNER TO postgres;

--
-- Name: ad_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_metrics (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    impressions integer DEFAULT 0,
    clicks integer DEFAULT 0,
    reach integer DEFAULT 0,
    spent numeric(10,2) DEFAULT 0,
    date date NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_metrics OWNER TO postgres;

--
-- Name: ad_targets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_targets (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    "targetType" public."enum_ad_targets_targetType" DEFAULT 'AUTOMATIC'::public."enum_ad_targets_targetType",
    locations jsonb,
    "ageRange" jsonb,
    interests jsonb,
    gender public.enum_ad_targets_gender DEFAULT 'ALL'::public.enum_ad_targets_gender,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ad_targets OWNER TO postgres;

--
-- Name: admin_audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_audit_logs (
    id integer NOT NULL,
    "adminId" integer NOT NULL,
    "actionType" character varying(255) NOT NULL,
    "targetType" public."enum_admin_audit_logs_targetType" NOT NULL,
    "targetId" character varying(255),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.admin_audit_logs OWNER TO postgres;

--
-- Name: admin_audit_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_audit_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_audit_logs_id_seq OWNER TO postgres;

--
-- Name: admin_audit_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_audit_logs_id_seq OWNED BY public.admin_audit_logs.id;


--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    username character varying(255),
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "roleId" integer NOT NULL,
    "isActive" boolean DEFAULT true,
    "lastLogin" timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ads (
    id uuid NOT NULL,
    "userId" integer NOT NULL,
    title character varying(255),
    caption text,
    "ctaText" character varying(255),
    "destinationUrl" character varying(255),
    "adType" public."enum_ads_adType" DEFAULT 'NEW_MEDIA'::public."enum_ads_adType",
    status public.enum_ads_status DEFAULT 'DRAFT'::public.enum_ads_status,
    "hideLikes" boolean DEFAULT false,
    "commentsDisabled" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ads OWNER TO postgres;

--
-- Name: blocked_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blocked_users (
    id uuid NOT NULL,
    blocker_id integer NOT NULL,
    blocked_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.blocked_users OWNER TO postgres;

--
-- Name: boosted_content_references; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boosted_content_references (
    id uuid NOT NULL,
    "adId" uuid NOT NULL,
    "contentType" public."enum_boosted_content_references_contentType" NOT NULL,
    "contentId" integer NOT NULL,
    "originalData" jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.boosted_content_references OWNER TO postgres;

--
-- Name: call_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.call_logs (
    id uuid NOT NULL,
    caller_id integer NOT NULL,
    receiver_id integer NOT NULL,
    call_type public.enum_call_logs_call_type NOT NULL,
    status public.enum_call_logs_status NOT NULL,
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    duration_seconds integer DEFAULT 0
);


ALTER TABLE public.call_logs OWNER TO postgres;

--
-- Name: call_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.call_sessions (
    id uuid NOT NULL,
    room_name character varying(255) NOT NULL,
    caller_id integer NOT NULL,
    receiver_id integer NOT NULL,
    call_type public.enum_call_sessions_call_type NOT NULL,
    status public.enum_call_sessions_status DEFAULT 'ringing'::public.enum_call_sessions_status,
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    duration_seconds integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.call_sessions OWNER TO postgres;

--
-- Name: close_friends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.close_friends (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    friend_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.close_friends OWNER TO postgres;

--
-- Name: connected_apps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.connected_apps (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    app_name character varying(255) NOT NULL,
    status public.enum_connected_apps_status DEFAULT 'active'::public.enum_connected_apps_status,
    access_type character varying(255) DEFAULT 'Basic access'::character varying,
    connected_at timestamp with time zone
);


ALTER TABLE public.connected_apps OWNER TO postgres;

--
-- Name: content_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_metrics (
    id uuid NOT NULL,
    "userId" integer NOT NULL,
    "contentId" character varying(255) NOT NULL,
    "contentType" public."enum_content_metrics_contentType" NOT NULL,
    date date NOT NULL,
    views integer DEFAULT 0,
    reach integer DEFAULT 0,
    likes integer DEFAULT 0,
    comments integer DEFAULT 0,
    shares integer DEFAULT 0,
    saves integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.content_metrics OWNER TO postgres;

--
-- Name: content_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_preferences (
    user_id integer NOT NULL,
    sensitive_content_level public.enum_content_preferences_sensitive_content_level DEFAULT 'limit_more'::public.enum_content_preferences_sensitive_content_level,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.content_preferences OWNER TO postgres;

--
-- Name: dm_moderation_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dm_moderation_logs (
    id integer NOT NULL,
    "adminId" integer NOT NULL,
    "conversationId" integer NOT NULL,
    "actionType" public."enum_dm_moderation_logs_actionType" NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.dm_moderation_logs OWNER TO postgres;

--
-- Name: dm_moderation_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dm_moderation_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dm_moderation_logs_id_seq OWNER TO postgres;

--
-- Name: dm_moderation_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dm_moderation_logs_id_seq OWNED BY public.dm_moderation_logs.id;


--
-- Name: explore_algorithm_config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.explore_algorithm_config (
    id integer NOT NULL,
    "freshnessWeight" integer DEFAULT 70,
    "engagementWeight" integer DEFAULT 60,
    "relevanceWeight" integer DEFAULT 85,
    "locationWeight" integer DEFAULT 40,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.explore_algorithm_config OWNER TO postgres;

--
-- Name: explore_algorithm_config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.explore_algorithm_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.explore_algorithm_config_id_seq OWNER TO postgres;

--
-- Name: explore_algorithm_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.explore_algorithm_config_id_seq OWNED BY public.explore_algorithm_config.id;


--
-- Name: explore_trending_topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.explore_trending_topics (
    id integer NOT NULL,
    topic character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.explore_trending_topics OWNER TO postgres;

--
-- Name: explore_trending_topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.explore_trending_topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.explore_trending_topics_id_seq OWNER TO postgres;

--
-- Name: explore_trending_topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.explore_trending_topics_id_seq OWNED BY public.explore_trending_topics.id;


--
-- Name: favorite_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite_accounts (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    favorite_user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.favorite_accounts OWNER TO postgres;

--
-- Name: feature_limits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feature_limits (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    feature_name character varying(255) NOT NULL,
    is_blocked boolean DEFAULT true
);


ALTER TABLE public.feature_limits OWNER TO postgres;

--
-- Name: featured_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.featured_content (
    id integer NOT NULL,
    "contentType" public."enum_featured_content_contentType" NOT NULL,
    "contentId" integer NOT NULL,
    "isFeatured" boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.featured_content OWNER TO postgres;

--
-- Name: featured_content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.featured_content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.featured_content_id_seq OWNER TO postgres;

--
-- Name: featured_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.featured_content_id_seq OWNED BY public.featured_content.id;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    rating character varying(255) NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- Name: follower_activity_heatmap; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follower_activity_heatmap (
    id bigint NOT NULL,
    "userId" integer NOT NULL,
    "dayOfWeek" integer NOT NULL,
    "hourOfDay" integer NOT NULL,
    count integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.follower_activity_heatmap OWNER TO postgres;

--
-- Name: follower_activity_heatmap_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.follower_activity_heatmap_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.follower_activity_heatmap_id_seq OWNER TO postgres;

--
-- Name: follower_activity_heatmap_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.follower_activity_heatmap_id_seq OWNED BY public.follower_activity_heatmap.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follows (
    id uuid NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.follows OWNER TO postgres;

--
-- Name: hashtag_follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hashtag_follows (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    hashtag character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.hashtag_follows OWNER TO postgres;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    status public.enum_hashtags_status DEFAULT 'active'::public.enum_hashtags_status,
    "isTrending" boolean DEFAULT false,
    deleted boolean DEFAULT false,
    "postsCount" integer DEFAULT 0,
    "reelsCount" integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.hashtags OWNER TO postgres;

--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hashtags_id_seq OWNER TO postgres;

--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: help_article_feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_article_feedbacks (
    id uuid NOT NULL,
    "articleId" uuid NOT NULL,
    "userId" uuid,
    "isHelpful" boolean NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.help_article_feedbacks OWNER TO postgres;

--
-- Name: help_article_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_article_tags (
    article_id uuid NOT NULL,
    tag_id uuid NOT NULL
);


ALTER TABLE public.help_article_tags OWNER TO postgres;

--
-- Name: help_articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_articles (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    content text NOT NULL,
    excerpt text,
    status public.enum_help_articles_status DEFAULT 'published'::public.enum_help_articles_status,
    category_id uuid NOT NULL,
    views_count integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.help_articles OWNER TO postgres;

--
-- Name: help_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_categories (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    icon character varying(255),
    parent_id uuid,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.help_categories OWNER TO postgres;

--
-- Name: help_subcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_subcategories (
    id uuid NOT NULL,
    "categoryId" uuid NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    "order" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.help_subcategories OWNER TO postgres;

--
-- Name: help_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.help_tags (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE public.help_tags OWNER TO postgres;

--
-- Name: highlight_stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.highlight_stories (
    id integer NOT NULL,
    highlight_id uuid NOT NULL,
    story_id integer NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.highlight_stories OWNER TO postgres;

--
-- Name: highlight_stories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.highlight_stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.highlight_stories_id_seq OWNER TO postgres;

--
-- Name: highlight_stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.highlight_stories_id_seq OWNED BY public.highlight_stories.id;


--
-- Name: highlights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.highlights (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    title character varying(255) NOT NULL,
    cover_story_id integer,
    created_at timestamp with time zone
);


ALTER TABLE public.highlights OWNER TO postgres;

--
-- Name: impressions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.impressions (
    id bigint NOT NULL,
    "userId" integer NOT NULL,
    "contentId" character varying(255) NOT NULL,
    "contentType" public."enum_impressions_contentType" NOT NULL,
    "viewerId" integer,
    "timestamp" timestamp with time zone
);


ALTER TABLE public.impressions OWNER TO postgres;

--
-- Name: impressions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.impressions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.impressions_id_seq OWNER TO postgres;

--
-- Name: impressions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.impressions_id_seq OWNED BY public.impressions.id;


--
-- Name: interactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interactions (
    id bigint NOT NULL,
    "userId" integer NOT NULL,
    "contentId" character varying(255) NOT NULL,
    "contentType" public."enum_interactions_contentType" NOT NULL,
    "actorId" integer NOT NULL,
    type public.enum_interactions_type NOT NULL,
    "timestamp" timestamp with time zone
);


ALTER TABLE public.interactions OWNER TO postgres;

--
-- Name: interactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interactions_id_seq OWNER TO postgres;

--
-- Name: interactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interactions_id_seq OWNED BY public.interactions.id;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(10) NOT NULL,
    "flagCode" character varying(10) NOT NULL,
    "isActive" boolean DEFAULT false,
    "isDefault" boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.languages_id_seq OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: like_share_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.like_share_settings (
    user_id integer NOT NULL,
    hide_like_share_counts boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.like_share_settings OWNER TO postgres;

--
-- Name: live_blocked_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_blocked_keywords (
    id uuid NOT NULL,
    "streamId" uuid NOT NULL,
    keyword character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.live_blocked_keywords OWNER TO postgres;

--
-- Name: live_blocked_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_blocked_users (
    id uuid NOT NULL,
    "streamId" uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    username character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.live_blocked_users OWNER TO postgres;

--
-- Name: live_chat_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_chat_messages (
    id uuid NOT NULL,
    "streamId" uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    username character varying(255),
    "profilePic" character varying(255),
    message text NOT NULL,
    "isModerator" boolean DEFAULT false,
    "isSystem" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.live_chat_messages OWNER TO postgres;

--
-- Name: live_donations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_donations (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    user_id character varying(255) NOT NULL,
    username character varying(255),
    amount numeric(10,2) NOT NULL,
    message text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_donations OWNER TO postgres;

--
-- Name: live_guest_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_guest_requests (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    user_id character varying(255) NOT NULL,
    username character varying(255),
    status public.enum_live_guest_requests_status DEFAULT 'pending'::public.enum_live_guest_requests_status,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_guest_requests OWNER TO postgres;

--
-- Name: live_moderators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_moderators (
    id uuid NOT NULL,
    "streamId" uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.live_moderators OWNER TO postgres;

--
-- Name: live_muted_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_muted_users (
    id uuid NOT NULL,
    "streamId" uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    username character varying(255),
    muted_until timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.live_muted_users OWNER TO postgres;

--
-- Name: live_poll_votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_poll_votes (
    id uuid NOT NULL,
    poll_id uuid NOT NULL,
    user_id character varying(255) NOT NULL,
    option_index integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_poll_votes OWNER TO postgres;

--
-- Name: live_polls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_polls (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    question character varying(255) NOT NULL,
    options jsonb NOT NULL,
    duration integer DEFAULT 60,
    is_active boolean DEFAULT true,
    ended_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_polls OWNER TO postgres;

--
-- Name: live_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_products (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    product_id character varying(255) NOT NULL,
    featured boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_products OWNER TO postgres;

--
-- Name: live_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_questions (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    user_id character varying(255) NOT NULL,
    username character varying(255),
    content text NOT NULL,
    is_approved boolean DEFAULT false,
    is_highlighted boolean DEFAULT false,
    is_answered boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_questions OWNER TO postgres;

--
-- Name: live_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_settings (
    id uuid NOT NULL,
    "streamId" uuid NOT NULL,
    comments_enabled boolean DEFAULT true,
    filter_spam boolean DEFAULT false,
    filter_abuse boolean DEFAULT false,
    filter_flagged boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.live_settings OWNER TO postgres;

--
-- Name: live_stream_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_stream_messages (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    user_id character varying(255) NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_stream_messages OWNER TO postgres;

--
-- Name: live_stream_viewers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_stream_viewers (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    user_id character varying(255) NOT NULL,
    joined_at timestamp with time zone,
    left_at timestamp with time zone,
    watch_duration_seconds integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_stream_viewers OWNER TO postgres;

--
-- Name: live_streams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_streams (
    id uuid NOT NULL,
    room_name character varying(255),
    title character varying(255),
    category character varying(255) DEFAULT 'Social'::character varying,
    visibility public.enum_live_streams_visibility DEFAULT 'public'::public.enum_live_streams_visibility,
    thumbnail_url character varying(255),
    status public.enum_live_streams_status DEFAULT 'scheduled'::public.enum_live_streams_status,
    scheduled_at timestamp with time zone,
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    peak_viewers integer DEFAULT 0,
    total_viewers integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    host_id character varying(255),
    hashtags character varying(255)
);


ALTER TABLE public.live_streams OWNER TO postgres;

--
-- Name: live_supporters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_supporters (
    id uuid NOT NULL,
    stream_id uuid NOT NULL,
    user_id character varying(255) NOT NULL,
    username character varying(255),
    badge_level integer DEFAULT 1,
    amount_paid numeric(10,2) DEFAULT 0,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.live_supporters OWNER TO postgres;

--
-- Name: live_viewers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_viewers (
    id uuid NOT NULL,
    "streamId" uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    "joinedAt" timestamp with time zone,
    "leftAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.live_viewers OWNER TO postgres;

--
-- Name: muted_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.muted_accounts (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    muted_user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    mute_posts boolean DEFAULT true,
    mute_stories boolean DEFAULT true
);


ALTER TABLE public.muted_accounts OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    type character varying(255) NOT NULL,
    from_user_id integer,
    from_username character varying(255),
    from_user_avatar character varying(255),
    title character varying(255) NOT NULL,
    message text NOT NULL,
    link character varying(255),
    is_read boolean DEFAULT false,
    created_at timestamp with time zone
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: pending_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pending_tags (
    id uuid NOT NULL,
    post_id integer NOT NULL,
    tagged_user_id integer NOT NULL,
    tagged_by_user_id integer NOT NULL,
    status public.enum_pending_tags_status DEFAULT 'pending'::public.enum_pending_tags_status,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.pending_tags OWNER TO postgres;

--
-- Name: pinned_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pinned_posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "position" integer DEFAULT 0
);


ALTER TABLE public.pinned_posts OWNER TO postgres;

--
-- Name: pinned_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pinned_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pinned_posts_id_seq OWNER TO postgres;

--
-- Name: pinned_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pinned_posts_id_seq OWNED BY public.pinned_posts.id;


--
-- Name: post_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_tags (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "taggedUserId" integer NOT NULL,
    approved boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.post_tags OWNER TO postgres;

--
-- Name: post_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_tags_id_seq OWNER TO postgres;

--
-- Name: post_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_tags_id_seq OWNED BY public.post_tags.id;


--
-- Name: profile_actions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_actions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    type character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.profile_actions OWNER TO postgres;

--
-- Name: profile_actions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_actions_id_seq OWNER TO postgres;

--
-- Name: profile_actions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_actions_id_seq OWNED BY public.profile_actions.id;


--
-- Name: profile_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_links (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    title character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    "position" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.profile_links OWNER TO postgres;

--
-- Name: profile_links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profile_links_id_seq OWNER TO postgres;

--
-- Name: profile_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_links_id_seq OWNED BY public.profile_links.id;


--
-- Name: push_subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.push_subscriptions (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    endpoint text NOT NULL,
    p256dh character varying(255) NOT NULL,
    auth character varying(255) NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.push_subscriptions OWNER TO postgres;

--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id uuid NOT NULL,
    reporter_id integer NOT NULL,
    reported_user_id integer NOT NULL,
    content_type public.enum_reports_content_type NOT NULL,
    content_id character varying(255),
    reason character varying(255) NOT NULL,
    description text,
    status public.enum_reports_status DEFAULT 'pending'::public.enum_reports_status,
    resolution_type public.enum_reports_resolution_type,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: restricted_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restricted_accounts (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    restricted_user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.restricted_accounts OWNER TO postgres;

--
-- Name: scheduled_streams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scheduled_streams (
    id uuid NOT NULL,
    "userId" character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    "scheduledAt" timestamp with time zone NOT NULL,
    category public.enum_scheduled_streams_category DEFAULT 'Social'::public.enum_scheduled_streams_category NOT NULL,
    "thumbnailUrl" character varying(255),
    visibility public.enum_scheduled_streams_visibility DEFAULT 'Public'::public.enum_scheduled_streams_visibility,
    status public.enum_scheduled_streams_status DEFAULT 'SCHEDULED'::public.enum_scheduled_streams_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.scheduled_streams OWNER TO postgres;

--
-- Name: story_highlights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.story_highlights (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    title character varying(255) NOT NULL,
    "coverImage" character varying(255),
    "createdAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.story_highlights OWNER TO postgres;

--
-- Name: story_highlights_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.story_highlights_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.story_highlights_id_seq OWNER TO postgres;

--
-- Name: story_highlights_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.story_highlights_id_seq OWNED BY public.story_highlights.id;


--
-- Name: story_privacy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.story_privacy (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    hidden_user_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.story_privacy OWNER TO postgres;

--
-- Name: story_reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.story_reactions (
    id integer NOT NULL,
    "storyId" integer NOT NULL,
    "reactorId" integer NOT NULL,
    type character varying(255) DEFAULT 'LIKE'::character varying,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.story_reactions OWNER TO postgres;

--
-- Name: story_reactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.story_reactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.story_reactions_id_seq OWNER TO postgres;

--
-- Name: story_reactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.story_reactions_id_seq OWNED BY public.story_reactions.id;


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    creator_id integer NOT NULL,
    status public.enum_subscriptions_status DEFAULT 'active'::public.enum_subscriptions_status,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: support_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_requests (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    category public.enum_support_requests_category NOT NULL,
    status public.enum_support_requests_status DEFAULT 'pending'::public.enum_support_requests_status,
    description text,
    created_at timestamp with time zone
);


ALTER TABLE public.support_requests OWNER TO postgres;

--
-- Name: system_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.system_settings (
    id integer NOT NULL,
    maintenance_mode boolean DEFAULT false,
    allow_registrations boolean DEFAULT true,
    email_alerts boolean DEFAULT true,
    admin_theme character varying(255) DEFAULT 'light'::character varying,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.system_settings OWNER TO postgres;

--
-- Name: system_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.system_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.system_settings_id_seq OWNER TO postgres;

--
-- Name: system_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.system_settings_id_seq OWNED BY public.system_settings.id;


--
-- Name: user_activity_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_activity_settings (
    user_id integer NOT NULL,
    show_activity_status boolean DEFAULT true,
    last_active_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_activity_settings OWNER TO postgres;

--
-- Name: user_avatars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_avatars (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    username character varying(255) NOT NULL,
    "avatarUrl" character varying(255) NOT NULL,
    status public.enum_user_avatars_status DEFAULT 'pending'::public.enum_user_avatars_status,
    "uploadedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.user_avatars OWNER TO postgres;

--
-- Name: user_avatars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_avatars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_avatars_id_seq OWNER TO postgres;

--
-- Name: user_avatars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_avatars_id_seq OWNED BY public.user_avatars.id;


--
-- Name: user_comment_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_comment_settings (
    user_id integer NOT NULL,
    allow_from public.enum_user_comment_settings_allow_from DEFAULT 'everyone'::public.enum_user_comment_settings_allow_from,
    allow_gif boolean DEFAULT true,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_comment_settings OWNER TO postgres;

--
-- Name: user_custom_words; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_custom_words (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    word text NOT NULL
);


ALTER TABLE public.user_custom_words OWNER TO postgres;

--
-- Name: user_general_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_general_settings (
    user_id integer NOT NULL,
    save_story_to_archive boolean DEFAULT true,
    reduce_motion boolean DEFAULT false,
    language_code character varying(255) DEFAULT 'en'::character varying,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_general_settings OWNER TO postgres;

--
-- Name: user_hidden_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_hidden_settings (
    user_id integer NOT NULL,
    hide_comments boolean DEFAULT false,
    advanced_filter boolean DEFAULT false,
    hide_message_requests boolean DEFAULT false,
    custom_hide_comments boolean DEFAULT false,
    custom_hide_message_requests boolean DEFAULT false
);


ALTER TABLE public.user_hidden_settings OWNER TO postgres;

--
-- Name: user_message_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_message_settings (
    user_id integer NOT NULL,
    message_requests_from public.enum_user_message_settings_message_requests_from DEFAULT 'everyone'::public.enum_user_message_settings_message_requests_from,
    group_add_permission public.enum_user_message_settings_group_add_permission DEFAULT 'everyone'::public.enum_user_message_settings_group_add_permission,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_message_settings OWNER TO postgres;

--
-- Name: user_privacy_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_privacy_settings (
    user_id integer NOT NULL,
    allow_tags_from public.enum_user_privacy_settings_allow_tags_from DEFAULT 'everyone'::public.enum_user_privacy_settings_allow_tags_from,
    manual_tag_approval boolean DEFAULT false,
    allow_mentions_from public.enum_user_privacy_settings_allow_mentions_from DEFAULT 'everyone'::public.enum_user_privacy_settings_allow_mentions_from,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_privacy_settings OWNER TO postgres;

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "deviceId" character varying(255) NOT NULL,
    token text,
    "lastLogin" timestamp with time zone,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_sessions_id_seq OWNER TO postgres;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_sessions_id_seq OWNED BY public.user_sessions.id;


--
-- Name: user_sharing_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sharing_settings (
    user_id integer NOT NULL,
    story_shares boolean DEFAULT true,
    post_to_story boolean DEFAULT true,
    reposts boolean DEFAULT true,
    website_embeds boolean DEFAULT true,
    featured_requests boolean DEFAULT true
);


ALTER TABLE public.user_sharing_settings OWNER TO postgres;

--
-- Name: user_story_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_story_settings (
    user_id integer NOT NULL,
    story_replies public.enum_user_story_settings_story_replies DEFAULT 'everyone'::public.enum_user_story_settings_story_replies,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_story_settings OWNER TO postgres;

--
-- Name: violations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.violations (
    id uuid NOT NULL,
    user_id integer NOT NULL,
    type character varying(255) NOT NULL,
    description text,
    created_at timestamp with time zone
);


ALTER TABLE public.violations OWNER TO postgres;

--
-- Name: AccountAnalytics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountAnalytics" ALTER COLUMN id SET DEFAULT nextval('public."AccountAnalytics_id_seq"'::regclass);


--
-- Name: AccountCategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountCategories" ALTER COLUMN id SET DEFAULT nextval('public."AccountCategories_id_seq"'::regclass);


--
-- Name: AccountHistories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountHistories" ALTER COLUMN id SET DEFAULT nextval('public."AccountHistories_id_seq"'::regclass);


--
-- Name: AccountProfiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles" ALTER COLUMN id SET DEFAULT nextval('public."AccountProfiles_id_seq"'::regclass);


--
-- Name: AdminNotifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AdminNotifications" ALTER COLUMN id SET DEFAULT nextval('public."AdminNotifications_id_seq"'::regclass);


--
-- Name: CommentLikes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CommentLikes" ALTER COLUMN id SET DEFAULT nextval('public."CommentLikes_id_seq"'::regclass);


--
-- Name: Comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments" ALTER COLUMN id SET DEFAULT nextval('public."Comments_id_seq"'::regclass);


--
-- Name: ContactMatches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactMatches" ALTER COLUMN id SET DEFAULT nextval('public."ContactMatches_id_seq"'::regclass);


--
-- Name: Conversations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Conversations" ALTER COLUMN id SET DEFAULT nextval('public."Conversations_id_seq"'::regclass);


--
-- Name: Interests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests" ALTER COLUMN id SET DEFAULT nextval('public."Interests_id_seq"'::regclass);


--
-- Name: Likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes" ALTER COLUMN id SET DEFAULT nextval('public."Likes_id_seq"'::regclass);


--
-- Name: Messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages" ALTER COLUMN id SET DEFAULT nextval('public."Messages_id_seq"'::regclass);


--
-- Name: Notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications" ALTER COLUMN id SET DEFAULT nextval('public."Notifications_id_seq"'::regclass);


--
-- Name: PostReports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PostReports" ALTER COLUMN id SET DEFAULT nextval('public."PostReports_id_seq"'::regclass);


--
-- Name: Posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts" ALTER COLUMN id SET DEFAULT nextval('public."Posts_id_seq"'::regclass);


--
-- Name: ReelBookmarks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReelBookmarks" ALTER COLUMN id SET DEFAULT nextval('public."ReelBookmarks_id_seq"'::regclass);


--
-- Name: ReelLikes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReelLikes" ALTER COLUMN id SET DEFAULT nextval('public."ReelLikes_id_seq"'::regclass);


--
-- Name: ReelReports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReelReports" ALTER COLUMN id SET DEFAULT nextval('public."ReelReports_id_seq"'::regclass);


--
-- Name: Reels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reels" ALTER COLUMN id SET DEFAULT nextval('public."Reels_id_seq"'::regclass);


--
-- Name: Reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reports" ALTER COLUMN id SET DEFAULT nextval('public."Reports_id_seq"'::regclass);


--
-- Name: Reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);


--
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- Name: SavedPosts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedPosts" ALTER COLUMN id SET DEFAULT nextval('public."SavedPosts_id_seq"'::regclass);


--
-- Name: SearchIndices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SearchIndices" ALTER COLUMN id SET DEFAULT nextval('public."SearchIndices_id_seq"'::regclass);


--
-- Name: Stories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stories" ALTER COLUMN id SET DEFAULT nextval('public."Stories_id_seq"'::regclass);


--
-- Name: StoryReplies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoryReplies" ALTER COLUMN id SET DEFAULT nextval('public."StoryReplies_id_seq"'::regclass);


--
-- Name: StoryReports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoryReports" ALTER COLUMN id SET DEFAULT nextval('public."StoryReports_id_seq"'::regclass);


--
-- Name: StoryViews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoryViews" ALTER COLUMN id SET DEFAULT nextval('public."StoryViews_id_seq"'::regclass);


--
-- Name: UserOnboardingEvents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserOnboardingEvents" ALTER COLUMN id SET DEFAULT nextval('public."UserOnboardingEvents_id_seq"'::regclass);


--
-- Name: UserProfiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles" ALTER COLUMN id SET DEFAULT nextval('public."UserProfiles_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: account_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_history ALTER COLUMN id SET DEFAULT nextval('public.account_history_id_seq'::regclass);


--
-- Name: ad_clicks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_clicks ALTER COLUMN id SET DEFAULT nextval('public.ad_clicks_id_seq'::regclass);


--
-- Name: ad_impressions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_impressions ALTER COLUMN id SET DEFAULT nextval('public.ad_impressions_id_seq'::regclass);


--
-- Name: admin_audit_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_audit_logs ALTER COLUMN id SET DEFAULT nextval('public.admin_audit_logs_id_seq'::regclass);


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: dm_moderation_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_moderation_logs ALTER COLUMN id SET DEFAULT nextval('public.dm_moderation_logs_id_seq'::regclass);


--
-- Name: explore_algorithm_config id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_algorithm_config ALTER COLUMN id SET DEFAULT nextval('public.explore_algorithm_config_id_seq'::regclass);


--
-- Name: explore_trending_topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics ALTER COLUMN id SET DEFAULT nextval('public.explore_trending_topics_id_seq'::regclass);


--
-- Name: featured_content id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.featured_content ALTER COLUMN id SET DEFAULT nextval('public.featured_content_id_seq'::regclass);


--
-- Name: follower_activity_heatmap id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follower_activity_heatmap ALTER COLUMN id SET DEFAULT nextval('public.follower_activity_heatmap_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: highlight_stories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.highlight_stories ALTER COLUMN id SET DEFAULT nextval('public.highlight_stories_id_seq'::regclass);


--
-- Name: impressions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impressions ALTER COLUMN id SET DEFAULT nextval('public.impressions_id_seq'::regclass);


--
-- Name: interactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interactions ALTER COLUMN id SET DEFAULT nextval('public.interactions_id_seq'::regclass);


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: pinned_posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pinned_posts ALTER COLUMN id SET DEFAULT nextval('public.pinned_posts_id_seq'::regclass);


--
-- Name: post_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags ALTER COLUMN id SET DEFAULT nextval('public.post_tags_id_seq'::regclass);


--
-- Name: profile_actions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_actions ALTER COLUMN id SET DEFAULT nextval('public.profile_actions_id_seq'::regclass);


--
-- Name: profile_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_links ALTER COLUMN id SET DEFAULT nextval('public.profile_links_id_seq'::regclass);


--
-- Name: story_highlights id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story_highlights ALTER COLUMN id SET DEFAULT nextval('public.story_highlights_id_seq'::regclass);


--
-- Name: story_reactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story_reactions ALTER COLUMN id SET DEFAULT nextval('public.story_reactions_id_seq'::regclass);


--
-- Name: system_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_settings ALTER COLUMN id SET DEFAULT nextval('public.system_settings_id_seq'::regclass);


--
-- Name: user_avatars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_avatars ALTER COLUMN id SET DEFAULT nextval('public.user_avatars_id_seq'::regclass);


--
-- Name: user_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions ALTER COLUMN id SET DEFAULT nextval('public.user_sessions_id_seq'::regclass);


--
-- Data for Name: AccountAnalytics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AccountAnalytics" (id, "userId", profile_views, post_reach, engagement, followers_growth, recorded_at) FROM stdin;
\.


--
-- Data for Name: AccountCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AccountCategories" (id, name, type, "createdAt", "updatedAt") FROM stdin;
1	Fitness Trainer	creator	2026-03-05 10:22:53.42081+05:30	2026-03-05 10:22:53.42081+05:30
2	Photographer	creator	2026-03-05 10:22:53.421646+05:30	2026-03-05 10:22:53.421646+05:30
3	Artist	creator	2026-03-05 10:22:53.421958+05:30	2026-03-05 10:22:53.421958+05:30
4	Musician	creator	2026-03-05 10:22:53.422218+05:30	2026-03-05 10:22:53.422218+05:30
5	Chef	creator	2026-03-05 10:22:53.422524+05:30	2026-03-05 10:22:53.422524+05:30
6	Fashion Designer	creator	2026-03-05 10:22:53.422875+05:30	2026-03-05 10:22:53.422875+05:30
7	Gamer	creator	2026-03-05 10:22:53.423193+05:30	2026-03-05 10:22:53.423193+05:30
8	Public Figure	creator	2026-03-05 10:22:53.423468+05:30	2026-03-05 10:22:53.423468+05:30
9	Brand	business	2026-03-05 10:22:53.423694+05:30	2026-03-05 10:22:53.423694+05:30
10	Restaurant	business	2026-03-05 10:22:53.423934+05:30	2026-03-05 10:22:53.423934+05:30
11	Shop	business	2026-03-05 10:22:53.424125+05:30	2026-03-05 10:22:53.424125+05:30
12	Startup	business	2026-03-05 10:22:53.424324+05:30	2026-03-05 10:22:53.424324+05:30
13	Artist	creator	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
14	Blogger	creator	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
15	Digital Creator	creator	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
16	Education	creator	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
17	Entrepreneur	business	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
18	Health/Beauty	business	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
19	Editor	creator	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
20	Writer	creator	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
21	Personal Blog	creator	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
22	Product/Service	business	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
23	Shopping & Retail	business	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
24	Restaurant	business	2026-03-05 10:45:56.677+05:30	2026-03-05 10:45:56.677+05:30
\.


--
-- Data for Name: AccountHistories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AccountHistories" (id, "userId", action, title, description, "oldValue", "newValue", icon, "createdAt", "updatedAt") FROM stdin;
2	2	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-02-25 10:09:22.147+05:30	2026-02-25 10:09:22.147+05:30
3	3	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-02-26 10:44:52.234+05:30	2026-02-26 10:44:52.234+05:30
5	5	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-02-26 11:04:01.213+05:30	2026-02-26 11:04:01.213+05:30
6	6	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-02-26 11:16:36.873+05:30	2026-02-26 11:16:36.873+05:30
7	7	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-02-26 11:20:42.812+05:30	2026-02-26 11:20:42.812+05:30
8	8	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-02 11:05:14.657+05:30	2026-03-02 11:05:14.658+05:30
9	9	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-02 12:09:12.716+05:30	2026-03-02 12:09:12.716+05:30
10	10	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-02 12:10:33.763+05:30	2026-03-02 12:10:33.763+05:30
11	11	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-04 09:08:31.33+05:30	2026-03-04 09:08:31.33+05:30
12	12	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-04 11:42:31.867+05:30	2026-03-04 11:42:31.868+05:30
13	13	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-04 12:14:06.454+05:30	2026-03-04 12:14:06.454+05:30
14	14	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-04 12:42:58.09+05:30	2026-03-04 12:42:58.09+05:30
15	15	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-04 12:50:42.501+05:30	2026-03-04 12:50:42.501+05:30
16	16	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-04 13:14:14.086+05:30	2026-03-04 13:14:14.086+05:30
17	17	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-04 13:30:29.152+05:30	2026-03-04 13:30:29.152+05:30
18	18	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-05 14:26:45.1+05:30	2026-03-05 14:26:45.1+05:30
19	19	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-05 14:54:58.389+05:30	2026-03-05 14:54:58.389+05:30
20	20	account_created	Account Created	You created your account.	\N	\N	UserPlus	2026-03-07 10:39:00.616+05:30	2026-03-07 10:39:00.616+05:30
\.


--
-- Data for Name: AccountProfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AccountProfiles" (id, "userId", category, business_email, business_phone, business_address, website, "createdAt", "updatedAt", whatsapp_number, reach_preference, display_category, display_contact) FROM stdin;
2	18	Health/Beauty	\N	\N	\N	\N	2026-03-05 14:29:45.682+05:30	2026-03-05 14:29:45.78+05:30	\N	call	t	t
1	3	Fitness Trainer	\N	\N	\N	\N	2026-03-05 11:29:01.716+05:30	2026-03-05 15:01:13.503+05:30	\N	call	t	t
\.


--
-- Data for Name: AdminNotifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AdminNotifications" (id, title, message, target, "targetValue", "recipientsCount", status, "scheduledFor", "sentAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admins" (id, username, email, password, "roleId", "isActive", "lastLogin", "createdAt", "updatedAt") FROM stdin;
a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	admin@jaadoe.com	$2b$10$jxUj5wIzyNNcQFl7Fu2MteM8djelj8amyLVs5v9qzqV5UsDjpXxmG	\N	t	2026-01-31 18:00:39.154+05:30	2026-01-31 17:01:48.987+05:30	2026-01-31 18:00:39.155+05:30
a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	admin@jaadoe.com	$2b$10$jxUj5wIzyNNcQFl7Fu2MteM8djelj8amyLVs5v9qzqV5UsDjpXxmG	\N	t	2026-01-31 18:00:39.154+05:30	2026-01-31 17:01:48.987+05:30	2026-01-31 18:00:39.155+05:30
\.


--
-- Data for Name: AppFeedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AppFeedback" (id, "userId", username, text, files, status, "browserInfo", "createdAt", "updatedAt") FROM stdin;
ed495881-be95-4d39-81c5-8979f2a311c6	2	user_test_2	I found a bug in the stories	[]	resolved	{"agent": "TestBot"}	2026-02-04 12:21:34.846+05:30	2026-02-04 12:28:52.539+05:30
a5b920cc-3067-46de-81f4-a6fd0d628160	2	user_test_2	I found a bug in the stories 1770189138897	[]	resolved	{"agent": "TestBot"}	2026-02-04 12:42:19.007+05:30	2026-02-04 12:53:14.204+05:30
1421d8cb-2428-4c33-acc5-dd4d57eb9366	2	user_test_2	I found a bug in the stories	[]	resolved	{"agent": "TestBot"}	2026-02-04 12:41:24.241+05:30	2026-02-04 13:14:19.431+05:30
d77c2375-040d-4ecc-acf6-84708c18bf8d	2	must	SDVSDV	[]	pending	{}	2026-03-02 10:14:30.221+05:30	2026-03-02 10:14:30.221+05:30
787aa76b-2c7f-4d0e-85e9-b9626e4a0399	2	must	acac	[]	pending	{}	2026-03-02 10:18:25.118+05:30	2026-03-02 10:18:25.118+05:30
4b375dea-8338-4558-8b51-ddea106d95e6	19	Akshay	sdvb	[]	pending	{}	2026-03-05 14:55:57.805+05:30	2026-03-05 14:55:57.805+05:30
\.


--
-- Data for Name: AuditLogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AuditLogs" (id, "adminId", "adminUsername", action, "resourceType", "resourceId", details, "ipAddress", "createdAt", "updatedAt") FROM stdin;
eefe1880-9fd6-4fd9-8159-5faeef6c3328	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:03:57.509+05:30	2026-01-31 17:03:57.509+05:30
93d5843c-5bbb-47ce-869a-335c256f0044	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:04:12.475+05:30	2026-01-31 17:04:12.475+05:30
b6fafc32-26de-4723-9fd5-a4594f009bb8	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:52:08.622+05:30	2026-01-31 17:52:08.622+05:30
6ff1e8d6-c087-4d7f-ae7c-135320a207f6	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:52:30.646+05:30	2026-01-31 17:52:30.646+05:30
f93ff943-ea6f-40cc-a752-4f9b999963a8	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:53:58.327+05:30	2026-01-31 17:53:58.327+05:30
5cf7ea7a-c8a8-40b7-979a-c9db8a2d87e4	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 18:00:39.16+05:30	2026-01-31 18:00:39.16+05:30
eefe1880-9fd6-4fd9-8159-5faeef6c3328	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:03:57.509+05:30	2026-01-31 17:03:57.509+05:30
93d5843c-5bbb-47ce-869a-335c256f0044	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:04:12.475+05:30	2026-01-31 17:04:12.475+05:30
b6fafc32-26de-4723-9fd5-a4594f009bb8	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:52:08.622+05:30	2026-01-31 17:52:08.622+05:30
6ff1e8d6-c087-4d7f-ae7c-135320a207f6	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:52:30.646+05:30	2026-01-31 17:52:30.646+05:30
f93ff943-ea6f-40cc-a752-4f9b999963a8	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 17:53:58.327+05:30	2026-01-31 17:53:58.327+05:30
5cf7ea7a-c8a8-40b7-979a-c9db8a2d87e4	a9cb5755-b4af-4486-8c99-c7d72e8d9e07	admin	LOGIN	AUTH	\N	\N	::ffff:127.0.0.1	2026-01-31 18:00:39.16+05:30	2026-01-31 18:00:39.16+05:30
\.


--
-- Data for Name: CommentLikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CommentLikes" (id, "commentId", "userId", "createdAt", "updatedAt") FROM stdin;
24	58	2	2026-02-27 12:39:01.336+05:30	2026-02-27 12:39:01.336+05:30
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comments" (id, "postId", "userId", username, text, "createdAt", "likesCount", status, "reportedCount", "updatedAt", parent_id, type, media_url, target_type) FROM stdin;
58	2092	2	must	wow	2026-02-27 11:30:49.38+05:30	1	pending	0	2026-02-27 12:39:01.34+05:30	\N	text	\N	post
59	2084	19	Akshay	ow	2026-03-06 12:24:33.221+05:30	0	pending	0	2026-03-06 12:24:33.221+05:30	\N	text	\N	post
\.


--
-- Data for Name: ContactMatches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContactMatches" (id, "userId", "matchedUserId", source, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Conversations" (id, user1_id, user2_id, last_message_id, last_message_content, last_message_sender_id, "lastMessageAt", "riskScore", "riskLevel", "flaggedAt", status, "aiFlags", user1_muted, user2_muted, "createdAt", "updatedAt") FROM stdin;
4	51	7	\N	📷 Image	51	2026-02-06 18:57:05.996+05:30	0	\N	\N	cleared	[]	f	f	2026-01-29 13:51:03.917+05:30	2026-02-06 18:57:05.996+05:30
8	20	1	\N	Verify your account here: http://insta-verify-login.com/auth	20	2026-02-04 13:52:50.665+05:30	45	medium	2026-02-04 13:52:50.665+05:30	flagged	["Suspicious Link", "Scam"]	f	f	2026-02-04 13:52:50.665+05:30	2026-02-04 13:52:50.665+05:30
30	51	142	\N	hii mustafa	51	2026-02-17 17:58:20.068+05:30	0	\N	\N	cleared	[]	f	f	2026-02-17 17:58:20.061+05:30	2026-02-17 17:58:20.068+05:30
17	74	74	\N	Hello message	74	2026-02-11 10:30:39.77+05:30	0	\N	\N	cleared	[]	f	f	2026-02-11 10:30:39.745+05:30	2026-02-11 10:30:39.771+05:30
18	76	76	\N	Hello message	76	2026-02-11 10:32:59.948+05:30	0	\N	\N	cleared	[]	f	f	2026-02-11 10:32:59.936+05:30	2026-02-11 10:32:59.948+05:30
19	75	76	\N	Hello message	75	2026-02-11 16:49:02.011+05:30	0	\N	\N	cleared	[]	f	f	2026-02-11 16:49:01.92+05:30	2026-02-11 16:49:02.012+05:30
20	86	62	\N	Check out this post: http://192.168.1.15:5175/post	86	2026-02-13 12:52:44.624+05:30	0	\N	\N	cleared	[]	f	f	2026-02-13 12:52:44.605+05:30	2026-02-13 12:52:44.625+05:30
22	51	55	\N	🙂	55	2026-02-18 12:03:49.71+05:30	0	\N	\N	cleared	[]	f	f	2026-02-14 18:23:05.294+05:30	2026-02-18 12:03:49.71+05:30
29	51	112	\N	hi	51	2026-02-18 13:29:55.088+05:30	0	\N	\N	cleared	[]	f	f	2026-02-17 16:59:50.376+05:30	2026-02-18 13:29:55.088+05:30
31	112	112	\N	Audit Test	112	2026-02-19 13:27:40.928+05:30	0	\N	\N	cleared	[]	f	f	2026-02-19 13:27:40.906+05:30	2026-02-19 13:27:40.929+05:30
26	51	105	\N	hii akbar	105	2026-02-21 12:01:08.928+05:30	0	\N	\N	cleared	[]	f	f	2026-02-16 16:59:20.793+05:30	2026-02-21 12:01:08.928+05:30
6	55	52	\N	🎬 Shared a reel	55	2026-02-15 11:52:08.68+05:30	0	\N	\N	cleared	[]	f	f	2026-02-02 17:22:57.43+05:30	2026-02-15 11:52:08.68+05:30
23	55	323	\N	🎬 Shared a reel	55	2026-02-15 11:52:49.894+05:30	0	\N	\N	cleared	[]	f	f	2026-02-15 11:52:49.884+05:30	2026-02-15 11:52:49.894+05:30
15	72	62	\N	Check out this post: http://192.168.1.15:5175/post	72	2026-02-06 13:07:05.779+05:30	0	\N	\N	cleared	[]	f	f	2026-02-06 13:07:05.772+05:30	2026-02-06 13:07:05.779+05:30
27	51	89	\N	🎬 Shared a reel	51	2026-02-16 17:33:02.141+05:30	0	\N	\N	cleared	[]	f	f	2026-02-16 17:33:02.138+05:30	2026-02-16 17:33:02.141+05:30
25	51	104	\N	🎬 Shared a reel	51	2026-02-16 18:39:00.061+05:30	0	\N	\N	cleared	[]	f	f	2026-02-16 16:47:24.571+05:30	2026-02-16 18:39:00.062+05:30
7	7	20	\N	I will find where you live and make you regret this.	7	2026-02-04 13:52:50.637+05:30	85	high	2026-02-04 13:52:50.636+05:30	cleared	["Harassment", "Physical Threat"]	f	f	2026-02-04 13:52:50.64+05:30	2026-02-17 12:08:38.769+05:30
36	2	7	\N	hi	2	2026-03-02 11:23:00.531+05:30	0	\N	\N	cleared	[]	f	f	2026-02-27 15:39:08.25+05:30	2026-03-02 11:23:00.532+05:30
39	2	8	\N	[STORY_REACTION] ❤️	2	2026-03-02 11:35:16.681+05:30	0	\N	\N	cleared	[]	f	f	2026-03-02 11:14:49.653+05:30	2026-03-02 11:35:16.681+05:30
40	18	2110	\N	hi	18	2026-03-05 14:36:06.248+05:30	0	\N	\N	cleared	[]	f	f	2026-03-05 14:36:06.239+05:30	2026-03-05 14:36:06.249+05:30
41	2	19	\N	https://jaadoe.app/post/2083	2	2026-03-05 14:56:52.845+05:30	0	\N	\N	cleared	[]	f	f	2026-03-05 14:56:52.84+05:30	2026-03-05 14:56:52.845+05:30
33	2	3	\N	📹 Video call	3	2026-03-07 10:37:24.465+05:30	0	\N	\N	cleared	[]	f	f	2026-02-26 14:44:28.425+05:30	2026-03-07 10:37:24.465+05:30
38	2	5	\N	hii	5	2026-03-07 12:24:04.693+05:30	0	\N	\N	cleared	[]	f	f	2026-02-28 11:50:36.619+05:30	2026-03-07 12:24:04.694+05:30
\.


--
-- Data for Name: Feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Feedbacks" (id, "articleId", "isHelpful", comment, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: FollowRequests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FollowRequests" (id, "requesterId", "targetUserId", status, "createdAt", "updatedAt") FROM stdin;
58ba90f6-8f18-4c7a-8246-b5c9879e5fda	19	2	PENDING	2026-03-05 15:26:47.131+05:30	2026-03-05 15:26:47.131+05:30
\.


--
-- Data for Name: Interests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Interests" (id, name, category, icon, "createdAt", "updatedAt") FROM stdin;
1	Fashion	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
2	Travel	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
3	Fitness	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
4	Music	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
5	Food	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
6	Art	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
7	Gaming	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
8	Technology	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
9	Photography	\N	\N	2026-03-04 12:15:55.621+05:30	2026-03-04 12:15:55.621+05:30
\.


--
-- Data for Name: Likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Likes" (id, "userId", "postId", "createdAt", "updatedAt") FROM stdin;
72	2	2084	2026-02-26 11:16:29.047+05:30	2026-02-26 11:16:29.047+05:30
73	2	2080	2026-02-26 14:58:06.539+05:30	2026-02-26 14:58:06.539+05:30
74	3	2109	2026-02-27 09:09:32.369+05:30	2026-02-27 09:09:32.369+05:30
75	3	2108	2026-02-27 09:09:34.847+05:30	2026-02-27 09:09:34.847+05:30
80	2	2092	2026-02-27 12:41:30.04+05:30	2026-02-27 12:41:30.04+05:30
81	10	2092	2026-03-02 14:44:55.7+05:30	2026-03-02 14:44:55.7+05:30
82	2	2109	2026-03-05 10:23:14.436+05:30	2026-03-05 10:23:14.436+05:30
\.


--
-- Data for Name: Media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Media" (id, filename, "originalName", url, "r2Key", "cdnUrl", "tempKey", "thumbnailUrl", type, "mimeType", size, width, height, duration, "uploadStatus", "processingError", "createdAt", "updatedAt") FROM stdin;
75455e6b-2def-46a8-9d9d-041a46251b0e	1772082904087-159841012_opt.webp	134105993569015843.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	Jaadoe/posts/images/1772082904087-159841012_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	Jaadoe/temp/1772082904087-159841012.jpeg	\N	image	image/webp	171262	1080	608	\N	completed	\N	2026-02-26 10:45:04.1+05:30	2026-02-26 10:45:05.316+05:30
5bab6789-9466-4574-b14a-6fca4c898afc	1772083086068-504330130_opt.mp4	6873503-uhd_2160_3840_25fps.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772083086068-504330130_opt.mp4	Jaadoe/posts/videos/1772083086068-504330130_opt.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772083086068-504330130_opt.mp4	Jaadoe/temp/1772083086068-504330130.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772083086068-504330130_thumb.jpg	video	video/mp4	3410422	1080	1920	18.32	completed	\N	2026-02-26 10:48:13.125+05:30	2026-02-26 10:48:20.958+05:30
9e3aa1d2-9f65-434a-b30c-3332564a3c58	1772083129771-421848745_opt.mp4	7515919-hd_1080_1920_30fps.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772083129771-421848745_opt.mp4	Jaadoe/posts/videos/1772083129771-421848745_opt.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772083129771-421848745_opt.mp4	Jaadoe/temp/1772083129771-421848745.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772083129771-421848745_thumb.jpg	video	video/mp4	3834500	1080	1920	15.967	completed	\N	2026-02-26 10:48:51.774+05:30	2026-02-26 10:48:57.474+05:30
6a1d526b-e7db-43e2-89d4-c2a147a6ec18	1772083151740-81295609_opt.webp	dummy 1.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772083151740-81295609_opt.webp	Jaadoe/posts/images/1772083151740-81295609_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083151740-81295609_opt.webp	Jaadoe/temp/1772083151740-81295609.jpeg	\N	image	image/webp	156632	1080	608	\N	completed	\N	2026-02-26 10:49:11.747+05:30	2026-02-26 10:49:12.783+05:30
55d03a91-c07e-4c4b-a587-865d786abc51	1772083302950-93476225_opt.webp	pexels-a2pro-3422964.jpg	/api/v1/media/files/Jaadoe/posts/images/1772083302950-93476225_opt.webp	Jaadoe/posts/images/1772083302950-93476225_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083302950-93476225_opt.webp	Jaadoe/temp/1772083302950-93476225.jpg	\N	image	image/webp	25412	1080	608	\N	completed	\N	2026-02-26 10:51:43.017+05:30	2026-02-26 10:51:44.003+05:30
bc1a32d2-e0c3-42f1-8a6e-1f9748165788	1772083311074-485773742_opt.webp	pexels-a2pro-3422964.jpg	/api/v1/media/files/Jaadoe/posts/images/1772083311074-485773742_opt.webp	Jaadoe/posts/images/1772083311074-485773742_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083311074-485773742_opt.webp	Jaadoe/temp/1772083311074-485773742.jpg	\N	image	image/webp	25412	1080	608	\N	completed	\N	2026-02-26 10:51:51.529+05:30	2026-02-26 10:51:52.44+05:30
94dda4e4-a9a7-4bcd-a40f-7cf43ad437f4	1772083331536-854157292_opt.webp	pexels-egorghetto-13369577.jpg	/api/v1/media/files/Jaadoe/posts/images/1772083331536-854157292_opt.webp	Jaadoe/posts/images/1772083331536-854157292_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083331536-854157292_opt.webp	Jaadoe/temp/1772083331536-854157292.jpg	\N	image	image/webp	306618	1080	1620	\N	completed	\N	2026-02-26 10:52:14.743+05:30	2026-02-26 10:52:15.813+05:30
496fd4f9-a1cd-4e84-9ab7-cd56606da003	1772083690063-543250713_opt.webp	134121887783155554.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772083690063-543250713_opt.webp	Jaadoe/posts/images/1772083690063-543250713_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083690063-543250713_opt.webp	Jaadoe/temp/1772083690063-543250713.jpeg	\N	image	image/webp	79690	1080	608	\N	completed	\N	2026-02-26 10:58:10.073+05:30	2026-02-26 10:58:10.75+05:30
ff51b085-fb08-4138-b14d-6bbb3555408b	1772083716675-838098669_opt.webp	image 1.avif	/api/v1/media/files/Jaadoe/posts/images/1772083716675-838098669_opt.webp	Jaadoe/posts/images/1772083716675-838098669_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083716675-838098669_opt.webp	Jaadoe/temp/1772083716675-838098669.avif	\N	image	image/webp	31922	500	709	\N	completed	\N	2026-02-26 10:58:36.676+05:30	2026-02-26 10:58:37.272+05:30
272c68e8-0095-4eb5-98c0-241c0be97fb9	1772083857891-839185541_opt.webp	134105993569015843.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772083857891-839185541_opt.webp	Jaadoe/posts/images/1772083857891-839185541_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083857891-839185541_opt.webp	Jaadoe/temp/1772083857891-839185541.jpeg	\N	image	image/webp	171262	1080	608	\N	completed	\N	2026-02-26 11:00:57.898+05:30	2026-02-26 11:00:58.801+05:30
79135dff-77d2-4800-acf5-5aeb89debcbe	1772083881063-328282515_opt.webp	134114172277661611.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772083881063-328282515_opt.webp	Jaadoe/posts/images/1772083881063-328282515_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083881063-328282515_opt.webp	Jaadoe/temp/1772083881063-328282515.jpeg	\N	image	image/webp	103450	1080	608	\N	completed	\N	2026-02-26 11:01:21.086+05:30	2026-02-26 11:01:21.765+05:30
35ea7fb3-95a4-4f90-9bd7-24703b3992b3	1772083903715-137274937_opt.webp	image 2.jpg	/api/v1/media/files/Jaadoe/posts/images/1772083903715-137274937_opt.webp	Jaadoe/posts/images/1772083903715-137274937_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083903715-137274937_opt.webp	Jaadoe/temp/1772083903715-137274937.jpg	\N	image	image/webp	11264	176	166	\N	completed	\N	2026-02-26 11:01:43.716+05:30	2026-02-26 11:01:44.506+05:30
dfec490e-3b83-4bf2-9279-a0a88b0f10d4	1772083946261-787236779_opt.mp4	ForBiggerFun.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772083946261-787236779_opt.mp4	Jaadoe/posts/videos/1772083946261-787236779_opt.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772083946261-787236779_opt.mp4	Jaadoe/temp/1772083946261-787236779.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772083946261-787236779_thumb.jpg	video	video/mp4	9699124	1080	608	60.071	completed	\N	2026-02-26 11:02:26.331+05:30	2026-02-26 11:02:33.433+05:30
f33ddaa7-7a91-4280-bbd3-40bc99cbfa0d	1772083980441-787963645_opt.webp	134121887783155554.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772083980441-787963645_opt.webp	Jaadoe/posts/images/1772083980441-787963645_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772083980441-787963645_opt.webp	Jaadoe/temp/1772083980441-787963645.jpeg	\N	image	image/webp	79690	1080	608	\N	completed	\N	2026-02-26 11:03:00.449+05:30	2026-02-26 11:03:01.224+05:30
8e8b55c4-99c9-4ceb-a295-450b2bddaccb	1772084001350-613838150_opt.webp	134105993569015843.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084001350-613838150_opt.webp	Jaadoe/posts/images/1772084001350-613838150_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084001350-613838150_opt.webp	Jaadoe/temp/1772084001350-613838150.jpeg	\N	image	image/webp	171262	1080	608	\N	completed	\N	2026-02-26 11:03:21.375+05:30	2026-02-26 11:03:22.091+05:30
54a3cdd3-93a2-469b-8389-0ea22b05c2f9	1772084049865-897626602_opt.webp	134114172277661611.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084049865-897626602_opt.webp	Jaadoe/posts/images/1772084049865-897626602_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084049865-897626602_opt.webp	Jaadoe/temp/1772084049865-897626602.jpeg	\N	image	image/webp	103450	1080	608	\N	completed	\N	2026-02-26 11:04:09.874+05:30	2026-02-26 11:04:10.464+05:30
977fbf99-0692-4c51-aeae-b4897e7c826f	1772084140775-236506375_opt.webp	134121887794881203.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084140775-236506375_opt.webp	Jaadoe/posts/images/1772084140775-236506375_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084140775-236506375_opt.webp	Jaadoe/temp/1772084140775-236506375.jpeg	\N	image	image/webp	89876	1080	608	\N	completed	\N	2026-02-26 11:05:40.793+05:30	2026-02-26 11:05:41.479+05:30
b2a5bc03-32f1-48c0-a56e-f09015ac3b7a	1772084224261-370391432_opt.webp	dummy 1.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084224261-370391432_opt.webp	Jaadoe/posts/images/1772084224261-370391432_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084224261-370391432_opt.webp	Jaadoe/temp/1772084224261-370391432.jpeg	\N	image	image/webp	156632	1080	608	\N	completed	\N	2026-02-26 11:07:04.269+05:30	2026-02-26 11:07:04.787+05:30
bd2a742b-da2b-479d-b394-acadb70d0c03	1772084309680-421094899_opt.webp	134121887783155554.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084309680-421094899_opt.webp	Jaadoe/posts/images/1772084309680-421094899_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084309680-421094899_opt.webp	Jaadoe/temp/1772084309680-421094899.jpeg	\N	image	image/webp	79690	1080	608	\N	completed	\N	2026-02-26 11:08:29.696+05:30	2026-02-26 11:08:30.209+05:30
44221c4c-7ca0-4458-9181-1ee83c322e71	1772084677786-552942004_opt.webp	134114172277661611.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084677786-552942004_opt.webp	Jaadoe/posts/images/1772084677786-552942004_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084677786-552942004_opt.webp	Jaadoe/temp/1772084677786-552942004.jpeg	\N	image	image/webp	103450	1080	608	\N	completed	\N	2026-02-26 11:14:37.793+05:30	2026-02-26 11:14:38.373+05:30
7dfb3fad-c275-42ba-a587-91d1916de0eb	1772084711014-465892621_opt.mp4	ForBiggerFun.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772084711014-465892621_opt.mp4	Jaadoe/posts/videos/1772084711014-465892621_opt.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772084711014-465892621_opt.mp4	Jaadoe/temp/1772084711014-465892621.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772084711014-465892621_thumb.jpg	video	video/mp4	9699124	1080	608	60.071	completed	\N	2026-02-26 11:15:11.067+05:30	2026-02-26 11:15:18.808+05:30
5726363b-83a7-4f2b-9026-08c76a975a7d	1772084737294-165056922_opt.webp	134105993569015843.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084737294-165056922_opt.webp	Jaadoe/posts/images/1772084737294-165056922_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084737294-165056922_opt.webp	Jaadoe/temp/1772084737294-165056922.jpeg	\N	image	image/webp	171262	1080	608	\N	completed	\N	2026-02-26 11:15:37.299+05:30	2026-02-26 11:15:37.791+05:30
2b7db0e8-08ed-4d2b-a70c-96d4c73098a5	1772084739796-422193192_opt.webp	edited_1772084739071.png	/api/v1/media/files/Jaadoe/posts/images/1772084739796-422193192_opt.webp	Jaadoe/posts/images/1772084739796-422193192_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084739796-422193192_opt.webp	Jaadoe/temp/1772084739796-422193192.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:15:40.244+05:30	2026-02-26 11:15:40.966+05:30
160ad088-0b3d-415a-b3b2-e062e5724528	1772084806946-33478956_opt.webp	image 2.avif	/api/v1/media/files/Jaadoe/posts/images/1772084806946-33478956_opt.webp	Jaadoe/posts/images/1772084806946-33478956_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084806946-33478956_opt.webp	Jaadoe/temp/1772084806946-33478956.avif	\N	image	image/webp	32484	500	750	\N	completed	\N	2026-02-26 11:16:46.948+05:30	2026-02-26 11:16:47.493+05:30
a62aed47-259e-485d-9c48-9c3e65fccc2a	1772084840519-110697109_opt.webp	edited_1772084836774.png	/api/v1/media/files/Jaadoe/posts/images/1772084840519-110697109_opt.webp	Jaadoe/posts/images/1772084840519-110697109_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084840519-110697109_opt.webp	Jaadoe/temp/1772084840519-110697109.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:17:21.043+05:30	2026-02-26 11:17:21.764+05:30
c01eef80-e337-4fae-8ddc-12d8926d5499	1772084842460-108894594_opt.webp	edited_1772084836774.png	/api/v1/media/files/Jaadoe/posts/images/1772084842460-108894594_opt.webp	Jaadoe/posts/images/1772084842460-108894594_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084842460-108894594_opt.webp	Jaadoe/temp/1772084842460-108894594.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:17:23.265+05:30	2026-02-26 11:17:24.185+05:30
a02941e8-7a29-4ddb-889a-4da8d789e632	1772084844423-656420074_opt.webp	image 4.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084844423-656420074_opt.webp	Jaadoe/posts/images/1772084844423-656420074_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084844423-656420074_opt.webp	Jaadoe/temp/1772084844423-656420074.jpeg	\N	image	image/webp	138388	1080	900	\N	completed	\N	2026-02-26 11:17:24.433+05:30	2026-02-26 11:17:25.098+05:30
499e758f-2688-4ba7-8ad9-47f095c8ed3a	1772084854495-829159070_opt.webp	edited_1772084836774.png	/api/v1/media/files/Jaadoe/posts/images/1772084854495-829159070_opt.webp	Jaadoe/posts/images/1772084854495-829159070_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084854495-829159070_opt.webp	Jaadoe/temp/1772084854495-829159070.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:17:35.051+05:30	2026-02-26 11:17:35.769+05:30
507dc5d4-4422-43d9-b249-fb5fdb138e26	1772084868584-105785180_opt.webp	dummy 1.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084868584-105785180_opt.webp	Jaadoe/posts/images/1772084868584-105785180_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084868584-105785180_opt.webp	Jaadoe/temp/1772084868584-105785180.jpeg	\N	image	image/webp	156632	1080	608	\N	completed	\N	2026-02-26 11:17:48.59+05:30	2026-02-26 11:17:49.198+05:30
af61b773-a24f-4da9-818f-73d1a1e43a65	1772084888572-807098151_opt.webp	134121887783155554.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772084888572-807098151_opt.webp	Jaadoe/posts/images/1772084888572-807098151_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084888572-807098151_opt.webp	Jaadoe/temp/1772084888572-807098151.jpeg	\N	image	image/webp	79690	1080	608	\N	completed	\N	2026-02-26 11:18:08.578+05:30	2026-02-26 11:18:09.358+05:30
6b44b2ca-c8ed-4a41-af46-49afc019fe17	1772084908242-231424085_opt.mp4	2414068_Bible_Religion_3840x2160.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772084908242-231424085_opt.mp4	Jaadoe/posts/videos/1772084908242-231424085_opt.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772084908242-231424085_opt.mp4	Jaadoe/temp/1772084908242-231424085.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772084908242-231424085_thumb.jpg	video	video/mp4	1475705	1080	608	15	completed	\N	2026-02-26 11:18:28.418+05:30	2026-02-26 11:18:32.663+05:30
c5f7b654-0f2c-4d7e-a5ca-450bd47b2362	1772084935442-859308026_opt.webp	image 2.avif	/api/v1/media/files/Jaadoe/posts/images/1772084935442-859308026_opt.webp	Jaadoe/posts/images/1772084935442-859308026_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772084935442-859308026_opt.webp	Jaadoe/temp/1772084935442-859308026.avif	\N	image	image/webp	32484	500	750	\N	completed	\N	2026-02-26 11:18:55.444+05:30	2026-02-26 11:18:55.936+05:30
606332f4-8865-465a-aae0-07dbcf763bf6	1772085006147-341610870_opt.webp	edited_1772085003394.png	/api/v1/media/files/Jaadoe/posts/images/1772085006147-341610870_opt.webp	Jaadoe/posts/images/1772085006147-341610870_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085006147-341610870_opt.webp	Jaadoe/temp/1772085006147-341610870.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:20:06.678+05:30	2026-02-26 11:20:07.454+05:30
08f7c7d1-330f-4ac3-8480-aa7e024d053d	1772085050435-53870855_opt.webp	134121887783155554.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772085050435-53870855_opt.webp	Jaadoe/posts/images/1772085050435-53870855_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085050435-53870855_opt.webp	Jaadoe/temp/1772085050435-53870855.jpeg	\N	image	image/webp	79690	1080	608	\N	completed	\N	2026-02-26 11:20:50.441+05:30	2026-02-26 11:20:51.181+05:30
8fce1600-03af-4362-a3de-db663d76b1d2	1772085094171-555382470_opt.webp	image 3.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772085094171-555382470_opt.webp	Jaadoe/posts/images/1772085094171-555382470_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085094171-555382470_opt.webp	Jaadoe/temp/1772085094171-555382470.jpeg	\N	image	image/webp	158390	1080	720	\N	completed	\N	2026-02-26 11:21:34.234+05:30	2026-02-26 11:21:34.973+05:30
3e61a3b8-dad0-41f7-8c16-1874ffbd9b8d	1772085108823-577876933_opt.webp	image 2.avif	/api/v1/media/files/Jaadoe/posts/images/1772085108823-577876933_opt.webp	Jaadoe/posts/images/1772085108823-577876933_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085108823-577876933_opt.webp	Jaadoe/temp/1772085108823-577876933.avif	\N	image	image/webp	32484	500	750	\N	completed	\N	2026-02-26 11:21:48.826+05:30	2026-02-26 11:21:49.394+05:30
d7300a9b-9b20-41cf-8178-90f75965b3c0	1772085132202-220817702_opt.webp	134105993569015843.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772085132202-220817702_opt.webp	Jaadoe/posts/images/1772085132202-220817702_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085132202-220817702_opt.webp	Jaadoe/temp/1772085132202-220817702.jpeg	\N	image	image/webp	171262	1080	608	\N	completed	\N	2026-02-26 11:22:12.207+05:30	2026-02-26 11:22:12.753+05:30
9e53a3cb-862c-444c-9429-8ad2710aaf17	1772085153529-636697416_opt.webp	image 1.avif	/api/v1/media/files/Jaadoe/posts/images/1772085153529-636697416_opt.webp	Jaadoe/posts/images/1772085153529-636697416_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085153529-636697416_opt.webp	Jaadoe/temp/1772085153529-636697416.avif	\N	image	image/webp	31922	500	709	\N	completed	\N	2026-02-26 11:22:33.536+05:30	2026-02-26 11:22:34.002+05:30
cfd276a5-e1d8-44a8-b370-84331e46b570	1772085179389-285577753_opt.mp4	2414068_Bible_Religion_3840x2160.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772085179389-285577753_opt.mp4	Jaadoe/posts/videos/1772085179389-285577753_opt.mp4	/api/v1/media/files/Jaadoe/posts/videos/1772085179389-285577753_opt.mp4	Jaadoe/temp/1772085179389-285577753.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772085179389-285577753_thumb.jpg	video	video/mp4	1475705	1080	608	15	completed	\N	2026-02-26 11:22:59.552+05:30	2026-02-26 11:23:03.83+05:30
deb55633-06ea-4237-a3e0-dddd74ffef88	1772085203876-53702342_opt.webp	134121887783155554.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772085203876-53702342_opt.webp	Jaadoe/posts/images/1772085203876-53702342_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085203876-53702342_opt.webp	Jaadoe/temp/1772085203876-53702342.jpeg	\N	image	image/webp	79690	1080	608	\N	completed	\N	2026-02-26 11:23:23.882+05:30	2026-02-26 11:23:24.55+05:30
51ce85dc-479d-4351-8fba-1574407b6328	1772085625148-538882489_opt.webp	edited_1772085621522.png	/api/v1/media/files/Jaadoe/posts/images/1772085625148-538882489_opt.webp	Jaadoe/posts/images/1772085625148-538882489_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085625148-538882489_opt.webp	Jaadoe/temp/1772085625148-538882489.png	\N	image	image/webp	124952	1080	2391	\N	completed	\N	2026-02-26 11:30:25.633+05:30	2026-02-26 11:30:26.552+05:30
c9266c09-dec7-4fd0-93d4-2585ed9c81b6	1772085682431-43632619_opt.webp	edited_1772085680589.png	/api/v1/media/files/Jaadoe/posts/images/1772085682431-43632619_opt.webp	Jaadoe/posts/images/1772085682431-43632619_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085682431-43632619_opt.webp	Jaadoe/temp/1772085682431-43632619.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:31:22.834+05:30	2026-02-26 11:31:23.581+05:30
b71fcac1-2e38-41b8-ae67-0d2ca4389d9a	1772085827771-206653084_opt.webp	edited_1772085823574.png	/api/v1/media/files/Jaadoe/posts/images/1772085827771-206653084_opt.webp	Jaadoe/posts/images/1772085827771-206653084_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772085827771-206653084_opt.webp	Jaadoe/temp/1772085827771-206653084.png	\N	image	image/webp	125374	1080	2391	\N	completed	\N	2026-02-26 11:33:48.252+05:30	2026-02-26 11:33:48.919+05:30
49ea2416-f2da-47b0-811a-ea007e595167	1772086001855-953609085_opt.webp	edited_1772085998622.png	/api/v1/media/files/Jaadoe/posts/images/1772086001855-953609085_opt.webp	Jaadoe/posts/images/1772086001855-953609085_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772086001855-953609085_opt.webp	Jaadoe/temp/1772086001855-953609085.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:36:42.658+05:30	2026-02-26 11:36:43.326+05:30
d2bb9f35-ecab-4282-80d5-6e49ee182e9a	1772087028757-489727195_opt.webp	edited_1772087023472.png	/api/v1/media/files/Jaadoe/posts/images/1772087028757-489727195_opt.webp	Jaadoe/posts/images/1772087028757-489727195_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772087028757-489727195_opt.webp	Jaadoe/temp/1772087028757-489727195.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 11:53:49.261+05:30	2026-02-26 11:53:49.964+05:30
54ad7f7f-990c-4929-ab35-3864bd163de9	1772087211811-795436570.mp4	processed_1772087201804.mp4	/api/v1/media/files/Jaadoe/temp/1772087211811-795436570.mp4	\N	\N	Jaadoe/temp/1772087211811-795436570.mp4	\N	image	application/octet-stream	3030854	\N	\N	\N	failed	Input file contains unsupported image format	2026-02-26 11:56:52.356+05:30	2026-02-26 11:56:52.383+05:30
f929ac64-6592-41f7-b5c9-5f1531bb6ff8	1772087752153-125522922_opt.webp	edited_1772087749256.png	/api/v1/media/files/Jaadoe/posts/images/1772087752153-125522922_opt.webp	Jaadoe/posts/images/1772087752153-125522922_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772087752153-125522922_opt.webp	Jaadoe/temp/1772087752153-125522922.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 12:05:52.741+05:30	2026-02-26 12:05:53.815+05:30
db05d39c-6ab8-4f6c-bcb0-c5bfc3b7b9e9	1772087769910-992290388_opt.webp	edited_1772087749256.png	/api/v1/media/files/Jaadoe/posts/images/1772087769910-992290388_opt.webp	Jaadoe/posts/images/1772087769910-992290388_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772087769910-992290388_opt.webp	Jaadoe/temp/1772087769910-992290388.png	\N	image	image/webp	124462	1080	2391	\N	completed	\N	2026-02-26 12:06:10.627+05:30	2026-02-26 12:06:11.2+05:30
bd4c8a80-d525-4eeb-8410-9b0c03b4192f	bd4c8a80-d525-4eeb-8410-9b0c03b4192f.png	edited_1772092489981.png	/api/v1/media/files/Jaadoe/posts/images/temp_bd4c8a80-d525-4eeb-8410-9b0c03b4192f_opt.webp	Jaadoe/posts/images/temp_bd4c8a80-d525-4eeb-8410-9b0c03b4192f_opt.webp	/api/v1/media/files/Jaadoe/posts/images/temp_bd4c8a80-d525-4eeb-8410-9b0c03b4192f_opt.webp	Jaadoe/temp/bd4c8a80-d525-4eeb-8410-9b0c03b4192f.png	\N	image	image/png	\N	\N	\N	\N	completed	\N	2026-02-26 13:24:51.84+05:30	2026-02-26 13:24:54.705+05:30
03b1be1b-15fe-43a3-93dc-b4dbec235d49	03b1be1b-15fe-43a3-93dc-b4dbec235d49.png	edited_1772092926807.png	/api/v1/media/files/Jaadoe/temp/03b1be1b-15fe-43a3-93dc-b4dbec235d49.png	Jaadoe/temp/03b1be1b-15fe-43a3-93dc-b4dbec235d49.png	\N	Jaadoe/temp/03b1be1b-15fe-43a3-93dc-b4dbec235d49.png	\N	image	image/png	\N	\N	\N	\N	failed	@smithy/node-http-handler - the request socket did not establish a connection with the server within the configured timeout of 5000 ms.	2026-02-26 13:32:08.472+05:30	2026-02-26 13:32:24.75+05:30
eaec02f1-3e7d-4211-a6ae-9ebf73f2a20a	eaec02f1-3e7d-4211-a6ae-9ebf73f2a20a.png	edited_1772092771895.png	/api/v1/media/files/Jaadoe/temp/eaec02f1-3e7d-4211-a6ae-9ebf73f2a20a.png	Jaadoe/temp/eaec02f1-3e7d-4211-a6ae-9ebf73f2a20a.png	\N	Jaadoe/temp/eaec02f1-3e7d-4211-a6ae-9ebf73f2a20a.png	\N	image	image/png	\N	\N	\N	\N	failed	@smithy/node-http-handler - the request socket did not establish a connection with the server within the configured timeout of 5000 ms.	2026-02-26 13:29:35.34+05:30	2026-02-26 13:29:51.244+05:30
16204d10-8d5f-4956-9c89-1f9e1c7c6fe7	16204d10-8d5f-4956-9c89-1f9e1c7c6fe7.mp4	processed_1772093015143.mp4	/api/v1/media/files/Jaadoe/temp/16204d10-8d5f-4956-9c89-1f9e1c7c6fe7.mp4	Jaadoe/temp/16204d10-8d5f-4956-9c89-1f9e1c7c6fe7.mp4	\N	Jaadoe/temp/16204d10-8d5f-4956-9c89-1f9e1c7c6fe7.mp4	\N	video	video/mp4	\N	\N	\N	\N	failed	@smithy/node-http-handler - the request socket did not establish a connection with the server within the configured timeout of 5000 ms.	2026-02-26 13:33:44.6+05:30	2026-02-26 13:34:02.059+05:30
f9e54e2e-9a76-44ca-964d-72e7e8fde7a3	f9e54e2e-9a76-44ca-964d-72e7e8fde7a3.png	edited_1772093103766.png	/api/v1/media/files/Jaadoe/temp/f9e54e2e-9a76-44ca-964d-72e7e8fde7a3.png	Jaadoe/temp/f9e54e2e-9a76-44ca-964d-72e7e8fde7a3.png	\N	Jaadoe/temp/f9e54e2e-9a76-44ca-964d-72e7e8fde7a3.png	\N	image	image/png	\N	\N	\N	\N	failed	@smithy/node-http-handler - the request socket did not establish a connection with the server within the configured timeout of 5000 ms.	2026-02-26 13:35:05.279+05:30	2026-02-26 13:35:21.456+05:30
6a2ce605-9d20-40ec-830e-abb6702e2744	6a2ce605-9d20-40ec-830e-abb6702e2744.png	edited_1772093364978.png	/api/v1/media/files/Jaadoe/temp/6a2ce605-9d20-40ec-830e-abb6702e2744.png	Jaadoe/temp/6a2ce605-9d20-40ec-830e-abb6702e2744.png	\N	Jaadoe/temp/6a2ce605-9d20-40ec-830e-abb6702e2744.png	\N	image	image/png	\N	\N	\N	\N	failed	@smithy/node-http-handler - the request socket did not establish a connection with the server within the configured timeout of 5000 ms.	2026-02-26 13:39:27.57+05:30	2026-02-26 13:39:48.472+05:30
558f671e-8e24-46bd-964a-d7c6fe9e3eda	1772792177658-213331540_opt.webp	image 1.avif	/api/v1/media/files/Jaadoe/posts/images/1772792177658-213331540_opt.webp	Jaadoe/posts/images/1772792177658-213331540_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772792177658-213331540_opt.webp	Jaadoe/temp/1772792177658-213331540.avif	\N	image	image/webp	31922	500	709	\N	completed	\N	2026-03-06 15:46:17.669+05:30	2026-03-06 15:46:20.362+05:30
e7140b42-31f8-4781-825f-b6cb85844078	1772425504488-766410392_opt.webp	images.jpg	/api/v1/media/files/Jaadoe/posts/images/1772425504488-766410392_opt.webp	Jaadoe/posts/images/1772425504488-766410392_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772425504488-766410392_opt.webp	Jaadoe/temp/1772425504488-766410392.jpg	\N	image	image/webp	6164	201	251	\N	completed	\N	2026-03-02 09:55:04.493+05:30	2026-03-02 09:55:04.931+05:30
1ff45483-6ec0-4417-b01b-e55a1a839327	1772793583206-687353646_opt.webp	134105993569015843.jpg.jpeg	/api/v1/media/files/Jaadoe/posts/images/1772793583206-687353646_opt.webp	Jaadoe/posts/images/1772793583206-687353646_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772793583206-687353646_opt.webp	Jaadoe/temp/1772793583206-687353646.jpeg	\N	image	image/webp	171262	1080	608	\N	completed	\N	2026-03-06 16:09:43.217+05:30	2026-03-06 16:09:54.174+05:30
9487c6fb-74bf-4c25-9849-c8c3844fe7aa	1772434501630-533627449_opt.webp	5825612.jpg	/api/v1/media/files/Jaadoe/posts/images/1772434501630-533627449_opt.webp	Jaadoe/posts/images/1772434501630-533627449_opt.webp	/api/v1/media/files/Jaadoe/posts/images/1772434501630-533627449_opt.webp	Jaadoe/temp/1772434501630-533627449.jpg	\N	image	image/webp	88062	1080	720	\N	completed	\N	2026-03-02 12:25:04.108+05:30	2026-03-02 12:25:05.138+05:30
\.


--
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Messages" (id, conversation_id, sender_id, type, content, media_url, reply_to_story_id, "isSeen", flagged, "createdAt", "updatedAt", call_type) FROM stdin;
146	33	2	text	hu	\N	\N	t	f	2026-02-26 14:44:28.43+05:30	2026-02-26 14:53:54.452+05:30	\N
148	33	2	text	reate stream error: AxiosError: Network Error     at XMLHttpRequest.handleError (axios.js?v=6b176535:1669:19)     at Axios.request (axios.js?v=6b176535:2255:41)     at async createStream (LiveProvider.jsx:29:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) createStream @ LiveProvider.jsx:37 await in createStream handleSubmit @ LiveCreateModal.jsx:36 executeDispatch @ react-dom_client.js?v=6b176535:13622 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 processDispatchQueue @ react-dom_client.js?v=6b176535:13658 (anonymous) @ react-dom_client.js?v=6b176535:14071 batchedUpdates$1 @ react-dom_client.js?v=6b176535:2626 dispatchEventForPluginEventSystem @ react-dom_client.js?v=6b176535:13763 dispatchEvent @ react-dom_client.js?v=6b176535:16784 dispatchDiscreteEvent @ react-dom_client.js?v=6b176535:16765Understand this error LiveCreateModal.jsx:39 Failed to create stream AxiosError: Network Error     at XMLHttpRequest.handleError (axios.js?v=6b176535:1669:19)     at Axios.request (axios.js?v=6b176535:2255:41)     at async createStream (LiveProvider.jsx:29:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) handleSubmit @ LiveCreateModal.jsx:39 await in handleSubmit executeDispatch @ react-dom_client.js?v=6b176535:13622 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 processDispatchQueue @ react-dom_client.js?v=6b176535:13658 (anonymous) @ react-dom_client.js?v=6b176535:14071 batchedUpdates$1 @ react-dom_client.js?v=6b176535:2626 dispatchEventForPluginEventSystem @ react-dom_client.js?v=6b176535:13763 dispatchEvent @ react-dom_client.js?v=6b176535:16784 dispatchDiscreteEvent @ react-dom_client.js?v=6b176535:16765Understand this error LiveProvider.jsx:29  POST http://localhost:5000/api/v1/live/create net::ERR_CONNECTION_REFUSED'	\N	\N	t	f	2026-02-27 11:13:05.62+05:30	2026-02-27 11:13:08.885+05:30	\N
10	7	7	text	You think you can just block me and it is over?	\N	\N	f	f	2026-02-04 13:52:50.657+05:30	2026-02-04 13:52:50.657+05:30	\N
11	7	7	text	I will find where you live and make you regret this.	\N	\N	f	t	2026-02-04 13:52:50.657+05:30	2026-02-04 13:52:50.657+05:30	\N
150	33	2	text	useSocket.js:18 [useSocket] Connected to socket, ID: T6XYq44chMEs0DpVAADD, joining room user:2 LiveProvider.jsx:38 Create stream error: AxiosError: Network Error     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) LiveCreateModal.jsx:39 Failed to create stream AxiosError: Network Error     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) LiveProvider.jsx:30   POST https://192.168.1.100:5000/api/v1/live/create net::ERR_SSL_PROTOCOL_ERROR useMessages.js:58 [useMessages] Fetching messages for 33... useMessages.js:63 [useMessages] Fetched 3 messages for 33 useMessages.js:58 [useMessages] Fetching messages for 33... useMessages.js:63 [useMessages] Fetched 3 messages for 33 useMessages.js:290 [useMessages] Committing temp-1772171407414 to server... Content: LiveProvider.jsx:38 Create stream error: AxiosError: Network Error     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13)  LiveCreateModal.jsx:39 Failed to create stream AxiosError: Network Error     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) LiveProvider.jsx:30   POST https://192.168.1.100:5000/api/v1/live/create net::ERR_SSL_PROTOCOL_ERROR ﻿ Media: undefined useMessages.js:302 [useMessages] temp-1772171407414 committed result:  {flagged: false, id: 149, conversationId: 33, senderId: 2, content: 'LiveProvider.jsx:38 Create stream error: AxiosErro…/api/v1/live/create net::ERR_SSL_PROTOCOL_ERROR ﻿', …} useMessages.js:313 [useMessages] Replacing temp temp-1772171407414 with server msg 149 useMessages.js:313 [useMessages] Replacing temp temp-1772171407414 with server msg 149 ﻿  Press ctrl i to turn on code suggestions. Press ctrl x to disable code suggestions. ctrl i  to turn on code suggestions. Don't show again NEW	\N	\N	t	f	2026-02-27 11:20:19.812+05:30	2026-02-27 11:20:19.826+05:30	\N
152	33	2	text	LiveBroadcastScreen.jsx:40 Mixed Content: The page at 'https://192.168.1.100:5175/feed' was loaded over HTTPS, but attempted to connect to the insecure WebSocket endpoint 'ws://192.168.1.100:5011/socket.io/?streamId=6616e80a-16c6-480d-97c9-ac0b0cb57a75&EIO=4&transport=websocket&sid=ImVnsfroXnx2zis8AADo'. This request has been blocked; this endpoint must be available over WSS.	\N	\N	t	f	2026-02-27 11:30:15.055+05:30	2026-02-27 11:52:41.936+05:30	\N
158	36	2	text	https://jaadoe.app/post/2092	\N	\N	f	f	2026-02-27 15:51:32.965+05:30	2026-02-27 15:51:32.965+05:30	\N
160	36	2	text	https://jaadoe.app/post/2082	\N	\N	f	f	2026-02-28 10:16:34.844+05:30	2026-02-28 10:16:34.844+05:30	\N
186	33	3	text	chomu	\N	\N	t	f	2026-03-05 15:42:05.496+05:30	2026-03-05 15:42:05.522+05:30	\N
170	33	2	text	https://jaadoe.app/reel/62	\N	\N	t	f	2026-02-28 15:39:32.352+05:30	2026-03-02 09:17:30.841+05:30	\N
172	33	3	text	hello\\	\N	\N	t	f	2026-03-02 09:17:34.864+05:30	2026-03-02 09:24:55.074+05:30	\N
175	39	2	text	[STORY_REACTION] ❤️	\N	\N	t	f	2026-03-02 11:22:37.717+05:30	2026-03-02 11:22:37.75+05:30	\N
178	39	2	text	[STORY_REACTION] 😢	\N	\N	t	f	2026-03-02 11:34:59.181+05:30	2026-03-02 11:34:59.2+05:30	\N
180	33	2	text	lol	\N	\N	t	f	2026-03-02 14:07:06.732+05:30	2026-03-04 08:39:48.608+05:30	\N
166	38	2	text	dhnbdz	\N	\N	t	f	2026-02-28 11:51:20.135+05:30	2026-03-04 09:03:08.862+05:30	\N
168	38	2	sticker		https://cdn-icons-png.flaticon.com/512/833/833472.png	\N	t	f	2026-02-28 12:09:16.265+05:30	2026-03-04 09:03:08.862+05:30	\N
181	40	18	text	hi	\N	\N	f	f	2026-03-05 14:36:06.246+05:30	2026-03-05 14:36:06.246+05:30	\N
184	41	2	text	https://jaadoe.app/post/2083	\N	\N	f	f	2026-03-05 14:56:52.844+05:30	2026-03-05 14:56:52.844+05:30	\N
188	33	3	call_history	0:10	\N	\N	f	f	2026-03-07 10:36:56.918+05:30	2026-03-07 10:36:56.918+05:30	audio
190	38	5	text	hii	\N	\N	f	f	2026-03-07 12:24:04.691+05:30	2026-03-07 12:24:04.691+05:30	\N
147	33	2	call_history	0:14	\N	\N	t	f	2026-02-27 10:48:33.202+05:30	2026-02-27 10:49:18.733+05:30	video
149	33	2	text	LiveProvider.jsx:38 Create stream error: AxiosError: Network Error     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13)  LiveCreateModal.jsx:39 Failed to create stream AxiosError: Network Error     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) LiveProvider.jsx:30   POST https://192.168.1.100:5000/api/v1/live/create net::ERR_SSL_PROTOCOL_ERROR ﻿	\N	\N	t	f	2026-02-27 11:20:06.013+05:30	2026-02-27 11:20:06.028+05:30	\N
151	33	2	text	Create stream error: AxiosError: Network Error     at XMLHttpRequest.handleError (axios.js?v=6b176535:1669:19)     at Axios.request (axios.js?v=6b176535:2255:41)     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) createStream @ LiveProvider.jsx:38 await in createStream handleSubmit @ LiveCreateModal.jsx:36 executeDispatch @ react-dom_client.js?v=6b176535:13622 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 processDispatchQueue @ react-dom_client.js?v=6b176535:13658 (anonymous) @ react-dom_client.js?v=6b176535:14071 batchedUpdates$1 @ react-dom_client.js?v=6b176535:2626 dispatchEventForPluginEventSystem @ react-dom_client.js?v=6b176535:13763 dispatchEvent @ react-dom_client.js?v=6b176535:16784 dispatchDiscreteEvent @ react-dom_client.js?v=6b176535:16765 <form> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 LiveCreateModal @ LiveCreateModal.jsx:68 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performSyncWorkOnRoot @ react-dom_client.js?v=6b176535:13517 flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=6b176535:13414 processRootScheduleInMicrotask @ react-dom_client.js?v=6b176535:13437 (anonymous) @ react-dom_client.js?v=6b176535:13531 <LiveCreateModal> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 Sidebar @ Sidebar.jsx:443 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performSyncWorkOnRoot @ react-dom_client.js?v=6b176535:13517 flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=6b176535:13414 processRootScheduleInMicrotask @ react-dom_client.js?v=6b176535:13437 (anonymous) @ react-dom_client.js?v=6b176535:13531 <Sidebar> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 Layout @ Layout.jsx:17 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=6b176535:13505 performWorkUntilDeadline @ react-dom_client.js?v=6b176535:36 <Layout> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 App @ App.jsx:121 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=6b176535:13505 performWorkUntilDeadline @ react-dom_client.js?v=6b176535:36 <App> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 (anonymous) @ main.jsx:18Understand this error LiveCreateModal.jsx:39 Failed to create stream AxiosError: Network Error     at XMLHttpRequest.handleError (axios.js?v=6b176535:1669:19)     at Axios.request (axios.js?v=6b176535:2255:41)     at async createStream (LiveProvider.jsx:30:25)     at async handleSubmit (LiveCreateModal.jsx:36:13) handleSubmit @ LiveCreateModal.jsx:39 await in handleSubmit executeDispatch @ react-dom_client.js?v=6b176535:13622 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 processDispatchQueue @ react-dom_client.js?v=6b176535:13658 (anonymous) @ react-dom_client.js?v=6b176535:14071 batchedUpdates$1 @ react-dom_client.js?v=6b176535:2626 dispatchEventForPluginEventSystem @ react-dom_client.js?v=6b176535:13763 dispatchEvent @ react-dom_client.js?v=6b176535:16784 dispatchDiscreteEvent @ react-dom_client.js?v=6b176535:16765 <form> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 LiveCreateModal @ LiveCreateModal.jsx:68 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performSyncWorkOnRoot @ react-dom_client.js?v=6b176535:13517 flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=6b176535:13414 processRootScheduleInMicrotask @ react-dom_client.js?v=6b176535:13437 (anonymous) @ react-dom_client.js?v=6b176535:13531 <LiveCreateModal> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 Sidebar @ Sidebar.jsx:443 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performSyncWorkOnRoot @ react-dom_client.js?v=6b176535:13517 flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=6b176535:13414 processRootScheduleInMicrotask @ react-dom_client.js?v=6b176535:13437 (anonymous) @ react-dom_client.js?v=6b176535:13531 <Sidebar> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 Layout @ Layout.jsx:17 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=6b176535:13505 performWorkUntilDeadline @ react-dom_client.js?v=6b176535:36 <Layout> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 App @ App.jsx:121 react_stack_bottom_frame @ react-dom_client.js?v=6b176535:18509 renderWithHooksAgain @ react-dom_client.js?v=6b176535:5729 renderWithHooks @ react-dom_client.js?v=6b176535:5665 updateFunctionComponent @ react-dom_client.js?v=6b176535:7475 beginWork @ react-dom_client.js?v=6b176535:8525 runWithFiberInDEV @ react-dom_client.js?v=6b176535:997 performUnitOfWork @ react-dom_client.js?v=6b176535:12561 workLoopSync @ react-dom_client.js?v=6b176535:12424 renderRootSync @ react-dom_client.js?v=6b176535:12408 performWorkOnRoot @ react-dom_client.js?v=6b176535:11766 performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=6b176535:13505 performWorkUntilDeadline @ react-dom_client.js?v=6b176535:36 <App> exports.jsxDEV @ react_jsx-dev-runtime.js?v=6b176535:247 (anonymous) @ main.jsx:18Understand this error LiveProvider.jsx:30  POST https://192.168.1.100:5000/api/v1/live/create net::ERR_SSL_PROTOCOL_ERROR	\N	\N	t	f	2026-02-27 11:20:43.053+05:30	2026-02-27 11:20:43.067+05:30	\N
153	33	2	text	https://192.168.1.100:5175/feed	\N	\N	t	f	2026-02-27 12:47:11.778+05:30	2026-02-27 15:04:06.801+05:30	\N
157	36	2	text	https://jaadoe.app/post/2092	\N	\N	f	f	2026-02-27 15:39:08.254+05:30	2026-02-27 15:39:08.254+05:30	\N
159	33	2	text	https://jaadoe.app/post/2092	\N	\N	t	f	2026-02-27 15:54:11.058+05:30	2026-02-27 16:07:01.109+05:30	\N
187	33	3	text	hii	\N	\N	f	f	2026-03-06 15:48:32.657+05:30	2026-03-06 15:48:32.657+05:30	\N
189	33	3	call_history	0:15	\N	\N	f	f	2026-03-07 10:37:24.463+05:30	2026-03-07 10:37:24.463+05:30	video
174	36	2	text	hi	\N	\N	f	f	2026-03-02 11:17:13.981+05:30	2026-03-02 11:17:13.981+05:30	\N
173	39	2	text	[STORY_REACTION] 🔥	\N	\N	t	f	2026-03-02 11:16:54.297+05:30	2026-03-02 11:17:28.661+05:30	\N
176	36	2	text	hi	\N	\N	f	f	2026-03-02 11:23:00.53+05:30	2026-03-02 11:23:00.53+05:30	\N
179	39	2	text	[STORY_REACTION] ❤️	\N	\N	t	f	2026-03-02 11:35:16.679+05:30	2026-03-02 11:35:16.694+05:30	\N
165	38	2	text	hu	\N	\N	t	f	2026-02-28 11:50:36.62+05:30	2026-03-04 09:03:08.862+05:30	\N
167	38	2	sticker	Sent a sticker	https://cdn-icons-png.flaticon.com/512/2589/2589175.png	\N	t	f	2026-02-28 12:07:35.467+05:30	2026-03-04 09:03:08.862+05:30	\N
169	38	2	text	❤️	\N	\N	t	f	2026-02-28 12:11:26.894+05:30	2026-03-04 09:03:08.862+05:30	\N
171	38	2	text	https://jaadoe.app/reel/61	\N	\N	t	f	2026-02-28 15:40:03.638+05:30	2026-03-04 09:03:08.862+05:30	\N
177	38	2	text	hi	\N	\N	t	f	2026-03-02 11:23:05.93+05:30	2026-03-04 09:03:08.862+05:30	\N
182	33	2	text	[STORY_REACTION] ❤️	\N	\N	t	f	2026-03-05 14:45:02.071+05:30	2026-03-05 15:40:40.259+05:30	\N
183	33	2	text	[STORY_REACTION] ❤️	\N	\N	t	f	2026-03-05 14:45:04.832+05:30	2026-03-05 15:40:40.259+05:30	\N
185	33	3	text	heloo	\N	\N	t	f	2026-03-05 15:40:44.538+05:30	2026-03-05 15:41:14.984+05:30	\N
\.


--
-- Data for Name: NotificationSettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NotificationSettings" (id, "userId", "pauseAllPush", likes, comments, mentions, follows, messages, "storyReplies", "feedbackEmails", "reminderEmails", "productEmails", "newsEmails", "supportEmails", "createdAt", "updatedAt", "likeMilestones") FROM stdin;
bd3d59ab-82b0-4b4d-b586-fd73c3221f8c	3	f	EVERYONE	EVERYONE	EVERYONE	t	t	t	t	t	t	t	t	2026-03-06 10:02:02.904+05:30	2026-03-06 10:02:02.904+05:30	t
c3983802-d628-43e9-b23a-947dfd69fb9f	2	f	EVERYONE	EVERYONE	EVERYONE	t	t	t	t	t	t	t	t	2026-03-06 10:03:00.718+05:30	2026-03-06 10:15:50.625+05:30	t
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notifications" (id, "userId", "fromUserId", "fromUsername", "fromUserAvatar", type, "resourceId", "resourceImage", "isRead", "createdAt", "updatedAt") FROM stdin;
18	2	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	COMMENT	57	https://picsum.photos/seed/57/200/200	f	2026-01-25 08:28:56.23+05:30	2026-01-29 16:30:21.401+05:30
19	2	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	COMMENT	55	https://picsum.photos/seed/55/200/200	f	2026-01-24 05:47:51.801+05:30	2026-01-29 16:30:21.401+05:30
20	2	103	user_test_3	https://ui-avatars.com/api/?name=user_test_3&background=random	MENTION	55	https://picsum.photos/seed/55/200/200	f	2026-01-28 11:31:18.759+05:30	2026-01-29 16:30:21.401+05:30
21	2	103	user_test_3	https://ui-avatars.com/api/?name=user_test_3&background=random	FOLLOW	\N	\N	f	2026-01-24 16:54:26.139+05:30	2026-01-29 16:30:21.401+05:30
22	2	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	COMMENT	43	https://picsum.photos/seed/43/200/200	f	2026-01-26 06:47:40.352+05:30	2026-01-29 16:30:21.401+05:30
23	2	104	user_test_4	https://ui-avatars.com/api/?name=user_test_4&background=random	MENTION	71	https://picsum.photos/seed/71/200/200	f	2026-01-24 09:15:30.874+05:30	2026-01-29 16:30:21.401+05:30
24	2	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	MENTION	89	https://picsum.photos/seed/89/200/200	t	2026-01-28 12:54:37.616+05:30	2026-01-29 16:30:21.401+05:30
25	2	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	FOLLOW	\N	\N	t	2026-01-23 04:35:39.431+05:30	2026-01-29 16:30:21.401+05:30
26	2	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	COMMENT	32	https://picsum.photos/seed/32/200/200	t	2026-01-25 10:32:10.076+05:30	2026-01-29 16:30:21.401+05:30
27	2	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	COMMENT	68	https://picsum.photos/seed/68/200/200	t	2026-01-26 17:59:45.212+05:30	2026-01-29 16:30:21.401+05:30
28	2	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	LIKE	999	https://picsum.photos/seed/999/200/200	f	2026-01-29 16:30:21.401+05:30	2026-01-29 16:30:21.401+05:30
29	3	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	LIKE	23	https://picsum.photos/seed/23/200/200	f	2026-01-25 19:14:41.989+05:30	2026-01-29 16:30:21.401+05:30
30	3	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	REPLY	49	https://picsum.photos/seed/49/200/200	f	2026-01-25 17:23:25.827+05:30	2026-01-29 16:30:21.401+05:30
31	3	104	user_test_4	https://ui-avatars.com/api/?name=user_test_4&background=random	COMMENT	17	https://picsum.photos/seed/17/200/200	f	2026-01-26 14:20:49.995+05:30	2026-01-29 16:30:21.401+05:30
32	3	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	FOLLOW	\N	\N	f	2026-01-24 20:55:27.403+05:30	2026-01-29 16:30:21.401+05:30
33	3	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	FOLLOW	\N	\N	f	2026-01-27 10:13:40.626+05:30	2026-01-29 16:30:21.401+05:30
34	3	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	MENTION	84	https://picsum.photos/seed/84/200/200	f	2026-01-26 23:15:03.659+05:30	2026-01-29 16:30:21.401+05:30
35	3	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	FOLLOW	\N	\N	t	2026-01-24 01:14:00.098+05:30	2026-01-29 16:30:21.401+05:30
36	3	104	user_test_4	https://ui-avatars.com/api/?name=user_test_4&background=random	REPLY	76	https://picsum.photos/seed/76/200/200	t	2026-01-28 18:21:27.858+05:30	2026-01-29 16:30:21.401+05:30
37	3	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	LIKE	76	https://picsum.photos/seed/76/200/200	t	2026-01-24 12:51:53.609+05:30	2026-01-29 16:30:21.401+05:30
38	3	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	REPLY	56	https://picsum.photos/seed/56/200/200	t	2026-01-28 10:13:00.589+05:30	2026-01-29 16:30:21.401+05:30
39	3	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	LIKE	999	https://picsum.photos/seed/999/200/200	f	2026-01-29 16:30:21.401+05:30	2026-01-29 16:30:21.401+05:30
62	5	51	akbar		FOLLOW	0	\N	f	2026-01-30 12:01:12.859+05:30	2026-01-30 12:01:12.861+05:30
107	7	86	mukesh444		FOLLOW	0		f	2026-02-13 12:51:36.664+05:30	2026-02-13 12:51:36.664+05:30
18	2	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	COMMENT	57	https://picsum.photos/seed/57/200/200	f	2026-01-25 08:28:56.23+05:30	2026-01-29 16:30:21.401+05:30
19	2	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	COMMENT	55	https://picsum.photos/seed/55/200/200	f	2026-01-24 05:47:51.801+05:30	2026-01-29 16:30:21.401+05:30
20	2	103	user_test_3	https://ui-avatars.com/api/?name=user_test_3&background=random	MENTION	55	https://picsum.photos/seed/55/200/200	f	2026-01-28 11:31:18.759+05:30	2026-01-29 16:30:21.401+05:30
21	2	103	user_test_3	https://ui-avatars.com/api/?name=user_test_3&background=random	FOLLOW	\N	\N	f	2026-01-24 16:54:26.139+05:30	2026-01-29 16:30:21.401+05:30
22	2	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	COMMENT	43	https://picsum.photos/seed/43/200/200	f	2026-01-26 06:47:40.352+05:30	2026-01-29 16:30:21.401+05:30
23	2	104	user_test_4	https://ui-avatars.com/api/?name=user_test_4&background=random	MENTION	71	https://picsum.photos/seed/71/200/200	f	2026-01-24 09:15:30.874+05:30	2026-01-29 16:30:21.401+05:30
24	2	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	MENTION	89	https://picsum.photos/seed/89/200/200	t	2026-01-28 12:54:37.616+05:30	2026-01-29 16:30:21.401+05:30
25	2	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	FOLLOW	\N	\N	t	2026-01-23 04:35:39.431+05:30	2026-01-29 16:30:21.401+05:30
26	2	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	COMMENT	32	https://picsum.photos/seed/32/200/200	t	2026-01-25 10:32:10.076+05:30	2026-01-29 16:30:21.401+05:30
27	2	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	COMMENT	68	https://picsum.photos/seed/68/200/200	t	2026-01-26 17:59:45.212+05:30	2026-01-29 16:30:21.401+05:30
28	2	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	LIKE	999	https://picsum.photos/seed/999/200/200	f	2026-01-29 16:30:21.401+05:30	2026-01-29 16:30:21.401+05:30
29	3	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	LIKE	23	https://picsum.photos/seed/23/200/200	f	2026-01-25 19:14:41.989+05:30	2026-01-29 16:30:21.401+05:30
30	3	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	REPLY	49	https://picsum.photos/seed/49/200/200	f	2026-01-25 17:23:25.827+05:30	2026-01-29 16:30:21.401+05:30
31	3	104	user_test_4	https://ui-avatars.com/api/?name=user_test_4&background=random	COMMENT	17	https://picsum.photos/seed/17/200/200	f	2026-01-26 14:20:49.995+05:30	2026-01-29 16:30:21.401+05:30
32	3	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	FOLLOW	\N	\N	f	2026-01-24 20:55:27.403+05:30	2026-01-29 16:30:21.401+05:30
33	3	105	user_test_5	https://ui-avatars.com/api/?name=user_test_5&background=random	FOLLOW	\N	\N	f	2026-01-27 10:13:40.626+05:30	2026-01-29 16:30:21.401+05:30
34	3	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	MENTION	84	https://picsum.photos/seed/84/200/200	f	2026-01-26 23:15:03.659+05:30	2026-01-29 16:30:21.401+05:30
35	3	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	FOLLOW	\N	\N	t	2026-01-24 01:14:00.098+05:30	2026-01-29 16:30:21.401+05:30
36	3	104	user_test_4	https://ui-avatars.com/api/?name=user_test_4&background=random	REPLY	76	https://picsum.photos/seed/76/200/200	t	2026-01-28 18:21:27.858+05:30	2026-01-29 16:30:21.401+05:30
37	3	102	user_test_2	https://ui-avatars.com/api/?name=user_test_2&background=random	LIKE	76	https://picsum.photos/seed/76/200/200	t	2026-01-24 12:51:53.609+05:30	2026-01-29 16:30:21.401+05:30
38	3	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	REPLY	56	https://picsum.photos/seed/56/200/200	t	2026-01-28 10:13:00.589+05:30	2026-01-29 16:30:21.401+05:30
39	3	101	user_test_1	https://ui-avatars.com/api/?name=user_test_1&background=random	LIKE	999	https://picsum.photos/seed/999/200/200	f	2026-01-29 16:30:21.401+05:30	2026-01-29 16:30:21.401+05:30
62	5	51	akbar		FOLLOW	0	\N	f	2026-01-30 12:01:12.859+05:30	2026-01-30 12:01:12.861+05:30
107	7	86	mukesh444		FOLLOW	0		f	2026-02-13 12:51:36.664+05:30	2026-02-13 12:51:36.664+05:30
\.


--
-- Data for Name: PostReports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PostReports" (id, "postId", "userId", reason, details, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Posts" (id, "userId", username, caption, "mediaUrl", "thumbnailUrl", "mediaType", "likesCount", "commentsCount", "viewsCount", "hideLikes", "commentsDisabled", "isHidden", "createdAt", "updatedAt") FROM stdin;
2112	3	akbar	akbar post 12 #fashion 	/api/v1/media/files/Jaadoe/posts/images/1772793583206-687353646_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-03-06 16:09:43.253+05:30	2026-03-06 16:09:54.219+05:30
2080	2	must	Car\n#car	/api/v1/media/files/Jaadoe/temp/1772083086068-504330130.mp4	\N	VIDEO	1	0	0	f	f	f	2026-02-26 10:48:13.276+05:30	2026-02-26 14:58:06.545+05:30
2108	7	sarfarz	sarfaraz video post 1 #fashion 	/api/v1/media/files/Jaadoe/posts/videos/1772085179389-285577753_opt.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772085179389-285577753_thumb.jpg	VIDEO	1	0	0	f	f	f	2026-02-26 11:22:59.587+05:30	2026-02-27 09:09:34.848+05:30
2111	3	akbar	akbar post 11 @farhan #fashion 	/api/v1/media/files/Jaadoe/posts/images/1772792177658-213331540_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-03-06 15:46:17.706+05:30	2026-03-06 15:46:20.371+05:30
2083	2	must	Post#1	/api/v1/media/files/Jaadoe/temp/1772083311074-485773742.jpg	\N	IMAGE	0	0	0	f	f	f	2026-02-26 10:51:51.559+05:30	2026-02-27 10:40:53.008+05:30
2092	3	akbar	akbar post 9 #nature 	/api/v1/media/files/Jaadoe/posts/images/1772084001350-613838150_opt.webp	\N	IMAGE	2	1	0	f	f	f	2026-02-26 11:03:21.406+05:30	2026-03-02 14:44:55.703+05:30
2109	7	sarfarz	sarfaraz post 6\n #fashion 	/api/v1/media/files/Jaadoe/posts/images/1772085203876-53702342_opt.webp	\N	IMAGE	2	0	0	f	f	f	2026-02-26 11:23:23.913+05:30	2026-03-05 10:23:14.44+05:30
2084	2	must	Post#2\n	/api/v1/media/files/Jaadoe/temp/1772083331536-854157292.jpg	\N	IMAGE	1	1	0	f	f	f	2026-02-26 10:52:14.797+05:30	2026-03-06 12:24:33.231+05:30
2081	2	must	test video1	/api/v1/media/files/Jaadoe/temp/1772083129771-421848745.mp4	\N	VIDEO	0	0	0	f	f	f	2026-02-26 10:48:51.812+05:30	2026-02-26 10:48:51.812+05:30
2082	3	akbar	akbar post 1 #nature 	/api/v1/media/files/Jaadoe/temp/1772083151740-81295609.jpeg	\N	IMAGE	0	0	0	f	f	f	2026-02-26 10:49:11.778+05:30	2026-02-26 10:49:11.778+05:30
2085	3	akbar	akbar post 2 #nature 	/api/v1/media/files/Jaadoe/posts/images/1772083690063-543250713_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 10:58:10.114+05:30	2026-02-26 10:58:10.761+05:30
2086	3	akbar	akbar post 3 #nature 	/api/v1/media/files/Jaadoe/posts/images/1772083716675-838098669_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 10:58:36.71+05:30	2026-02-26 10:58:37.28+05:30
2087	3	akbar	akbar post 4 #nature 	/api/v1/media/files/Jaadoe/posts/images/1772083857891-839185541_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:00:57.933+05:30	2026-02-26 11:00:58.808+05:30
2088	3	akbar	akbar post 5 #nature 	/api/v1/media/files/Jaadoe/posts/images/1772083881063-328282515_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:01:21.121+05:30	2026-02-26 11:01:21.772+05:30
2089	3	akbar	akbar post 6 #nature 	/api/v1/media/files/Jaadoe/posts/images/1772083903715-137274937_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:01:43.752+05:30	2026-02-26 11:01:44.511+05:30
2090	3	akbar	akbar video post 1 #nature 	/api/v1/media/files/Jaadoe/posts/videos/1772083946261-787236779_opt.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772083946261-787236779_thumb.jpg	VIDEO	0	0	0	f	f	f	2026-02-26 11:02:26.361+05:30	2026-02-26 11:02:33.441+05:30
2091	3	akbar	akbar post 8 #nature 	/api/v1/media/files/Jaadoe/posts/images/1772083980441-787963645_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:03:00.478+05:30	2026-02-26 11:03:01.228+05:30
2093	5	farhan	farhan post 1 #fitness 	/api/v1/media/files/Jaadoe/posts/images/1772084140775-236506375_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:05:40.942+05:30	2026-02-26 11:05:41.49+05:30
2094	5	farhan	farhan post 2 #fitness 	/api/v1/media/files/Jaadoe/posts/images/1772084224261-370391432_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:07:04.303+05:30	2026-02-26 11:07:04.795+05:30
2095	5	farhan	farhan post 3 #fitness 	/api/v1/media/files/Jaadoe/posts/images/1772084309680-421094899_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:08:29.735+05:30	2026-02-26 11:08:30.214+05:30
2096	5	farhan	farhan post 4 #fitness 	/api/v1/media/files/Jaadoe/posts/images/1772084677786-552942004_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:14:37.823+05:30	2026-02-26 11:14:38.378+05:30
2097	5	farhan	farhan video post 1 #fitness 	/api/v1/media/files/Jaadoe/posts/videos/1772084711014-465892621_opt.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772084711014-465892621_thumb.jpg	VIDEO	0	0	0	f	f	f	2026-02-26 11:15:11.101+05:30	2026-02-26 11:15:18.816+05:30
2098	5	farhan	farhan post 6 #fitness 	/api/v1/media/files/Jaadoe/posts/images/1772084737294-165056922_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:15:37.329+05:30	2026-02-26 11:15:37.799+05:30
2099	6	ashish	ashish post 1 #funny	/api/v1/media/files/Jaadoe/posts/images/1772084844423-656420074_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:17:24.445+05:30	2026-02-26 11:17:25.106+05:30
2100	6	ashish	ashish post 2 #funny 	/api/v1/media/files/Jaadoe/posts/images/1772084868584-105785180_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:17:48.601+05:30	2026-02-26 11:17:49.202+05:30
2101	6	ashish	ashish post 3 #funny	/api/v1/media/files/Jaadoe/posts/images/1772084888572-807098151_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:18:08.609+05:30	2026-02-26 11:18:09.363+05:30
2102	6	ashish	ashish video post 1 #funny	/api/v1/media/files/Jaadoe/posts/videos/1772084908242-231424085_opt.mp4	/api/v1/media/files/Jaadoe/thumbnails/1772084908242-231424085_thumb.jpg	VIDEO	0	0	0	f	f	f	2026-02-26 11:18:28.452+05:30	2026-02-26 11:18:32.673+05:30
2103	6	ashish	ashish post 5 #funny	/api/v1/media/files/Jaadoe/posts/images/1772084935442-859308026_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:18:55.479+05:30	2026-02-26 11:18:55.945+05:30
2104	7	sarfarz	sarfaraz post 1 #fashion 	/api/v1/media/files/Jaadoe/posts/images/1772085094171-555382470_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:21:34.267+05:30	2026-02-26 11:21:34.98+05:30
2105	7	sarfarz	sarfaraz post 2 #fashion 	/api/v1/media/files/Jaadoe/posts/images/1772085108823-577876933_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:21:48.869+05:30	2026-02-26 11:21:49.4+05:30
2106	7	sarfarz	sarfaraz post 3 #fashion 	/api/v1/media/files/Jaadoe/posts/images/1772085132202-220817702_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:22:12.241+05:30	2026-02-26 11:22:12.762+05:30
2107	7	sarfarz	sarfaraz post 4 #fashion 	/api/v1/media/files/Jaadoe/posts/images/1772085153529-636697416_opt.webp	\N	IMAGE	0	0	0	f	f	f	2026-02-26 11:22:33.58+05:30	2026-02-26 11:22:34.014+05:30
\.


--
-- Data for Name: ReelBookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ReelBookmarks" (id, "reelId", "userId", "createdAt", "updatedAt") FROM stdin;
9	62	2	2026-02-28 15:37:44.55+05:30	2026-02-28 15:37:44.55+05:30
\.


--
-- Data for Name: ReelLikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ReelLikes" (id, "userId", "reelId", "createdAt", "updatedAt") FROM stdin;
15	3	57	2026-02-26 14:53:08.542+05:30	2026-02-26 14:53:08.542+05:30
16	3	58	2026-02-26 14:53:11.771+05:30	2026-02-26 14:53:11.771+05:30
17	3	59	2026-02-26 14:53:13.114+05:30	2026-02-26 14:53:13.114+05:30
18	3	60	2026-02-26 14:53:14.371+05:30	2026-02-26 14:53:14.371+05:30
19	3	61	2026-02-26 14:53:15.522+05:30	2026-02-26 14:53:15.522+05:30
20	3	62	2026-02-26 14:53:16.619+05:30	2026-02-26 14:53:16.619+05:30
\.


--
-- Data for Name: ReelReports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ReelReports" (id, "reelId", "userId", reason, details, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Reels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reels" (id, "userId", username, caption, "videoUrl", "likesCount", "commentsCount", "viewsCount", "isHidden", "createdAt", "updatedAt", "hideLikes", "commentsDisabled") FROM stdin;
57	2	must	Car\n#car	/api/v1/media/files/Jaadoe/temp/1772083086068-504330130.mp4	1	0	0	f	2026-02-26 10:48:13.276+05:30	2026-02-26 14:53:08.545+05:30	f	f
58	2	must	test video1	/api/v1/media/files/Jaadoe/temp/1772083129771-421848745.mp4	1	0	0	f	2026-02-26 10:48:51.812+05:30	2026-02-26 14:53:11.775+05:30	f	f
59	3	akbar	akbar video post 1 #nature 	/api/v1/media/files/Jaadoe/posts/videos/1772083946261-787236779_opt.mp4	1	0	0	f	2026-02-26 11:02:26.361+05:30	2026-02-26 14:53:13.117+05:30	f	f
60	5	farhan	farhan video post 1 #fitness 	/api/v1/media/files/Jaadoe/posts/videos/1772084711014-465892621_opt.mp4	1	0	0	f	2026-02-26 11:15:11.101+05:30	2026-02-26 14:53:14.374+05:30	f	f
61	6	ashish	ashish video post 1 #funny	/api/v1/media/files/Jaadoe/posts/videos/1772084908242-231424085_opt.mp4	1	0	0	f	2026-02-26 11:18:28.452+05:30	2026-02-26 14:53:15.523+05:30	f	f
62	7	sarfarz	sarfaraz video post 1 #fashion 	/api/v1/media/files/Jaadoe/posts/videos/1772085179389-285577753_opt.mp4	1	0	0	f	2026-02-26 11:22:59.587+05:30	2026-02-26 14:53:16.622+05:30	f	f
\.


--
-- Data for Name: ReportReviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ReportReviews" (id, "reportId", "adminId", "actionTaken", notes, "resolvedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reports" (id, status, "createdAt", "updatedAt", "userId", username, text, files, "browserInfo") FROM stdin;
1	pending	2026-02-04 11:51:46.564+05:30	2026-02-04 11:51:46.564+05:30	\N	\N	\N	[]	\N
1	pending	2026-02-04 11:51:46.564+05:30	2026-02-04 11:51:46.564+05:30	\N	\N	\N	[]	\N
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reviews" (id, "userId", "targetId", type, rating, content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Roles" (id, name, permissions, description, "createdAt", "updatedAt") FROM stdin;
1	SuperAdmin	["all"]	\N	2026-02-23 10:16:24.899+05:30	2026-02-23 10:16:24.899+05:30
\.


--
-- Data for Name: SavedPosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SavedPosts" (id, "userId", "postId", "createdAt", "updatedAt") FROM stdin;
19	3	2109	2026-02-26 15:26:05.174+05:30	2026-02-26 15:26:05.174+05:30
22	2	2099	2026-02-27 13:25:59.181+05:30	2026-02-27 13:25:59.181+05:30
27	2	2109	2026-03-05 10:23:17.198+05:30	2026-03-05 10:23:17.198+05:30
28	2	2098	2026-03-06 09:29:18.075+05:30	2026-03-06 09:29:18.075+05:30
\.


--
-- Data for Name: SearchIndices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SearchIndices" (id, type, "referenceId", content, metadata, "createdAt", "updatedAt") FROM stdin;
440	USER	8	Anu1	{"fullName": "Anu1"}	2026-03-02 11:05:14.667+05:30	2026-03-02 11:05:14.667+05:30
447	USER	15	tanmay04_1074	{"fullName": "tanmay04_1074"}	2026-03-04 12:50:42.505+05:30	2026-03-04 12:50:42.505+05:30
453	POST	2111	akbar post 11 @farhan #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772792177658-213331540.avif"}	2026-03-06 15:46:17.737+05:30	2026-03-06 15:46:17.737+05:30
441	USER	9	irfan1	{"fullName": "irfan1"}	2026-03-02 12:09:12.722+05:30	2026-03-02 12:09:12.722+05:30
448	USER	16	testuser_1772610253864	{"fullName": "Test User"}	2026-03-04 13:14:14.091+05:30	2026-03-04 13:14:14.091+05:30
454	POST	2112	akbar post 12 #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772793583206-687353646.jpeg"}	2026-03-06 16:09:43.281+05:30	2026-03-06 16:09:43.281+05:30
54	POST	135	dummy 1	{"mediaUrl": "/uploads/1769586008217-332657727.jpg"}	2026-01-28 13:10:08.478+05:30	2026-01-28 13:10:08.478+05:30
55	POST	136	dummy 2	{"mediaUrl": "/uploads/1769586073828-4574796.jpg"}	2026-01-28 13:11:14.018+05:30	2026-01-28 13:11:14.018+05:30
56	POST	137	dummy 2\n	{"mediaUrl": "/uploads/1769586165781-740649094.jpg"}	2026-01-28 13:12:45.975+05:30	2026-01-28 13:12:45.975+05:30
57	POST	138	nature beauty	{"mediaUrl": "/uploads/1769586202762-637513652.jpg"}	2026-01-28 13:13:22.941+05:30	2026-01-28 13:13:22.941+05:30
58	POST	139	nature beauty 2	{"mediaUrl": "/uploads/1769586236092-856063816.jpg"}	2026-01-28 13:13:56.264+05:30	2026-01-28 13:13:56.264+05:30
63	POST	140	farhan dummy post	{"mediaUrl": "/uploads/1770029385415-866841386.jpg"}	2026-02-02 16:19:45.522+05:30	2026-02-02 16:19:45.522+05:30
69	POST	1843	Test Post	{"mediaUrl": "/uploads/1770268906633-566465622.jpg"}	2026-02-05 10:51:47.689+05:30	2026-02-05 10:51:47.689+05:30
72	POST	1844	dummy 5	{"mediaUrl": "/uploads/1770272549250-437207679.jpg"}	2026-02-05 11:52:29.614+05:30	2026-02-05 11:52:29.614+05:30
82	POST	1846	nature beauty 6	{"mediaUrl": "/uploads/1770293285905-80005929.jpg"}	2026-02-05 17:38:06.318+05:30	2026-02-05 17:38:06.318+05:30
83	POST	1847	dummy 1\n	{"mediaUrl": "/uploads/1770294206085-117045873.jpg"}	2026-02-05 17:53:26.395+05:30	2026-02-05 17:53:26.395+05:30
84	POST	1848	dummy 2	{"mediaUrl": "/uploads/1770294236761-75129711.jpg"}	2026-02-05 17:53:57.086+05:30	2026-02-05 17:53:57.086+05:30
85	POST	1849	dummy 3	{"mediaUrl": "/uploads/1770294262265-235600614.jpg"}	2026-02-05 17:54:22.482+05:30	2026-02-05 17:54:22.482+05:30
86	POST	1850	dummy 4	{"mediaUrl": "/uploads/1770294283922-861043805.jpg"}	2026-02-05 17:54:44.142+05:30	2026-02-05 17:54:44.142+05:30
87	POST	1851	dummy 8	{"mediaUrl": "/uploads/1770355401202-171697166.jpg"}	2026-02-06 10:53:21.924+05:30	2026-02-06 10:53:21.924+05:30
88	POST	1852	dummy 9	{"mediaUrl": "/uploads/1770355722866-200583715.jpg"}	2026-02-06 10:58:44.068+05:30	2026-02-06 10:58:44.068+05:30
89	POST	1853	dummy 10	{"mediaUrl": "/uploads/1770356616847-50456018.jpg"}	2026-02-06 11:13:37.425+05:30	2026-02-06 11:13:37.425+05:30
90	POST	1854	dummy 10	{"mediaUrl": "/uploads/1770357936538-489591139.jpg"}	2026-02-06 11:35:36.817+05:30	2026-02-06 11:35:36.817+05:30
91	POST	1855	dummy 10	{"mediaUrl": "/uploads/1770360106996-944519205.jpg"}	2026-02-06 12:11:47.28+05:30	2026-02-06 12:11:47.28+05:30
92	POST	1856	dummy 11	{"mediaUrl": "/uploads/1770360174825-454549326.jpg"}	2026-02-06 12:12:55.168+05:30	2026-02-06 12:12:55.168+05:30
93	POST	1857	dummy 12	{"mediaUrl": "/uploads/1770360383981-753125223.jpg"}	2026-02-06 12:16:24.255+05:30	2026-02-06 12:16:24.255+05:30
95	POST	1858	dummy banganwadi	{"mediaUrl": "/uploads/1770363625553-171547508.svg"}	2026-02-06 13:10:25.704+05:30	2026-02-06 13:10:25.704+05:30
96	POST	1859	dummy 12	{"mediaUrl": "/uploads/1770383088961-297062159.jpg"}	2026-02-06 18:34:51.294+05:30	2026-02-06 18:34:51.294+05:30
97	POST	1860	test 1	{"mediaUrl": "https://pub-2358eaa2410b49978f2040fef6f8f1af.r2.dev/Jaadoe/temp/abca96d2-2431-4154-895b-a6b9b9b484ab.jpg"}	2026-02-06 18:51:41.314+05:30	2026-02-06 18:51:41.314+05:30
98	POST	1861	test 2	{"mediaUrl": "https://pub-2358eaa2410b49978f2040fef6f8f1af.r2.dev/Jaadoe/temp/31a8b85c-4eba-475c-ab3e-46d31ef5514c.jpg"}	2026-02-06 18:53:33.124+05:30	2026-02-06 18:53:33.124+05:30
99	POST	1862	test 2	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/9fd53978-ff27-48c0-955c-292a21a7ed51.jpg"}	2026-02-09 12:28:50.413+05:30	2026-02-09 12:28:50.413+05:30
100	POST	1863	test 4	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f.jpg"}	2026-02-09 12:48:48.493+05:30	2026-02-09 12:48:48.493+05:30
101	POST	1864	test 8	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/8863bbab-d6a2-4d56-8efe-0c17859da87d.jpg"}	2026-02-10 11:42:49.584+05:30	2026-02-10 11:42:49.584+05:30
115	POST	1866	Beautiful photo 1 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-11 17:01:11.631+05:30	2026-02-11 17:01:11.631+05:30
116	POST	1867	Beautiful photo 2 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-11 17:01:11.66+05:30	2026-02-11 17:01:11.66+05:30
117	POST	1868	Beautiful photo 3 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-11 17:01:11.66+05:30	2026-02-11 17:01:11.66+05:30
118	POST	1869	Beautiful photo 4 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-11 17:01:11.661+05:30	2026-02-11 17:01:11.661+05:30
119	POST	1870	Beautiful photo 5 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-11 17:01:11.662+05:30	2026-02-11 17:01:11.662+05:30
120	POST	1871	Beautiful photo 6 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-11 17:01:11.681+05:30	2026-02-11 17:01:11.681+05:30
121	POST	1872	Beautiful photo 7 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-11 17:01:11.682+05:30	2026-02-11 17:01:11.682+05:30
122	POST	1873	Beautiful photo 8 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-11 17:01:11.683+05:30	2026-02-11 17:01:11.683+05:30
123	POST	1874	Beautiful photo 9 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-11 17:01:11.683+05:30	2026-02-11 17:01:11.683+05:30
124	POST	1875	Beautiful photo 10 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-11 17:01:11.74+05:30	2026-02-11 17:01:11.74+05:30
125	POST	1876	Beautiful photo 11 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-11 17:01:11.741+05:30	2026-02-11 17:01:11.741+05:30
126	POST	1877	Beautiful photo 12 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-11 17:01:11.75+05:30	2026-02-11 17:01:11.75+05:30
127	POST	1878	Beautiful photo 13 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-11 17:01:11.75+05:30	2026-02-11 17:01:11.75+05:30
128	POST	1879	Beautiful photo 14 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-11 17:01:11.758+05:30	2026-02-11 17:01:11.758+05:30
129	POST	1880	Beautiful photo 15 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-11 17:01:11.759+05:30	2026-02-11 17:01:11.759+05:30
130	POST	1881	Beautiful photo 16 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-11 17:01:11.759+05:30	2026-02-11 17:01:11.759+05:30
131	POST	1882	Beautiful photo 17 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-11 17:01:11.759+05:30	2026-02-11 17:01:11.759+05:30
132	POST	1883	Beautiful photo 18 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-11 17:01:11.759+05:30	2026-02-11 17:01:11.759+05:30
133	POST	1884	Beautiful photo 19 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-11 17:01:11.773+05:30	2026-02-11 17:01:11.773+05:30
134	POST	1885	Beautiful photo 20 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-11 17:01:11.802+05:30	2026-02-11 17:01:11.802+05:30
135	POST	1886	Awesome reel 1 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-11 17:01:11.817+05:30	2026-02-11 17:01:11.817+05:30
136	POST	1887	Awesome reel 2 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-11 17:01:11.817+05:30	2026-02-11 17:01:11.817+05:30
137	POST	1888	Awesome reel 3 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-11 17:01:11.817+05:30	2026-02-11 17:01:11.817+05:30
138	POST	1889	Awesome reel 4 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-11 17:01:11.85+05:30	2026-02-11 17:01:11.85+05:30
139	POST	1891	Awesome reel 6 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-11 17:01:11.87+05:30	2026-02-11 17:01:11.87+05:30
140	POST	1890	Awesome reel 5 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-11 17:01:11.87+05:30	2026-02-11 17:01:11.87+05:30
141	POST	1892	Awesome reel 7 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-11 17:01:11.881+05:30	2026-02-11 17:01:11.881+05:30
142	POST	1893	Awesome reel 8 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-11 17:01:11.881+05:30	2026-02-11 17:01:11.881+05:30
143	POST	1894	Awesome reel 9 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-11 17:01:11.917+05:30	2026-02-11 17:01:11.917+05:30
144	POST	1895	Awesome reel 10 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-11 17:01:11.919+05:30	2026-02-11 17:01:11.919+05:30
145	POST	1896	nature 	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/7eb0761d-5106-4a1f-9779-63fcbc01f8c5.jpg"}	2026-02-12 16:30:00.274+05:30	2026-02-12 16:30:00.274+05:30
146	POST	1897	dummy video	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/4512a32b-46f5-4677-ab27-ec28d02551dd.mp4"}	2026-02-12 16:51:09.652+05:30	2026-02-12 16:51:09.652+05:30
147	POST	1898	dummy video 2	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/1382da49-c502-426b-8024-d6c9117d4665.mp4"}	2026-02-12 16:53:26.485+05:30	2026-02-12 16:53:26.485+05:30
148	POST	1899	demo video 2	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/8734b5f7-afc9-4e1e-aeba-967400077bf6.mp4"}	2026-02-12 16:55:47.808+05:30	2026-02-12 16:55:47.808+05:30
149	POST	1900	Beautiful photo 1 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:09:46.065+05:30	2026-02-12 17:09:46.065+05:30
150	POST	1901	Beautiful photo 2 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:09:46.108+05:30	2026-02-12 17:09:46.108+05:30
151	POST	1902	Beautiful photo 3 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:09:46.111+05:30	2026-02-12 17:09:46.111+05:30
152	POST	1903	Beautiful photo 4 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:09:46.113+05:30	2026-02-12 17:09:46.113+05:30
153	POST	1904	Beautiful photo 5 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:09:46.123+05:30	2026-02-12 17:09:46.123+05:30
154	POST	1905	Beautiful photo 6 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:09:46.124+05:30	2026-02-12 17:09:46.124+05:30
155	POST	1906	Beautiful photo 7 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:09:46.124+05:30	2026-02-12 17:09:46.124+05:30
156	POST	1907	Beautiful photo 8 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:09:46.125+05:30	2026-02-12 17:09:46.125+05:30
157	POST	1908	Beautiful photo 9 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:09:46.125+05:30	2026-02-12 17:09:46.125+05:30
158	POST	1909	Beautiful photo 10 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:09:46.126+05:30	2026-02-12 17:09:46.126+05:30
159	POST	1910	Beautiful photo 11 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:09:46.127+05:30	2026-02-12 17:09:46.127+05:30
160	POST	1911	Beautiful photo 12 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:09:46.127+05:30	2026-02-12 17:09:46.127+05:30
161	POST	1912	Beautiful photo 13 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:09:46.142+05:30	2026-02-12 17:09:46.142+05:30
162	POST	1913	Beautiful photo 14 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:09:46.143+05:30	2026-02-12 17:09:46.143+05:30
163	POST	1914	Beautiful photo 15 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:09:46.143+05:30	2026-02-12 17:09:46.143+05:30
164	POST	1915	Beautiful photo 16 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:09:46.143+05:30	2026-02-12 17:09:46.143+05:30
165	POST	1916	Beautiful photo 17 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:09:46.143+05:30	2026-02-12 17:09:46.143+05:30
166	POST	1917	Beautiful photo 18 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:09:46.143+05:30	2026-02-12 17:09:46.143+05:30
167	POST	1918	Beautiful photo 19 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:09:46.144+05:30	2026-02-12 17:09:46.144+05:30
168	POST	1919	Beautiful photo 20 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:09:46.144+05:30	2026-02-12 17:09:46.144+05:30
169	POST	1920	Awesome reel 1 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:09:46.144+05:30	2026-02-12 17:09:46.144+05:30
170	POST	1921	Awesome reel 2 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:09:46.145+05:30	2026-02-12 17:09:46.145+05:30
171	POST	1922	Awesome reel 3 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:09:46.145+05:30	2026-02-12 17:09:46.145+05:30
172	POST	1923	Awesome reel 4 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:09:46.145+05:30	2026-02-12 17:09:46.145+05:30
173	POST	1924	Awesome reel 5 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:09:46.145+05:30	2026-02-12 17:09:46.145+05:30
174	POST	1925	Awesome reel 6 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:09:46.159+05:30	2026-02-12 17:09:46.159+05:30
175	POST	1926	Awesome reel 7 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:09:46.159+05:30	2026-02-12 17:09:46.159+05:30
176	POST	1927	Awesome reel 8 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:09:46.16+05:30	2026-02-12 17:09:46.16+05:30
177	POST	1928	Awesome reel 9 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:09:46.161+05:30	2026-02-12 17:09:46.161+05:30
178	POST	1929	Awesome reel 10 #reel #viral	{"mediaUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:09:46.164+05:30	2026-02-12 17:09:46.164+05:30
179	POST	1930	demo video 1	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/dfe140e4-e3e4-478c-8d80-d85c26b0cc34.mp4"}	2026-02-12 17:19:01.655+05:30	2026-02-12 17:19:01.655+05:30
180	POST	1931	Beautiful photo 1 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:28:04.852+05:30	2026-02-12 17:28:04.852+05:30
181	POST	1932	Beautiful photo 2 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:28:04.896+05:30	2026-02-12 17:28:04.896+05:30
182	POST	1933	Beautiful photo 3 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:28:04.897+05:30	2026-02-12 17:28:04.897+05:30
183	POST	1934	Beautiful photo 4 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:28:04.897+05:30	2026-02-12 17:28:04.897+05:30
184	POST	1935	Beautiful photo 5 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:28:04.897+05:30	2026-02-12 17:28:04.897+05:30
185	POST	1936	Beautiful photo 6 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:28:04.897+05:30	2026-02-12 17:28:04.897+05:30
186	POST	1937	Beautiful photo 7 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:28:04.898+05:30	2026-02-12 17:28:04.898+05:30
187	POST	1938	Beautiful photo 8 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:28:04.954+05:30	2026-02-12 17:28:04.954+05:30
188	POST	1939	Beautiful photo 9 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:28:04.955+05:30	2026-02-12 17:28:04.955+05:30
189	POST	1940	Beautiful photo 10 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:28:05.046+05:30	2026-02-12 17:28:05.046+05:30
190	POST	1941	Beautiful photo 11 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:28:05.047+05:30	2026-02-12 17:28:05.047+05:30
191	POST	1942	Beautiful photo 12 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:28:05.048+05:30	2026-02-12 17:28:05.048+05:30
192	POST	1943	Beautiful photo 13 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:28:05.056+05:30	2026-02-12 17:28:05.056+05:30
193	POST	1944	Beautiful photo 14 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:28:05.056+05:30	2026-02-12 17:28:05.056+05:30
194	POST	1945	Beautiful photo 15 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:28:05.073+05:30	2026-02-12 17:28:05.073+05:30
195	POST	1946	Beautiful photo 16 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:28:05.073+05:30	2026-02-12 17:28:05.073+05:30
196	POST	1947	Beautiful photo 17 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:28:05.073+05:30	2026-02-12 17:28:05.073+05:30
197	POST	1948	Beautiful photo 18 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:28:05.074+05:30	2026-02-12 17:28:05.074+05:30
198	POST	1949	Beautiful photo 19 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:28:05.076+05:30	2026-02-12 17:28:05.076+05:30
199	POST	1950	Beautiful photo 20 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:28:05.076+05:30	2026-02-12 17:28:05.076+05:30
200	POST	1951	Awesome reel 1 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:28:05.076+05:30	2026-02-12 17:28:05.076+05:30
201	POST	1952	Awesome reel 2 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:28:05.08+05:30	2026-02-12 17:28:05.08+05:30
203	POST	1954	Awesome reel 4 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:28:05.083+05:30	2026-02-12 17:28:05.083+05:30
205	POST	1956	Awesome reel 6 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:28:05.083+05:30	2026-02-12 17:28:05.083+05:30
207	POST	1958	Awesome reel 8 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:28:05.084+05:30	2026-02-12 17:28:05.084+05:30
202	POST	1953	Awesome reel 3 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:28:05.08+05:30	2026-02-12 17:28:05.08+05:30
204	POST	1955	Awesome reel 5 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:28:05.083+05:30	2026-02-12 17:28:05.083+05:30
206	POST	1957	Awesome reel 7 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:28:05.083+05:30	2026-02-12 17:28:05.083+05:30
208	POST	1960	Awesome reel 10 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:28:05.084+05:30	2026-02-12 17:28:05.084+05:30
209	POST	1959	Awesome reel 9 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:28:05.084+05:30	2026-02-12 17:28:05.084+05:30
210	POST	1961	Beautiful photo 1 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:30:43.435+05:30	2026-02-12 17:30:43.435+05:30
211	POST	1962	Beautiful photo 2 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:30:43.478+05:30	2026-02-12 17:30:43.478+05:30
212	POST	1963	Beautiful photo 3 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:30:43.479+05:30	2026-02-12 17:30:43.479+05:30
213	POST	1964	Beautiful photo 4 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:30:43.479+05:30	2026-02-12 17:30:43.479+05:30
214	POST	1965	Beautiful photo 5 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:30:43.479+05:30	2026-02-12 17:30:43.479+05:30
215	POST	1966	Beautiful photo 6 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:30:43.479+05:30	2026-02-12 17:30:43.479+05:30
216	POST	1967	Beautiful photo 7 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:30:43.479+05:30	2026-02-12 17:30:43.479+05:30
217	POST	1968	Beautiful photo 8 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:30:43.48+05:30	2026-02-12 17:30:43.48+05:30
218	POST	1969	Beautiful photo 9 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:30:43.48+05:30	2026-02-12 17:30:43.48+05:30
219	POST	1970	Beautiful photo 10 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:30:43.48+05:30	2026-02-12 17:30:43.48+05:30
220	POST	1971	Beautiful photo 11 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:30:43.48+05:30	2026-02-12 17:30:43.48+05:30
221	POST	1972	Beautiful photo 12 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:30:43.491+05:30	2026-02-12 17:30:43.491+05:30
222	POST	1973	Beautiful photo 13 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:30:43.491+05:30	2026-02-12 17:30:43.491+05:30
223	POST	1974	Beautiful photo 14 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:30:43.492+05:30	2026-02-12 17:30:43.492+05:30
224	POST	1975	Beautiful photo 15 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:30:43.492+05:30	2026-02-12 17:30:43.492+05:30
225	POST	1976	Beautiful photo 16 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:30:43.502+05:30	2026-02-12 17:30:43.502+05:30
226	POST	1977	Beautiful photo 17 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:30:43.506+05:30	2026-02-12 17:30:43.506+05:30
227	POST	1978	Beautiful photo 18 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:30:43.511+05:30	2026-02-12 17:30:43.511+05:30
228	POST	1979	Beautiful photo 19 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:30:43.517+05:30	2026-02-12 17:30:43.517+05:30
229	POST	1980	Beautiful photo 20 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:30:43.521+05:30	2026-02-12 17:30:43.521+05:30
230	POST	1981	Awesome reel 1 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:30:43.529+05:30	2026-02-12 17:30:43.529+05:30
231	POST	1982	Awesome reel 2 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:30:43.535+05:30	2026-02-12 17:30:43.535+05:30
232	POST	1983	Awesome reel 3 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:30:43.544+05:30	2026-02-12 17:30:43.544+05:30
233	POST	1984	Awesome reel 4 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:30:43.552+05:30	2026-02-12 17:30:43.552+05:30
234	POST	1985	Awesome reel 5 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:30:43.559+05:30	2026-02-12 17:30:43.559+05:30
235	POST	1986	Awesome reel 6 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:30:43.566+05:30	2026-02-12 17:30:43.566+05:30
236	POST	1987	Awesome reel 7 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:30:43.571+05:30	2026-02-12 17:30:43.571+05:30
237	POST	1988	Awesome reel 8 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:30:43.578+05:30	2026-02-12 17:30:43.578+05:30
238	POST	1989	Awesome reel 9 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:30:43.584+05:30	2026-02-12 17:30:43.584+05:30
239	POST	1990	Awesome reel 10 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:30:43.594+05:30	2026-02-12 17:30:43.594+05:30
240	POST	1991	Beautiful photo 1 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:33:13.776+05:30	2026-02-12 17:33:13.776+05:30
241	POST	1992	Beautiful photo 2 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:33:13.818+05:30	2026-02-12 17:33:13.818+05:30
242	POST	1993	Beautiful photo 3 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:33:13.819+05:30	2026-02-12 17:33:13.819+05:30
243	POST	1994	Beautiful photo 4 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:33:13.819+05:30	2026-02-12 17:33:13.819+05:30
244	POST	1995	Beautiful photo 5 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:33:13.822+05:30	2026-02-12 17:33:13.822+05:30
245	POST	1996	Beautiful photo 6 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:33:13.822+05:30	2026-02-12 17:33:13.822+05:30
246	POST	1997	Beautiful photo 7 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:33:13.825+05:30	2026-02-12 17:33:13.825+05:30
247	POST	1998	Beautiful photo 8 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:33:13.826+05:30	2026-02-12 17:33:13.826+05:30
248	POST	1999	Beautiful photo 9 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:33:13.826+05:30	2026-02-12 17:33:13.826+05:30
249	POST	2000	Beautiful photo 10 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:33:13.826+05:30	2026-02-12 17:33:13.826+05:30
250	POST	2001	Beautiful photo 11 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:33:13.827+05:30	2026-02-12 17:33:13.827+05:30
251	POST	2002	Beautiful photo 12 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:33:13.828+05:30	2026-02-12 17:33:13.828+05:30
252	POST	2003	Beautiful photo 13 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:33:13.832+05:30	2026-02-12 17:33:13.832+05:30
253	POST	2004	Beautiful photo 14 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:33:13.838+05:30	2026-02-12 17:33:13.838+05:30
254	POST	2005	Beautiful photo 15 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:33:13.847+05:30	2026-02-12 17:33:13.847+05:30
255	POST	2006	Beautiful photo 16 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:33:13.855+05:30	2026-02-12 17:33:13.855+05:30
256	POST	2007	Beautiful photo 17 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:33:13.86+05:30	2026-02-12 17:33:13.86+05:30
257	POST	2008	Beautiful photo 18 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:33:13.869+05:30	2026-02-12 17:33:13.869+05:30
258	POST	2009	Beautiful photo 19 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:33:13.875+05:30	2026-02-12 17:33:13.875+05:30
259	POST	2010	Beautiful photo 20 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:33:13.887+05:30	2026-02-12 17:33:13.887+05:30
260	POST	2011	Awesome reel 1 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:33:13.897+05:30	2026-02-12 17:33:13.897+05:30
261	POST	2012	Awesome reel 2 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:33:13.915+05:30	2026-02-12 17:33:13.915+05:30
262	POST	2013	Awesome reel 3 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:33:13.92+05:30	2026-02-12 17:33:13.92+05:30
263	POST	2014	Awesome reel 4 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:33:13.926+05:30	2026-02-12 17:33:13.926+05:30
264	POST	2015	Awesome reel 5 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:33:13.933+05:30	2026-02-12 17:33:13.933+05:30
265	POST	2016	Awesome reel 6 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}	2026-02-12 17:33:13.941+05:30	2026-02-12 17:33:13.941+05:30
266	POST	2017	Awesome reel 7 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}	2026-02-12 17:33:13.952+05:30	2026-02-12 17:33:13.952+05:30
267	POST	2018	Awesome reel 8 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}	2026-02-12 17:33:13.962+05:30	2026-02-12 17:33:13.962+05:30
268	POST	2019	Awesome reel 9 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}	2026-02-12 17:33:13.969+05:30	2026-02-12 17:33:13.969+05:30
269	POST	2020	Awesome reel 10 #reel #viral	{"mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}	2026-02-12 17:33:13.978+05:30	2026-02-12 17:33:13.978+05:30
270	POST	2021	Beautiful photo 1 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:36:02.803+05:30	2026-02-12 17:36:02.803+05:30
271	POST	2022	Beautiful photo 2 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:36:02.845+05:30	2026-02-12 17:36:02.845+05:30
272	POST	2023	Beautiful photo 3 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:36:02.846+05:30	2026-02-12 17:36:02.846+05:30
273	POST	2024	Beautiful photo 4 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:36:02.846+05:30	2026-02-12 17:36:02.846+05:30
274	POST	2025	Beautiful photo 5 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:36:02.846+05:30	2026-02-12 17:36:02.846+05:30
275	POST	2026	Beautiful photo 6 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:36:02.847+05:30	2026-02-12 17:36:02.847+05:30
276	POST	2027	Beautiful photo 7 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:36:02.847+05:30	2026-02-12 17:36:02.847+05:30
277	POST	2028	Beautiful photo 8 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:36:02.854+05:30	2026-02-12 17:36:02.854+05:30
278	POST	2029	Beautiful photo 9 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:36:02.854+05:30	2026-02-12 17:36:02.854+05:30
279	POST	2031	Beautiful photo 11 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"}	2026-02-12 17:36:02.854+05:30	2026-02-12 17:36:02.854+05:30
280	POST	2030	Beautiful photo 10 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:36:02.854+05:30	2026-02-12 17:36:02.854+05:30
281	POST	2032	Beautiful photo 12 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80"}	2026-02-12 17:36:02.855+05:30	2026-02-12 17:36:02.855+05:30
282	POST	2033	Beautiful photo 13 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"}	2026-02-12 17:36:02.855+05:30	2026-02-12 17:36:02.855+05:30
283	POST	2034	Beautiful photo 14 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80"}	2026-02-12 17:36:02.855+05:30	2026-02-12 17:36:02.855+05:30
284	POST	2035	Beautiful photo 15 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80"}	2026-02-12 17:36:02.855+05:30	2026-02-12 17:36:02.855+05:30
285	POST	2036	Beautiful photo 16 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"}	2026-02-12 17:36:02.855+05:30	2026-02-12 17:36:02.855+05:30
286	POST	2037	Beautiful photo 17 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"}	2026-02-12 17:36:02.855+05:30	2026-02-12 17:36:02.855+05:30
287	POST	2038	Beautiful photo 18 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"}	2026-02-12 17:36:02.865+05:30	2026-02-12 17:36:02.865+05:30
442	USER	10	shahbaazk	{"fullName": "shahbaazk"}	2026-03-02 12:10:33.765+05:30	2026-03-02 12:10:33.765+05:30
288	POST	2039	Beautiful photo 19 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"}	2026-02-12 17:36:02.867+05:30	2026-02-12 17:36:02.867+05:30
289	POST	2040	Beautiful photo 20 #photo #explore	{"mediaUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"}	2026-02-12 17:36:02.873+05:30	2026-02-12 17:36:02.873+05:30
290	POST	2041	Awesome reel 1 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1/dog.mp4"}	2026-02-12 17:36:02.879+05:30	2026-02-12 17:36:02.879+05:30
291	POST	2042	Awesome reel 2 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1/elephants.mp4"}	2026-02-12 17:36:02.884+05:30	2026-02-12 17:36:02.884+05:30
292	POST	2043	Awesome reel 3 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1691456947/cld-sample-video.mp4"}	2026-02-12 17:36:02.888+05:30	2026-02-12 17:36:02.888+05:30
293	POST	2044	Awesome reel 4 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1691456947/cld-sample-video.mp4"}	2026-02-12 17:36:02.898+05:30	2026-02-12 17:36:02.898+05:30
295	POST	2046	Awesome reel 6 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1/dog.mp4"}	2026-02-12 17:36:02.905+05:30	2026-02-12 17:36:02.905+05:30
297	POST	2048	Awesome reel 8 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1691456947/cld-sample-video.mp4"}	2026-02-12 17:36:02.918+05:30	2026-02-12 17:36:02.918+05:30
299	POST	2050	Awesome reel 10 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1691456947/cld-sample-video.mp4"}	2026-02-12 17:36:02.933+05:30	2026-02-12 17:36:02.933+05:30
294	POST	2045	Awesome reel 5 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1691456947/cld-sample-video.mp4"}	2026-02-12 17:36:02.899+05:30	2026-02-12 17:36:02.899+05:30
296	POST	2047	Awesome reel 7 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1/elephants.mp4"}	2026-02-12 17:36:02.916+05:30	2026-02-12 17:36:02.916+05:30
298	POST	2049	Awesome reel 9 #reel #viral	{"mediaUrl": "https://res.cloudinary.com/demo/video/upload/v1691456947/cld-sample-video.mp4"}	2026-02-12 17:36:02.925+05:30	2026-02-12 17:36:02.925+05:30
300	POST	2051	test video	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/85f130c8-d74d-4923-8739-fc264813a7ce.mp4"}	2026-02-12 17:38:36.568+05:30	2026-02-12 17:38:36.568+05:30
443	USER	11	abuzar	{"fullName": "abuzar"}	2026-03-04 09:08:31.34+05:30	2026-03-04 09:08:31.34+05:30
302	POST	2052	demo post 1	{"mediaUrl": "http://localhost:5000/api/v1/media/files/Jaadoe/temp/84999aed-feaa-4031-a254-ee866ad2cd2c.jpg"}	2026-02-13 15:15:35.652+05:30	2026-02-13 15:15:35.652+05:30
449	USER	17	ashish02_3137	{"fullName": "ashish02_3137"}	2026-03-04 13:30:29.157+05:30	2026-03-04 13:30:29.157+05:30
316	POST	2053	dummy 	{"mediaUrl": "/uploads/1770988032210-76741009.jpg"}	2026-02-13 18:37:12.679+05:30	2026-02-13 18:37:12.679+05:30
317	POST	2059	test video 1	{"mediaUrl": "/uploads/1771050929884-434600612.mp4"}	2026-02-14 12:05:30.843+05:30	2026-02-14 12:05:30.843+05:30
318	POST	2060	farhan test post 2\n	{"mediaUrl": "/uploads/1771051184435-231777391.jpg"}	2026-02-14 12:09:44.801+05:30	2026-02-14 12:09:44.801+05:30
319	POST	2061	test photo 3	{"mediaUrl": "/uploads/1771052025087-575112275.jpg"}	2026-02-14 12:23:45.357+05:30	2026-02-14 12:23:45.357+05:30
320	POST	2062	test post 5	{"mediaUrl": "/uploads/1771052299797-234362486.jpg"}	2026-02-14 12:28:20.075+05:30	2026-02-14 12:28:20.075+05:30
321	POST	2063	test video 2	{"mediaUrl": "http://192.168.1.15:5175/api/v1/media/files/Jaadoe/temp/1771052741909-249183001.mp4"}	2026-02-14 12:35:42.316+05:30	2026-02-14 12:35:42.316+05:30
322	POST	2064	image 1	{"mediaUrl": "http://192.168.1.15:5175/api/v1/media/files/Jaadoe/temp/1771053937764-231248378.avif"}	2026-02-14 12:55:38.218+05:30	2026-02-14 12:55:38.218+05:30
324	POST	2065	image 2	{"mediaUrl": "http://192.168.1.15:5175/api/v1/media/files/Jaadoe/temp/1771055331008-745017019.avif"}	2026-02-14 13:18:51.135+05:30	2026-02-14 13:18:51.135+05:30
326	POST	2066	image 3	{"mediaUrl": "http://192.168.1.15:5175/api/v1/media/files/Jaadoe/temp/1771055998520-423256148.jpg"}	2026-02-14 13:29:59.544+05:30	2026-02-14 13:29:59.544+05:30
327	POST	2067	eafeese	{"mediaUrl": "http://192.168.1.15:5175/api/v1/media/files/Jaadoe/temp/1771065681966-569119485.png"}	2026-02-14 16:11:22.341+05:30	2026-02-14 16:11:22.341+05:30
444	USER	12	tanmay_8470	{"fullName": "tanmay_8470"}	2026-03-04 11:42:31.875+05:30	2026-03-04 11:42:31.875+05:30
450	POST	2110	akbar post 09 #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772685470170-724300631.avif"}	2026-03-05 10:07:50.223+05:30	2026-03-05 10:07:50.223+05:30
455	USER	20	taleem_4160	{"fullName": "taleem_4160"}	2026-03-07 10:39:00.627+05:30	2026-03-07 10:39:00.627+05:30
373	HASHTAG	0	#travel	{"postCount": 4996}	2026-02-20 09:57:26.739+05:30	2026-02-20 09:57:26.739+05:30
376	HASHTAG	0	#art	{"postCount": 4217}	2026-02-20 09:57:26.763+05:30	2026-02-20 09:57:26.763+05:30
377	HASHTAG	0	#lifestyle	{"postCount": 4036}	2026-02-20 09:57:26.769+05:30	2026-02-20 09:57:26.769+05:30
378	HASHTAG	0	#tech	{"postCount": 461}	2026-02-20 09:57:26.777+05:30	2026-02-20 09:57:26.777+05:30
380	HASHTAG	0	#music	{"postCount": 1829}	2026-02-20 09:57:26.791+05:30	2026-02-20 09:57:26.791+05:30
381	HASHTAG	0	#gym	{"postCount": 441}	2026-02-20 09:57:26.796+05:30	2026-02-20 09:57:26.796+05:30
382	HASHTAG	0	#love	{"postCount": 4798}	2026-02-20 09:57:26.801+05:30	2026-02-20 09:57:26.801+05:30
383	HASHTAG	0	#instagood	{"postCount": 1566}	2026-02-20 09:57:26.807+05:30	2026-02-20 09:57:26.807+05:30
384	HASHTAG	0	#reels	{"postCount": 1236}	2026-02-20 09:57:26.813+05:30	2026-02-20 09:57:26.813+05:30
385	HASHTAG	0	#trending	{"postCount": 3079}	2026-02-20 09:57:26.818+05:30	2026-02-20 09:57:26.818+05:30
386	HASHTAG	0	#explore	{"postCount": 917}	2026-02-20 09:57:26.827+05:30	2026-02-20 09:57:26.827+05:30
328	POST	2068	image 4	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771072861057-610049809.jpg"}	2026-02-14 18:11:01.483+05:30	2026-02-14 18:11:01.483+05:30
345	POST	2069	ashish demo video	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771225376505-801902237.mp4"}	2026-02-16 12:32:57.274+05:30	2026-02-16 12:32:57.274+05:30
346	POST	2070	tanmay demo video	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771225465952-820839473.mp4"}	2026-02-16 12:34:27.593+05:30	2026-02-16 12:34:27.593+05:30
347	POST	2071	tanmay post	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771225518919-438291244.jpg"}	2026-02-16 12:35:19.158+05:30	2026-02-16 12:35:19.158+05:30
348	POST	2072	tanmay post 2	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771226380496-993557258.avif"}	2026-02-16 12:49:40.694+05:30	2026-02-16 12:49:40.694+05:30
366	POST	2073	dummy 5\n	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771314095068-107043085.jpg"}	2026-02-17 13:11:35.587+05:30	2026-02-17 13:11:35.587+05:30
387	POST	2074	#nature 	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771562239481-211424583.jpg"}	2026-02-20 10:07:19.749+05:30	2026-02-20 10:07:19.749+05:30
388	POST	2075	#nature #photography dummy post 1	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771567711814-335152869.jpg"}	2026-02-20 11:38:32.562+05:30	2026-02-20 11:38:32.562+05:30
372	HASHTAG	0	#photography	{"postCount": 4978}	2026-02-20 09:57:26.731+05:30	2026-02-20 11:38:33.29+05:30
389	POST	2076	 dummy post 2  #nature 	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771568012612-815406907.jpg"}	2026-02-20 11:43:32.927+05:30	2026-02-20 11:43:32.927+05:30
391	POST	2077	sarfaraz dummy video 1	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771568209132-773255378.mp4"}	2026-02-20 11:46:51.182+05:30	2026-02-20 11:46:51.182+05:30
392	POST	2078	Keep going\n#motivation	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771568433623-679148882.png"}	2026-02-20 11:50:33.748+05:30	2026-02-20 11:50:33.748+05:30
393	HASHTAG	0	#motivation	{"postCount": 1}	2026-02-20 11:50:33.753+05:30	2026-02-20 11:50:33.753+05:30
394	POST	2079	#foodie dummy post	{"mediaUrl": "http://192.168.1.4:5175/api/v1/media/files/Jaadoe/temp/1771582005736-405184252.jpg"}	2026-02-20 15:36:46.318+05:30	2026-02-20 15:36:46.318+05:30
375	HASHTAG	0	#foodie	{"postCount": 2319}	2026-02-20 09:57:26.754+05:30	2026-02-20 15:36:46.843+05:30
395	POST	2080	Car\n#car	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083086068-504330130.mp4"}	2026-02-26 10:48:13.307+05:30	2026-02-26 10:48:13.307+05:30
396	HASHTAG	0	#car	{"postCount": 1}	2026-02-26 10:48:13.332+05:30	2026-02-26 10:48:13.332+05:30
397	POST	2081	test video1	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083129771-421848745.mp4"}	2026-02-26 10:48:51.837+05:30	2026-02-26 10:48:51.837+05:30
398	POST	2082	akbar post 1 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083151740-81295609.jpeg"}	2026-02-26 10:49:11.805+05:30	2026-02-26 10:49:11.805+05:30
405	POST	2087	akbar post 4 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083857891-839185541.jpeg"}	2026-02-26 11:00:57.958+05:30	2026-02-26 11:00:57.958+05:30
399	POST	2083	Post#1	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083311074-485773742.jpg"}	2026-02-26 10:51:51.57+05:30	2026-02-26 10:51:51.57+05:30
400	HASHTAG	0	#1	{"postCount": 1}	2026-02-26 10:51:51.596+05:30	2026-02-26 10:51:51.596+05:30
401	POST	2084	Post#2\n	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083331536-854157292.jpg"}	2026-02-26 10:52:14.825+05:30	2026-02-26 10:52:14.825+05:30
402	HASHTAG	0	#2	{"postCount": 1}	2026-02-26 10:52:14.85+05:30	2026-02-26 10:52:14.85+05:30
403	POST	2085	akbar post 2 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083690063-543250713.jpeg"}	2026-02-26 10:58:10.144+05:30	2026-02-26 10:58:10.144+05:30
404	POST	2086	akbar post 3 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083716675-838098669.avif"}	2026-02-26 10:58:36.734+05:30	2026-02-26 10:58:36.734+05:30
371	HASHTAG	0	#nature	{"postCount": 1403}	2026-02-20 09:57:26.666+05:30	2026-02-26 11:03:21.464+05:30
406	POST	2088	akbar post 5 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083881063-328282515.jpeg"}	2026-02-26 11:01:21.149+05:30	2026-02-26 11:01:21.149+05:30
407	POST	2089	akbar post 6 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083903715-137274937.jpg"}	2026-02-26 11:01:43.779+05:30	2026-02-26 11:01:43.779+05:30
408	POST	2090	akbar video post 1 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083946261-787236779.mp4"}	2026-02-26 11:02:26.387+05:30	2026-02-26 11:02:26.387+05:30
410	POST	2091	akbar post 8 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083980441-787963645.jpeg"}	2026-02-26 11:03:00.505+05:30	2026-02-26 11:03:00.505+05:30
374	HASHTAG	0	#fitness	{"postCount": 1538}	2026-02-20 09:57:26.748+05:30	2026-02-26 11:15:37.358+05:30
411	POST	2092	akbar post 9 #nature 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084001350-613838150.jpeg"}	2026-02-26 11:03:21.433+05:30	2026-02-26 11:03:21.433+05:30
413	POST	2093	farhan post 1 #fitness 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084140775-236506375.jpeg"}	2026-02-26 11:05:40.971+05:30	2026-02-26 11:05:40.971+05:30
414	POST	2094	farhan post 2 #fitness 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084224261-370391432.jpeg"}	2026-02-26 11:07:04.328+05:30	2026-02-26 11:07:04.328+05:30
415	POST	2095	farhan post 3 #fitness 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084309680-421094899.jpeg"}	2026-02-26 11:08:29.762+05:30	2026-02-26 11:08:29.762+05:30
416	POST	2096	farhan post 4 #fitness 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084677786-552942004.jpeg"}	2026-02-26 11:14:37.831+05:30	2026-02-26 11:14:37.831+05:30
417	POST	2097	farhan video post 1 #fitness 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084711014-465892621.mp4"}	2026-02-26 11:15:11.126+05:30	2026-02-26 11:15:11.126+05:30
418	POST	2098	farhan post 6 #fitness 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084737294-165056922.jpeg"}	2026-02-26 11:15:37.354+05:30	2026-02-26 11:15:37.354+05:30
420	POST	2099	ashish post 1 #funny	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084844423-656420074.jpeg"}	2026-02-26 11:17:24.449+05:30	2026-02-26 11:17:24.449+05:30
422	POST	2100	ashish post 2 #funny 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084868584-105785180.jpeg"}	2026-02-26 11:17:48.602+05:30	2026-02-26 11:17:48.602+05:30
445	USER	13	tanmay2_4652	{"fullName": "tanmay2_4652"}	2026-03-04 12:14:06.461+05:30	2026-03-04 12:14:06.461+05:30
423	POST	2101	ashish post 3 #funny	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084888572-807098151.jpeg"}	2026-02-26 11:18:08.631+05:30	2026-02-26 11:18:08.631+05:30
451	USER	18	juneadkhan7_4380	{"fullName": "juneadkhan7_4380"}	2026-03-05 14:26:45.109+05:30	2026-03-05 14:26:45.109+05:30
424	POST	2102	ashish video post 1 #funny	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084908242-231424085.mp4"}	2026-02-26 11:18:28.474+05:30	2026-02-26 11:18:28.474+05:30
425	POST	2103	ashish post 5 #funny	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772084935442-859308026.avif"}	2026-02-26 11:18:55.505+05:30	2026-02-26 11:18:55.505+05:30
421	HASHTAG	0	#funny	{"postCount": 5}	2026-02-26 11:17:24.452+05:30	2026-02-26 11:18:55.508+05:30
446	USER	14	tanmay03_6252	{"fullName": "tanmay03_6252"}	2026-03-04 12:42:58.092+05:30	2026-03-04 12:42:58.092+05:30
427	POST	2104	sarfaraz post 1 #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772085094171-555382470.jpeg"}	2026-02-26 11:21:34.293+05:30	2026-02-26 11:21:34.293+05:30
428	POST	2105	sarfaraz post 2 #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772085108823-577876933.avif"}	2026-02-26 11:21:49.006+05:30	2026-02-26 11:21:49.006+05:30
429	POST	2106	sarfaraz post 3 #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772085132202-220817702.jpeg"}	2026-02-26 11:22:12.266+05:30	2026-02-26 11:22:12.266+05:30
452	USER	19	Akshay	{"fullName": "Akshay"}	2026-03-05 14:54:58.395+05:30	2026-03-05 14:54:58.395+05:30
430	POST	2107	sarfaraz post 4 #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772085153529-636697416.avif"}	2026-02-26 11:22:33.607+05:30	2026-02-26 11:22:33.607+05:30
431	POST	2108	sarfaraz video post 1 #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772085179389-285577753.mp4"}	2026-02-26 11:22:59.613+05:30	2026-02-26 11:22:59.613+05:30
379	HASHTAG	0	#fashion	{"postCount": 3126}	2026-02-20 09:57:26.783+05:30	2026-03-06 16:09:43.285+05:30
432	POST	2109	sarfaraz post 6\n #fashion 	{"mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772085203876-53702342.jpeg"}	2026-02-26 11:23:23.94+05:30	2026-02-26 11:23:23.94+05:30
433	USER	1	Irfan	{"fullName": "Irfan", "profilePicture": ""}	2026-02-26 11:29:16.476+05:30	2026-02-26 11:29:16.476+05:30
434	USER	2	must	{"fullName": "must", "profilePicture": ""}	2026-02-26 11:29:16.48+05:30	2026-02-26 11:29:16.48+05:30
435	USER	3	akbar	{"fullName": "akbar", "profilePicture": "/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp"}	2026-02-26 11:29:16.481+05:30	2026-02-26 11:29:16.481+05:30
436	USER	7	sarfarz	{"fullName": "sarfarz", "profilePicture": "/api/v1/media/files/Jaadoe/posts/images/1772085050435-53870855_opt.webp"}	2026-02-26 11:29:16.482+05:30	2026-02-26 11:29:16.482+05:30
437	USER	4	ahad	{"fullName": "ahad", "profilePicture": ""}	2026-02-26 11:29:16.483+05:30	2026-02-26 11:29:16.483+05:30
438	USER	5	farhan	{"fullName": "farhan", "profilePicture": "/api/v1/media/files/Jaadoe/posts/images/1772084049865-897626602_opt.webp"}	2026-02-26 11:29:16.484+05:30	2026-02-26 11:29:16.484+05:30
439	USER	6	ashish	{"fullName": "ashish", "profilePicture": "/api/v1/media/files/Jaadoe/posts/images/1772084806946-33478956_opt.webp"}	2026-02-26 11:29:16.485+05:30	2026-02-26 11:29:16.485+05:30
\.


--
-- Data for Name: Stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Stories" (id, "userId", username, "mediaUrl", "thumbnailUrl", "mediaType", "expiresAt", "viewsCount", "likesCount", "createdAt", "updatedAt") FROM stdin;
99	2	must	/api/v1/media/files/Jaadoe/posts/images/1772179452380-912718022_opt.webp	\N	IMAGE	2026-02-28 13:34:12.483+05:30	0	0	2026-02-27 13:34:12.483+05:30	2026-02-27 13:34:12.898+05:30
4	2	user_test_2	https://picsum.photos/seed/user_test_2_story_0/400/800	\N	IMAGE	2026-01-29 12:00:33.208381+05:30	0	0	2026-01-28 12:00:33.208381+05:30	2026-01-28 12:00:33.208381+05:30
5	2	user_test_2	https://picsum.photos/seed/user_test_2_story_1/400/800	\N	IMAGE	2026-01-29 12:00:33.208771+05:30	0	0	2026-01-28 12:00:33.208771+05:30	2026-01-28 12:00:33.208771+05:30
6	2	user_test_2	https://picsum.photos/seed/user_test_2_story_2/400/800	\N	IMAGE	2026-01-29 12:00:33.209171+05:30	0	0	2026-01-28 12:00:33.209171+05:30	2026-01-28 12:00:33.209171+05:30
7	6	user_test_6	https://picsum.photos/seed/user_test_6_story_0/400/800	\N	IMAGE	2026-01-29 12:00:33.223098+05:30	0	0	2026-01-28 12:00:33.223098+05:30	2026-01-28 12:00:33.223098+05:30
8	7	user_test_7	https://picsum.photos/seed/user_test_7_story_0/400/800	\N	IMAGE	2026-01-29 12:00:33.226799+05:30	0	0	2026-01-28 12:00:33.226799+05:30	2026-01-28 12:00:33.226799+05:30
9	7	user_test_7	https://picsum.photos/seed/user_test_7_story_1/400/800	\N	IMAGE	2026-01-29 12:00:33.227258+05:30	0	0	2026-01-28 12:00:33.227258+05:30	2026-01-28 12:00:33.227258+05:30
101	8	Anu1	/api/v1/media/files/Jaadoe/posts/images/1772429781080-84620795_opt.webp	\N	IMAGE	2026-03-03 11:06:21.367+05:30	0	0	2026-03-02 11:06:21.367+05:30	2026-03-02 11:06:21.871+05:30
102	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772683042406-838950650_opt.webp	\N	IMAGE	2026-03-06 09:27:22.471+05:30	0	0	2026-03-05 09:27:22.471+05:30	2026-03-05 09:27:23.235+05:30
104	6	ashish	/api/v1/media/files/Jaadoe/posts/images/1772683996624-768319442_opt.webp	\N	IMAGE	2026-03-06 09:43:16.657+05:30	0	0	2026-03-05 09:43:16.657+05:30	2026-03-05 09:43:17.166+05:30
100	2	must	/api/v1/media/files/Jaadoe/posts/images/1772429202606-621059287_opt.webp	\N	IMAGE	2026-03-03 10:56:43.171+05:30	0	0	2026-03-02 10:56:43.172+05:30	2026-03-02 10:56:43.404+05:30
103	5	farhan	/api/v1/media/files/Jaadoe/posts/images/1772683892039-701004806_opt.webp	\N	IMAGE	2026-03-06 09:41:32.073+05:30	0	0	2026-03-05 09:41:32.073+05:30	2026-03-05 09:41:33.114+05:30
93	5	farhan	/api/v1/media/files/Jaadoe/posts/images/1772084768919-702333922_opt.webp	\N	IMAGE	2026-02-27 11:16:08.944+05:30	0	0	2026-02-26 11:16:08.945+05:30	2026-02-26 11:16:09.564+05:30
94	6	ashish	/api/v1/media/files/Jaadoe/posts/images/1772084948986-131149382_opt.webp	\N	IMAGE	2026-02-27 11:19:09.026+05:30	0	0	2026-02-26 11:19:09.026+05:30	2026-02-26 11:19:09.62+05:30
95	7	sarfarz	/api/v1/media/files/Jaadoe/posts/images/1772085219870-446592595_opt.webp	\N	IMAGE	2026-02-27 11:23:39.912+05:30	0	0	2026-02-26 11:23:39.912+05:30	2026-02-26 11:23:40.473+05:30
98	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772088348869-350056724_opt.webp	\N	IMAGE	2026-02-27 12:15:48.933+05:30	0	0	2026-02-26 12:15:48.933+05:30	2026-02-26 12:15:49.827+05:30
\.


--
-- Data for Name: StoryReplies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StoryReplies" (id, "storyId", "senderId", content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: StoryReports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StoryReports" (id, "storyId", "reporterId", reason, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: StoryViews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StoryViews" (id, "storyId", "viewerId", "viewedAt", "createdAt", "updatedAt") FROM stdin;
57	100	2	2026-03-02 10:57:14.82+05:30	2026-03-02 10:57:14.82+05:30	2026-03-02 10:57:14.82+05:30
58	101	2	2026-03-02 11:09:48.497+05:30	2026-03-02 11:09:48.497+05:30	2026-03-02 11:09:48.497+05:30
59	101	8	2026-03-02 11:10:51.423+05:30	2026-03-02 11:10:51.423+05:30	2026-03-02 11:10:51.423+05:30
60	100	8	2026-03-02 11:10:56.446+05:30	2026-03-02 11:10:56.446+05:30	2026-03-02 11:10:56.446+05:30
61	102	2	2026-03-05 10:24:10.346+05:30	2026-03-05 10:24:10.346+05:30	2026-03-05 10:24:10.346+05:30
62	103	18	2026-03-05 14:33:37.735+05:30	2026-03-05 14:33:37.735+05:30	2026-03-05 14:33:37.735+05:30
63	102	18	2026-03-05 14:33:40.118+05:30	2026-03-05 14:33:40.118+05:30	2026-03-05 14:33:40.118+05:30
47	96	2	2026-02-26 11:44:49.422+05:30	2026-02-26 11:44:49.422+05:30	2026-02-26 11:44:49.422+05:30
48	97	2	2026-02-26 11:45:59.634+05:30	2026-02-26 11:45:59.634+05:30	2026-02-26 11:45:59.634+05:30
50	98	3	2026-02-26 15:18:02.006+05:30	2026-02-26 15:18:02.006+05:30	2026-02-26 15:18:02.006+05:30
51	98	2	2026-02-27 09:44:35.112+05:30	2026-02-27 09:44:35.113+05:30	2026-02-27 09:44:35.113+05:30
52	99	2	2026-02-27 13:36:48.854+05:30	2026-02-27 13:36:48.854+05:30	2026-02-27 13:36:48.854+05:30
53	99	3	2026-02-28 12:27:20.005+05:30	2026-02-28 12:27:20.005+05:30	2026-02-28 12:27:20.005+05:30
54	6	2	2026-03-02 10:52:27.261+05:30	2026-03-02 10:52:27.261+05:30	2026-03-02 10:52:27.261+05:30
55	5	2	2026-03-02 10:52:29.422+05:30	2026-03-02 10:52:29.422+05:30	2026-03-02 10:52:29.422+05:30
56	4	2	2026-03-02 10:52:30.806+05:30	2026-03-02 10:52:30.806+05:30	2026-03-02 10:52:30.806+05:30
\.


--
-- Data for Name: SystemSettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SystemSettings" (key, value, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: UserInterests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserInterests" ("userId", "interestId", "createdAt", "updatedAt") FROM stdin;
13	1	2026-03-04 12:16:10.801+05:30	2026-03-04 12:16:10.801+05:30
13	2	2026-03-04 12:16:10.801+05:30	2026-03-04 12:16:10.801+05:30
13	6	2026-03-04 12:16:10.801+05:30	2026-03-04 12:16:10.801+05:30
14	6	2026-03-04 12:45:12.047+05:30	2026-03-04 12:45:12.047+05:30
14	2	2026-03-04 12:45:12.047+05:30	2026-03-04 12:45:12.047+05:30
14	1	2026-03-04 12:45:12.047+05:30	2026-03-04 12:45:12.047+05:30
15	6	2026-03-04 12:59:44.431+05:30	2026-03-04 12:59:44.431+05:30
15	3	2026-03-04 12:59:44.431+05:30	2026-03-04 12:59:44.431+05:30
15	2	2026-03-04 12:59:44.431+05:30	2026-03-04 12:59:44.431+05:30
17	2	2026-03-04 13:33:06.357+05:30	2026-03-04 13:33:06.357+05:30
17	8	2026-03-04 13:33:06.357+05:30	2026-03-04 13:33:06.357+05:30
17	7	2026-03-04 13:33:06.357+05:30	2026-03-04 13:33:06.357+05:30
18	1	2026-03-05 14:27:32.285+05:30	2026-03-05 14:27:32.285+05:30
18	2	2026-03-05 14:27:32.285+05:30	2026-03-05 14:27:32.285+05:30
18	5	2026-03-05 14:27:32.285+05:30	2026-03-05 14:27:32.285+05:30
18	6	2026-03-05 14:27:32.285+05:30	2026-03-05 14:27:32.285+05:30
3	2	2026-03-06 10:01:45.157+05:30	2026-03-06 10:01:45.157+05:30
3	6	2026-03-06 10:01:45.157+05:30	2026-03-06 10:01:45.157+05:30
3	9	2026-03-06 10:01:45.157+05:30	2026-03-06 10:01:45.157+05:30
2	7	2026-03-07 10:11:54.279+05:30	2026-03-07 10:11:54.279+05:30
2	9	2026-03-07 10:11:54.279+05:30	2026-03-07 10:11:54.279+05:30
2	8	2026-03-07 10:11:54.279+05:30	2026-03-07 10:11:54.279+05:30
20	3	2026-03-07 10:39:49.155+05:30	2026-03-07 10:39:49.155+05:30
20	7	2026-03-07 10:39:49.155+05:30	2026-03-07 10:39:49.155+05:30
20	8	2026-03-07 10:39:49.155+05:30	2026-03-07 10:39:49.155+05:30
\.


--
-- Data for Name: UserOnboardingEvents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserOnboardingEvents" (id, "userId", "eventType", "completedDate", "createdAt", "updatedAt") FROM stdin;
1	13	completed_onboarding	2026-03-04 12:18:17.622+05:30	2026-03-04 12:18:17.622+05:30	2026-03-04 12:18:17.622+05:30
2	2	completed_onboarding	2026-03-04 12:38:22.609+05:30	2026-03-04 12:38:22.609+05:30	2026-03-04 12:38:22.609+05:30
3	14	completed_onboarding	2026-03-04 12:45:22.886+05:30	2026-03-04 12:45:22.886+05:30	2026-03-04 12:45:22.886+05:30
4	15	completed_onboarding	2026-03-04 12:59:59.843+05:30	2026-03-04 12:59:59.843+05:30	2026-03-04 12:59:59.843+05:30
5	17	completed_onboarding	2026-03-04 13:33:18.825+05:30	2026-03-04 13:33:18.825+05:30	2026-03-04 13:33:18.825+05:30
6	3	completed_onboarding	2026-03-05 09:30:03.831+05:30	2026-03-05 09:30:03.831+05:30	2026-03-05 09:30:03.831+05:30
7	18	completed_onboarding	2026-03-05 14:27:47.145+05:30	2026-03-05 14:27:47.145+05:30	2026-03-05 14:27:47.145+05:30
8	2	completed_onboarding	2026-03-06 09:31:49.807+05:30	2026-03-06 09:31:49.807+05:30	2026-03-06 09:31:49.807+05:30
9	3	completed_onboarding	2026-03-06 10:01:48.955+05:30	2026-03-06 10:01:48.955+05:30	2026-03-06 10:01:48.955+05:30
10	2	completed_onboarding	2026-03-06 11:01:23.896+05:30	2026-03-06 11:01:23.896+05:30	2026-03-06 11:01:23.896+05:30
11	2	completed_onboarding	2026-03-06 11:02:16.871+05:30	2026-03-06 11:02:16.871+05:30	2026-03-06 11:02:16.871+05:30
12	2	completed_onboarding	2026-03-07 10:00:09.19+05:30	2026-03-07 10:00:09.191+05:30	2026-03-07 10:00:09.191+05:30
13	2	completed_onboarding	2026-03-07 10:12:01.608+05:30	2026-03-07 10:12:01.608+05:30	2026-03-07 10:12:01.608+05:30
14	20	completed_onboarding	2026-03-07 10:40:10.098+05:30	2026-03-07 10:40:10.098+05:30	2026-03-07 10:40:10.098+05:30
15	5	completed_onboarding	2026-03-07 12:02:08.348+05:30	2026-03-07 12:02:08.348+05:30	2026-03-07 12:02:08.348+05:30
\.


--
-- Data for Name: UserProfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserProfiles" (id, "userId", username, "fullName", bio, "profilePicture", website, gender, "isPrivate", "showAccountSuggestions", "allowSearchIndexing", "followersCount", "followingCount", "postCount", country, "loginProvider", "accountStatus", "createdAt", "updatedAt", "birthDate", "isBirthdatePublic", "onboardingCompleted", "onboardingStep", "tutorialCompleted", "notificationsEnabled", "accountType", "displayName", pronouns, "pronounVisibility", "categoryId", "contactEmail", "contactPhone", "contactAddress", "avatarType", "avatarUrl", "followersVisibility") FROM stdin;
5	5	farhan	farhan	\N	/api/v1/media/files/Jaadoe/posts/images/1772084049865-897626602_opt.webp	\N	\N	f	t	t	8	2	6	Unknown	email	active	2026-02-26 11:04:01.247+05:30	2026-03-07 12:02:08.339+05:30	\N	f	t	7	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
9	9	irfan1	irfan1		/api/v1/media/files/Jaadoe/temp/1772434501630-533627449.jpg		Male	f	t	t	0	1	0	Unknown	email	active	2026-03-02 12:09:12.75+05:30	2026-03-02 12:25:06.305+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
8	8	Anu1	Anu1	\N		\N	\N	f	t	t	1	4	0	Unknown	email	active	2026-03-02 11:05:14.701+05:30	2026-03-02 12:27:51.445+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
14	14	tanmay_03	tanmay girkar 2	\N		\N	\N	f	t	t	0	1	0	Unknown	email	active	2026-03-04 12:42:58.13+05:30	2026-03-04 12:45:22.874+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
11	11	abuzar	abuzar	\N		\N	\N	f	t	t	0	0	0	Unknown	email	active	2026-03-04 09:08:31.369+05:30	2026-03-04 09:08:31.369+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
6	6	ashish	ashish	\N	/api/v1/media/files/Jaadoe/posts/images/1772084806946-33478956_opt.webp	\N	\N	f	t	t	1	2	5	Unknown	email	active	2026-02-26 11:16:36.878+05:30	2026-02-26 12:16:07.045+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
12	12	tanmay_8470	tanmay_8470	\N		\N	\N	f	t	t	0	0	0	Unknown	email	active	2026-03-04 11:42:31.913+05:30	2026-03-04 11:42:31.913+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
15	15	tanmay04	tanmay04_1074	\N		\N	\N	f	t	t	0	1	0	Unknown	email	active	2026-03-04 12:50:42.513+05:30	2026-03-04 12:59:59.831+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
17	16	testuser_1772610253864	Test User	\N		\N	\N	f	t	t	0	0	0	Unknown	email	banned	2026-03-04 13:14:14.13+05:30	2026-03-04 13:14:16.051+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
13	13	tanmay_01	Tanmay girkar	\N		\N	\N	f	t	t	0	0	0	Unknown	email	active	2026-03-04 12:14:06.489+05:30	2026-03-04 12:18:17.613+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
10	10	shahbaazk	shahbaazk	\N		\N	\N	f	t	t	4	1	0	Unknown	email	active	2026-03-02 12:10:33.793+05:30	2026-03-05 14:27:41.005+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
7	7	sarfarz	sarfarz	\N	/api/v1/media/files/Jaadoe/posts/images/1772085050435-53870855_opt.webp	\N	\N	f	t	t	2	2	6	Unknown	email	active	2026-02-26 11:20:42.857+05:30	2026-03-05 14:27:42.577+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
20	18	juneadkhan	mohammed junaid	\N		\N	\N	f	t	t	0	5	0	Unknown	email	active	2026-03-05 14:26:45.147+05:30	2026-03-05 14:31:07.941+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
22	19	Akshay	Akshay	\N		\N	\N	f	t	t	1	0	0	Unknown	email	active	2026-03-05 14:54:58.427+05:30	2026-03-05 15:26:40.012+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
3	3	akbar	Akbar Khan	\N	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	\N	\N	f	t	t	9	4	11	Unknown	email	active	2026-02-26 10:44:52.273+05:30	2026-03-07 10:39:52.597+05:30	2000-05-09	f	t	7	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
18	17	ashish_02	Ashish Aspire	\N		\N	\N	f	t	t	2	0	0	Unknown	email	active	2026-03-04 13:30:29.191+05:30	2026-03-07 10:40:03.964+05:30	\N	f	f	1	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
2	2	must1	mustafa	noi;ni'		\N	\N	f	t	f	4	5	4	Unknown	email	active	2026-02-25 10:09:22.308+05:30	2026-03-07 10:40:05.435+05:30	4241-05-04	f	t	7	f	f	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
89	20	taleem_01	taleem khan	\N		\N	\N	f	t	t	0	4	0	Unknown	email	active	2026-03-07 10:39:00.67+05:30	2026-03-07 10:40:10.089+05:30	2002-05-05	f	t	7	f	t	personal	\N	\N	Everyone	\N	\N	\N	\N	image	\N	Everyone
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, email, password, "createdAt", "resetToken", "resetTokenExpiry", "updatedAt") FROM stdin;
3	akbar	akbar@example.com	$2b$10$rdd6tz8g2aKmqAY6tey6YeAFMI7iRKsybkDMwNfmlseZ4cEr6kuDe	2026-02-26 10:44:52.228+05:30	\N	\N	2026-02-26 10:44:52.228+05:30
5	farhan	farhan@example.com	$2b$10$DidBRikKOZFAve2GqRcy4.lDu5rw1Pv/i5SbMX2z6EC4iFl3kMG3u	2026-02-26 11:04:01.211+05:30	\N	\N	2026-02-26 11:04:01.211+05:30
6	ashish	ashish@example.com	$2b$10$gGuSWKIY2gtcSnNPNqgMpOi9uwr8e9Y95eNF8FQ4r32HAi7ql.RHK	2026-02-26 11:16:36.87+05:30	\N	\N	2026-02-26 11:16:36.87+05:30
7	sarfarz	sarfaraz@example.com	$2b$10$stz.5fgwNsAfopxqDd3nO.4bvHEs.TUcw3oY5v1ocR922.x18o1P2	2026-02-26 11:20:42.81+05:30	\N	\N	2026-02-26 11:20:42.81+05:30
2	must	must@example.com	$2b$10$GP1T5Up1Ni/BRD7oZfr30ONYewOjRDkZEBKAk941yBP4N1wSNqTnO	2026-02-25 10:09:22.129+05:30	\N	\N	2026-02-27 16:08:53.309+05:30
8	Anu1	abu@example.com	$2b$10$2ML32BRlyXGY/kLOVy7fI...1BpTkXHJbzqOiEkineuq.8fcmZQau	2026-03-02 11:05:14.649+05:30	\N	\N	2026-03-02 11:05:14.65+05:30
9	irfan1	irfan1@gmail.com	$2b$10$K9Z.z.unVao.FUgPlq5JcOfl9hR16ZFxOMOPtDH6u8ji3IvnhlD0S	2026-03-02 12:09:12.71+05:30	\N	\N	2026-03-02 12:09:12.71+05:30
10	shahbaazk	shahbaaz@example.com	$2b$10$cIsCXH5RuLO7Yt5BsPTq5.3Sc6HKp0Ff4JbKo9x2QYwnm59wfUc0C	2026-03-02 12:10:33.757+05:30	\N	\N	2026-03-02 12:10:33.757+05:30
11	abuzar	1234567891	$2b$10$VCxFnazJ4KzBJahoYyJ0JevfN8UsgcKOYGbR5K.Sv02pXW0GjC/wW	2026-03-04 09:08:31.325+05:30	\N	\N	2026-03-04 09:08:31.325+05:30
12	tanmay_8470	tanmay@example.com	$2b$10$YbEzmtWFhm9a2IRbElVFeuNRMKrSEyy7VQqn7CtxgLBQ5qvny0ZwW	2026-03-04 11:42:31.861+05:30	\N	\N	2026-03-04 11:42:31.861+05:30
13	tanmay2_4652	tanmay2@example.com	$2b$10$RTvnHg3efx7q2Zcs/dFagOWig78tUPCagDtk3SyAnBC6BNVncOyyK	2026-03-04 12:14:06.445+05:30	\N	\N	2026-03-04 12:14:06.446+05:30
14	tanmay03_6252	tanmay03@example.com	$2b$10$sZn2Ztia.1i1/wQ5JtuWZOq.hWIHBiN83.hLM4KEHeCEDbxIMp3GK	2026-03-04 12:42:58.087+05:30	\N	\N	2026-03-04 12:42:58.087+05:30
15	tanmay04_1074	tanmay04@example.com	$2b$10$lWKR4oFsQqTuIrFGIjYcMuLE.hM/BVUm8X9VMo80CsEHnC5kWUfne	2026-03-04 12:50:42.495+05:30	\N	\N	2026-03-04 12:50:42.495+05:30
16	testuser_1772610253864	test_1772610253864@example.com	$2b$10$PYcz8JYDKKwijaF0BCq/guH0YOPdYNxOGtFxx0pCS0/3yYVO2aoKy	2026-03-04 13:14:14.079+05:30	\N	\N	2026-03-04 13:14:14.08+05:30
17	ashish02_3137	ashish02@example.com	$2b$10$JgxJ.Xcu677MmHIa7AAzjuLo2TbSUgkI/FzXR.IIqLVsJQ7/WpKA6	2026-03-04 13:30:29.145+05:30	\N	\N	2026-03-04 13:30:29.145+05:30
18	juneadkhan7_4380	juneadkhan7@gmail.com	$2b$10$1KY4Zxvc4RRVU2bEq8IzN.P3oNTBKmdM9k64dSe33ImONLpcCHf2K	2026-03-05 14:26:45.064+05:30	\N	\N	2026-03-05 14:26:45.067+05:30
19	Akshay	Akshay@example.com	$2b$10$4O08q/9jPlfyKyGKGoDs8ua6NtoEOWLtlxjHF6WSyBa4V6OS4nzAC	2026-03-05 14:54:58.386+05:30	\N	\N	2026-03-05 14:54:58.386+05:30
20	taleem_4160	taleem@example.com	$2b$10$t8.YjCV3Orl6M4zzfuEjWufx9xyJ2GVlm7k.H8eWFNf3m.xck9Ava	2026-03-07 10:39:00.578+05:30	\N	\N	2026-03-07 10:39:00.578+05:30
\.


--
-- Data for Name: account_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_history (id, user_id, action, old_value, new_value, "createdAt", "updatedAt") FROM stdin;
1	51	PROFILE_PHOTO_CHANGE		/uploads/1769766144138-564040691.png	2026-01-30 15:12:24.524+05:30	2026-01-30 15:12:24.524+05:30
2	51	BIO_CHANGE	\N		2026-01-30 15:12:30.615+05:30	2026-01-30 15:12:30.615+05:30
3	51	WEBSITE_CHANGE	\N		2026-01-30 15:12:30.615+05:30	2026-01-30 15:12:30.615+05:30
4	51	GENDER_CHANGE	\N	Male	2026-01-30 15:12:30.615+05:30	2026-01-30 15:12:30.615+05:30
5	51	BIO_CHANGE		this is dummy user description	2026-01-30 17:14:24.253+05:30	2026-01-30 17:14:24.253+05:30
6	51	PROFILE_PHOTO_CHANGE	/uploads/1769766144138-564040691.png	/uploads/1769773497246-594244380.jpg	2026-01-30 17:14:57.514+05:30	2026-01-30 17:14:57.514+05:30
7	55	PROFILE_PHOTO_CHANGE		https://i.pravatar.cc/300?u=1770029266656	2026-02-02 16:17:46.773+05:30	2026-02-02 16:17:46.773+05:30
8	55	PROFILE_PHOTO_CHANGE	https://i.pravatar.cc/300?u=1770029266656	https://i.pravatar.cc/300?u=1770029282465	2026-02-02 16:18:02.549+05:30	2026-02-02 16:18:02.549+05:30
9	55	PROFILE_PHOTO_REMOVED	https://i.pravatar.cc/300?u=1770029282465		2026-02-02 16:18:10.487+05:30	2026-02-02 16:18:10.487+05:30
10	55	PROFILE_PHOTO_CHANGE		/uploads/1770029301797-89875618.jpg	2026-02-02 16:18:21.837+05:30	2026-02-02 16:18:21.837+05:30
11	55	BIO_CHANGE	\N		2026-02-02 16:18:26.235+05:30	2026-02-02 16:18:26.235+05:30
12	55	WEBSITE_CHANGE	\N		2026-02-02 16:18:26.235+05:30	2026-02-02 16:18:26.235+05:30
13	55	GENDER_CHANGE	\N	Male	2026-02-02 16:18:26.235+05:30	2026-02-02 16:18:26.235+05:30
14	51	BIO_CHANGE	this is dummy user description	This is dummy user description	2026-02-09 14:49:52.911+05:30	2026-02-09 14:49:52.911+05:30
15	51	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-02-09 15:55:10.918+05:30	2026-02-09 15:55:10.918+05:30
16	51	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-02-09 16:06:50.244+05:30	2026-02-09 16:06:50.244+05:30
17	51	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-02-09 16:06:56.641+05:30	2026-02-09 16:06:56.641+05:30
18	51	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-02-09 16:07:14.731+05:30	2026-02-09 16:07:14.731+05:30
19	51	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-02-09 16:07:20.584+05:30	2026-02-09 16:07:20.584+05:30
20	51	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-02-10 12:55:00.662+05:30	2026-02-10 12:55:00.662+05:30
21	76	PROFILE_PHOTO_REMOVED			2026-02-11 10:33:12.361+05:30	2026-02-11 10:33:12.361+05:30
22	76	PROFILE_PHOTO_CHANGE		\N	2026-02-11 10:33:12.479+05:30	2026-02-11 10:33:12.479+05:30
23	75	PROFILE_PHOTO_REMOVED			2026-02-11 11:44:21.166+05:30	2026-02-11 11:44:21.166+05:30
24	75	PROFILE_PHOTO_CHANGE		\N	2026-02-11 11:44:21.26+05:30	2026-02-11 11:44:21.26+05:30
25	75	PROFILE_PHOTO_REMOVED			2026-02-11 12:07:53.916+05:30	2026-02-11 12:07:53.916+05:30
26	75	PROFILE_PHOTO_CHANGE		\N	2026-02-11 12:07:54.01+05:30	2026-02-11 12:07:54.01+05:30
27	75	PROFILE_PHOTO_REMOVED			2026-02-11 12:30:32.008+05:30	2026-02-11 12:30:32.008+05:30
28	75	PROFILE_PHOTO_CHANGE		\N	2026-02-11 12:30:32.129+05:30	2026-02-11 12:30:32.129+05:30
29	75	PROFILE_PHOTO_REMOVED			2026-02-11 13:25:25.342+05:30	2026-02-11 13:25:25.342+05:30
30	75	PROFILE_PHOTO_CHANGE		\N	2026-02-11 13:25:25.552+05:30	2026-02-11 13:25:25.552+05:30
31	75	PROFILE_PHOTO_REMOVED			2026-02-11 15:45:20.771+05:30	2026-02-11 15:45:20.771+05:30
32	75	PROFILE_PHOTO_CHANGE		\N	2026-02-11 15:45:20.898+05:30	2026-02-11 15:45:20.898+05:30
33	75	PROFILE_PHOTO_CHANGE		\N	2026-02-11 16:16:00.145+05:30	2026-02-11 16:16:00.145+05:30
34	75	PROFILE_PHOTO_REMOVED			2026-02-11 16:16:00.243+05:30	2026-02-11 16:16:00.243+05:30
35	75	PROFILE_PHOTO_CHANGE		\N	2026-02-11 17:50:09.277+05:30	2026-02-11 17:50:09.277+05:30
36	75	PROFILE_PHOTO_REMOVED			2026-02-11 17:50:14.656+05:30	2026-02-11 17:50:14.656+05:30
37	86	PROFILE_PHOTO_CHANGE		/uploads/1770967581888-402268061.png	2026-02-13 12:56:22.21+05:30	2026-02-13 12:56:22.21+05:30
38	86	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-02-13 13:03:17.703+05:30	2026-02-13 13:03:17.703+05:30
39	86	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-02-13 13:03:25.616+05:30	2026-02-13 13:03:25.616+05:30
40	75	PROFILE_PHOTO_REMOVED			2026-02-13 17:59:22.39+05:30	2026-02-13 17:59:22.39+05:30
41	75	PROFILE_PHOTO_REMOVED			2026-02-13 18:16:20.872+05:30	2026-02-13 18:16:20.872+05:30
42	51	NAME_CHANGE	akbar	Loading...akbar	2026-02-15 17:47:58.732+05:30	2026-02-15 17:47:58.732+05:30
43	51	BIO_CHANGE	This is dummy user description	...akbar	2026-02-15 17:47:58.732+05:30	2026-02-15 17:47:58.732+05:30
44	51	USERNAME_CHANGE	akbar	...akbar	2026-02-15 17:47:58.732+05:30	2026-02-15 17:47:58.732+05:30
45	51	NAME_CHANGE	Loading...akbar	akbar	2026-02-15 17:52:10.001+05:30	2026-02-15 17:52:10.001+05:30
46	51	BIO_CHANGE	...akbar	akbar	2026-02-15 17:52:10.001+05:30	2026-02-15 17:52:10.001+05:30
47	51	USERNAME_CHANGE	...akbar	akbar	2026-02-15 17:52:10.001+05:30	2026-02-15 17:52:10.001+05:30
48	112	BIO_CHANGE	\N	tanmay	2026-02-15 17:54:20.681+05:30	2026-02-15 17:54:20.681+05:30
49	117	BIO_CHANGE	Official account of user_117	Updated via Integration Test	2026-02-16 10:55:08.991+05:30	2026-02-16 10:55:08.991+05:30
50	118	BIO_CHANGE	Official account of creator_118	Updated via Integration Test	2026-02-16 10:55:29.476+05:30	2026-02-16 10:55:29.476+05:30
51	119	BIO_CHANGE	Official account of user_119	Updated via Integration Test	2026-02-16 10:57:34.258+05:30	2026-02-16 10:57:34.258+05:30
52	120	BIO_CHANGE	Official account of user_120	Updated via Integration Test	2026-02-16 10:57:53.802+05:30	2026-02-16 10:57:53.802+05:30
53	121	BIO_CHANGE	Official account of user_121	Verified via Report Generator	2026-02-16 11:00:43.481+05:30	2026-02-16 11:00:43.481+05:30
54	122	BIO_CHANGE	Official account of user_122	Updated via Integration Test	2026-02-16 11:04:00.003+05:30	2026-02-16 11:04:00.003+05:30
55	123	BIO_CHANGE	Official account of user_123	Updated via Integration Test	2026-02-16 11:04:31.185+05:30	2026-02-16 11:04:31.185+05:30
56	124	BIO_CHANGE	Official account of user_124	Updated via Integration Test	2026-02-16 11:07:49.68+05:30	2026-02-16 11:07:49.68+05:30
57	112	PROFILE_PHOTO_CHANGE		\N	2026-02-16 12:30:37.877+05:30	2026-02-16 12:30:37.877+05:30
58	112	BIO_CHANGE	tanmay	tanmay1	2026-02-16 12:31:38.879+05:30	2026-02-16 12:31:38.879+05:30
59	112	USERNAME_CHANGE	tanmay	tanmay1	2026-02-16 12:31:38.879+05:30	2026-02-16 12:31:38.879+05:30
60	112	PROFILE_PHOTO_REMOVED			2026-02-16 12:37:05.626+05:30	2026-02-16 12:37:05.626+05:30
61	112	PROFILE_PHOTO_CHANGE		\N	2026-02-16 12:37:05.693+05:30	2026-02-16 12:37:05.693+05:30
62	112	PROFILE_PHOTO_CHANGE		\N	2026-02-16 12:43:02.802+05:30	2026-02-16 12:43:02.802+05:30
63	112	PROFILE_PHOTO_REMOVED			2026-02-16 12:57:43.738+05:30	2026-02-16 12:57:43.738+05:30
64	112	PROFILE_PHOTO_CHANGE		\N	2026-02-16 12:57:43.802+05:30	2026-02-16 12:57:43.802+05:30
65	112	PROFILE_PHOTO_REMOVED			2026-02-16 13:15:07.963+05:30	2026-02-16 13:15:07.963+05:30
66	112	PROFILE_PHOTO_CHANGE		\N	2026-02-16 13:15:08.03+05:30	2026-02-16 13:15:08.03+05:30
67	125	PROFILE_PHOTO_REMOVED	https://ui-avatars.com/api/?name=user_125&background=random		2026-02-16 13:28:38.632+05:30	2026-02-16 13:28:38.632+05:30
68	125	PROFILE_PHOTO_CHANGE		\N	2026-02-16 13:28:38.742+05:30	2026-02-16 13:28:38.742+05:30
69	126	PROFILE_PHOTO_REMOVED	https://ui-avatars.com/api/?name=creator_126&background=random		2026-02-16 13:28:55.379+05:30	2026-02-16 13:28:55.379+05:30
70	126	PROFILE_PHOTO_CHANGE		\N	2026-02-16 13:28:55.469+05:30	2026-02-16 13:28:55.469+05:30
71	127	PROFILE_PHOTO_REMOVED	https://ui-avatars.com/api/?name=creator_127&background=random		2026-02-16 13:42:41.712+05:30	2026-02-16 13:42:41.712+05:30
72	127	PROFILE_PHOTO_CHANGE		\N	2026-02-16 13:42:41.775+05:30	2026-02-16 13:42:41.775+05:30
73	128	PROFILE_PHOTO_REMOVED	https://ui-avatars.com/api/?name=user_128&background=random		2026-02-16 13:45:25.088+05:30	2026-02-16 13:45:25.088+05:30
74	128	PROFILE_PHOTO_CHANGE		\N	2026-02-16 13:45:25.153+05:30	2026-02-16 13:45:25.153+05:30
75	112	NAME_CHANGE	tanmay	tanmay1	2026-02-16 18:24:38.347+05:30	2026-02-16 18:24:38.347+05:30
76	112	NAME_CHANGE	tanmay1	tanmay13	2026-02-16 18:34:28.507+05:30	2026-02-16 18:34:28.507+05:30
77	112	PROFILE_PHOTO_REMOVED			2026-02-17 10:42:05.823+05:30	2026-02-17 10:42:05.823+05:30
78	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 10:42:05.86+05:30	2026-02-17 10:42:05.86+05:30
79	112	BIO_CHANGE	tanmay1	Audited	2026-02-17 10:42:05.891+05:30	2026-02-17 10:42:05.891+05:30
80	112	PROFILE_PHOTO_REMOVED			2026-02-17 11:15:59.098+05:30	2026-02-17 11:15:59.098+05:30
81	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 11:15:59.158+05:30	2026-02-17 11:15:59.158+05:30
82	112	PROFILE_PHOTO_REMOVED			2026-02-17 11:18:56.71+05:30	2026-02-17 11:18:56.71+05:30
83	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 11:18:56.74+05:30	2026-02-17 11:18:56.74+05:30
84	112	PROFILE_PHOTO_REMOVED			2026-02-17 11:21:52.016+05:30	2026-02-17 11:21:52.016+05:30
85	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 11:21:52.041+05:30	2026-02-17 11:21:52.041+05:30
86	112	PROFILE_PHOTO_REMOVED			2026-02-17 11:57:44.683+05:30	2026-02-17 11:57:44.683+05:30
87	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 11:57:44.714+05:30	2026-02-17 11:57:44.714+05:30
88	112	PROFILE_PHOTO_REMOVED			2026-02-17 12:07:13.236+05:30	2026-02-17 12:07:13.236+05:30
89	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 12:07:13.258+05:30	2026-02-17 12:07:13.258+05:30
90	112	PROFILE_PHOTO_REMOVED			2026-02-17 12:07:46.805+05:30	2026-02-17 12:07:46.805+05:30
91	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 12:07:47.071+05:30	2026-02-17 12:07:47.071+05:30
92	112	PROFILE_PHOTO_REMOVED			2026-02-17 12:08:35.238+05:30	2026-02-17 12:08:35.238+05:30
93	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 12:08:35.272+05:30	2026-02-17 12:08:35.272+05:30
94	112	PROFILE_PHOTO_REMOVED			2026-02-17 13:49:03.65+05:30	2026-02-17 13:49:03.65+05:30
95	112	PROFILE_PHOTO_CHANGE		\N	2026-02-17 13:49:03.681+05:30	2026-02-17 13:49:03.681+05:30
96	112	NAME_CHANGE	tanmay13	Tanmay Audit	2026-02-17 13:49:03.711+05:30	2026-02-17 13:49:03.711+05:30
97	112	NAME_CHANGE	Tanmay Audit	Tanmay	2026-02-19 11:49:09.688+05:30	2026-02-19 11:49:09.688+05:30
98	112	BIO_CHANGE	Audited	Sukun	2026-02-19 11:49:09.688+05:30	2026-02-19 11:49:09.688+05:30
99	112	USERNAME_CHANGE	tanmay1	tanmay	2026-02-19 11:49:30.996+05:30	2026-02-19 11:49:30.996+05:30
100	112	PROFILE_PHOTO_REMOVED			2026-02-19 13:27:37.534+05:30	2026-02-19 13:27:37.534+05:30
101	112	PROFILE_PHOTO_CHANGE		\N	2026-02-19 13:27:37.575+05:30	2026-02-19 13:27:37.575+05:30
102	112	BIO_CHANGE	Sukun	Audited	2026-02-19 13:27:37.607+05:30	2026-02-19 13:27:37.607+05:30
103	112	PROFILE_PHOTO_CHANGE		\N	2026-02-20 10:18:11.488+05:30	2026-02-20 10:18:11.488+05:30
104	105	PROFILE_PHOTO_CHANGE	https://ui-avatars.com/api/?name=user_105&background=random	https://i.pravatar.cc/300?u=1771563078613	2026-02-20 10:21:18.747+05:30	2026-02-20 10:21:18.747+05:30
105	105	PROFILE_PHOTO_REMOVED	https://i.pravatar.cc/300?u=1771563078613		2026-02-20 10:21:29.45+05:30	2026-02-20 10:21:29.45+05:30
107	105	WEBSITE_CHANGE	\N		2026-02-20 10:21:55.48+05:30	2026-02-20 10:21:55.48+05:30
108	105	GENDER_CHANGE	\N	Male	2026-02-20 10:21:55.48+05:30	2026-02-20 10:21:55.48+05:30
110	105	PROFILE_PHOTO_CHANGE		https://i.pravatar.cc/300?u=1771563130116	2026-02-20 10:22:10.208+05:30	2026-02-20 10:22:10.208+05:30
111	105	PROFILE_PHOTO_REMOVED	https://i.pravatar.cc/300?u=1771563130116		2026-02-20 11:05:00.184+05:30	2026-02-20 11:05:00.184+05:30
112	105	PROFILE_PHOTO_CHANGE		https://i.pravatar.cc/300?u=1771565718702	2026-02-20 11:05:18.874+05:30	2026-02-20 11:05:18.874+05:30
113	105	PROFILE_PHOTO_REMOVED	https://i.pravatar.cc/300?u=1771565718702		2026-02-20 11:09:38.638+05:30	2026-02-20 11:09:38.638+05:30
114	105	PROFILE_PHOTO_CHANGE		https://i.pravatar.cc/300?u=1771565991847	2026-02-20 11:09:52.048+05:30	2026-02-20 11:09:52.048+05:30
115	105	PROFILE_PHOTO_REMOVED	https://i.pravatar.cc/300?u=1771565991847		2026-02-20 11:35:27.279+05:30	2026-02-20 11:35:27.279+05:30
117	51	PROFILE_PHOTO_CHANGE	/uploads/1769773497246-594244380.jpg	\N	2026-02-20 12:18:28.374+05:30	2026-02-20 12:18:28.374+05:30
118	51	PROFILE_PHOTO_CHANGE	/uploads/1769773497246-594244380.jpg	\N	2026-02-20 12:18:55.642+05:30	2026-02-20 12:18:55.642+05:30
119	51	PROFILE_PHOTO_CHANGE	/uploads/1769773497246-594244380.jpg	\N	2026-02-20 12:23:27.986+05:30	2026-02-20 12:23:27.986+05:30
109	105	PROFILE_PHOTO_REMOVED	/api/v1/media/files/Jaadoe/temp/1771563110266-228843364.jpg		2026-02-20 10:22:03.3+05:30	2026-02-20 10:22:03.3+05:30
120	105	PROFILE_PHOTO_REMOVED	/api/v1/media/files/Jaadoe/temp/1771567552959-387684980.jpg		2026-02-21 10:55:19.108+05:30	2026-02-21 10:55:19.108+05:30
106	105	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1771563110266-228843364.jpg	2026-02-20 10:21:50.745+05:30	2026-02-20 10:21:50.745+05:30
116	105	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1771567552959-387684980.jpg	2026-02-20 11:35:54.035+05:30	2026-02-20 11:35:54.035+05:30
121	105	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1771651527809-120079912.jpg	2026-02-21 10:55:27.959+05:30	2026-02-21 10:55:27.959+05:30
122	5	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1772084049865-897626602.jpeg	2026-02-26 11:04:09.908+05:30	2026-02-26 11:04:09.908+05:30
123	6	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1772084806946-33478956.avif	2026-02-26 11:16:47.006+05:30	2026-02-26 11:16:47.006+05:30
124	7	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1772085050435-53870855.jpeg	2026-02-26 11:20:50.48+05:30	2026-02-26 11:20:50.48+05:30
125	2	BIO_CHANGE	\N	test user1	2026-02-27 10:19:26.107+05:30	2026-02-27 10:19:26.107+05:30
126	2	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1772425504488-766410392.jpg	2026-03-02 09:55:04.575+05:30	2026-03-02 09:55:04.575+05:30
127	2	PROFILE_PHOTO_REMOVED	/api/v1/media/files/Jaadoe/posts/images/1772425504488-766410392_opt.webp		2026-03-02 09:55:08.449+05:30	2026-03-02 09:55:08.449+05:30
128	9	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1772434501630-533627449.jpg	2026-03-02 12:25:04.177+05:30	2026-03-02 12:25:04.177+05:30
129	9	BIO_CHANGE	\N		2026-03-02 12:25:04.185+05:30	2026-03-02 12:25:04.185+05:30
130	9	WEBSITE_CHANGE	\N		2026-03-02 12:25:04.185+05:30	2026-03-02 12:25:04.185+05:30
131	9	GENDER_CHANGE	\N	Male	2026-03-02 12:25:04.185+05:30	2026-03-02 12:25:04.185+05:30
132	9	PROFILE_PHOTO_CHANGE	/api/v1/media/files/Jaadoe/temp/1772434501630-533627449.jpg		2026-03-02 12:25:04.185+05:30	2026-03-02 12:25:04.185+05:30
133	9	PROFILE_PHOTO_CHANGE		/api/v1/media/files/Jaadoe/temp/1772434501630-533627449.jpg	2026-03-02 12:25:06.306+05:30	2026-03-02 12:25:06.306+05:30
134	2	BIO_CHANGE	test user1	noi;ni'	2026-03-04 13:56:52.092+05:30	2026-03-04 13:56:52.092+05:30
135	2	USERNAME_CHANGE	must1	must	2026-03-04 13:56:52.092+05:30	2026-03-04 13:56:52.092+05:30
136	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 10:26:46.211+05:30	2026-03-05 10:26:46.211+05:30
137	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-05 10:27:42.969+05:30	2026-03-05 10:27:42.969+05:30
138	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 10:27:45.899+05:30	2026-03-05 10:27:45.899+05:30
139	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-05 10:27:48.395+05:30	2026-03-05 10:27:48.395+05:30
140	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 10:38:06.885+05:30	2026-03-05 10:38:06.885+05:30
141	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-05 10:38:51.323+05:30	2026-03-05 10:38:51.323+05:30
142	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 10:39:14.805+05:30	2026-03-05 10:39:14.805+05:30
143	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-05 10:41:06.131+05:30	2026-03-05 10:41:06.131+05:30
144	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 10:41:08.481+05:30	2026-03-05 10:41:08.481+05:30
145	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-05 10:48:17.419+05:30	2026-03-05 10:48:17.419+05:30
146	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 10:50:56.289+05:30	2026-03-05 10:50:56.289+05:30
147	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-05 11:21:29.447+05:30	2026-03-05 11:21:29.447+05:30
148	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 14:46:03.698+05:30	2026-03-05 14:46:03.698+05:30
149	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-05 14:46:05.214+05:30	2026-03-05 14:46:05.214+05:30
150	2	PRIVACY_CHANGE	PUBLIC	PRIVATE	2026-03-05 14:58:54.286+05:30	2026-03-05 14:58:54.286+05:30
151	2	PRIVACY_CHANGE	PRIVATE	PUBLIC	2026-03-06 12:24:03.919+05:30	2026-03-06 12:24:03.919+05:30
\.


--
-- Data for Name: account_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_metrics (id, "userId", date, "totalReach", "totalEngaged", "profileVisits", "newFollowers", "lostFollowers", "followersFromPosts", "followersFromAds", "createdAt", "updatedAt") FROM stdin;
5cb04c9f-febe-4252-84eb-cdd480149c87	10	2026-03-05	0	0	0	1	0	0	0	2026-03-05 14:27:41.012+05:30	2026-03-05 14:27:41.014+05:30
4f7918ff-a8ee-4551-845e-0cd234ae76f4	7	2026-03-05	0	0	0	1	0	0	0	2026-03-05 14:27:42.583+05:30	2026-03-05 14:27:42.585+05:30
942a1aaa-7dd8-469a-9b5b-69fbc28601b2	2	2026-03-05	0	0	0	2	0	0	0	2026-03-05 14:27:41.767+05:30	2026-03-05 14:56:28.4+05:30
6cb1f049-c617-4407-a7ac-cb9e3130123b	3	2026-03-05	0	0	0	2	0	0	0	2026-03-05 14:27:39.189+05:30	2026-03-05 15:18:37.617+05:30
6a82ed19-bb24-49cd-8ecb-2f4bd6794ffe	5	2026-03-05	0	0	0	2	0	0	0	2026-03-05 14:27:40.151+05:30	2026-03-05 15:18:44.725+05:30
6c3cd730-d7b7-4264-a9a7-9867177c87f6	17	2026-03-05	0	0	0	1	0	0	0	2026-03-05 15:18:56.011+05:30	2026-03-05 15:18:56.015+05:30
0046cb17-8726-4f75-8e49-2b8546a9a5b5	3	2026-03-07	0	0	0	1	0	0	0	2026-03-07 10:39:52.631+05:30	2026-03-07 10:39:52.637+05:30
2bb270c9-d633-4d35-b9f0-85352e219b07	5	2026-03-07	0	0	0	1	0	0	0	2026-03-07 10:40:01.526+05:30	2026-03-07 10:40:01.528+05:30
6dc57609-c75f-4181-93b6-f83e78b7f6b0	17	2026-03-07	0	0	0	1	0	0	0	2026-03-07 10:40:03.969+05:30	2026-03-07 10:40:03.971+05:30
5b4f64a1-e868-4755-b599-52c9353029c6	2	2026-03-07	0	0	0	1	0	0	0	2026-03-07 10:40:05.44+05:30	2026-03-07 10:40:05.441+05:30
c95c1619-cd38-45bd-8047-a41e9fa8c391	51	2026-02-09	0	0	0	1	0	0	0	2026-02-09 11:05:09.836+05:30	2026-02-09 11:05:09.87+05:30
8f9b7772-dad0-46f5-863c-852d18396266	10	2026-02-10	0	0	0	1	0	0	0	2026-02-10 13:27:26.872+05:30	2026-02-10 13:27:26.933+05:30
18f8b51b-f63b-4bf3-a5df-cadbf1a177a9	1007	2026-02-10	0	0	0	1	0	0	0	2026-02-10 13:27:27.806+05:30	2026-02-10 13:27:27.809+05:30
ea1cd960-30f0-4794-8d85-8a2dce37d6b6	55	2026-02-10	0	0	0	1	0	0	0	2026-02-10 13:27:55.642+05:30	2026-02-10 13:27:55.65+05:30
b3036e56-a655-4274-8096-6f3927ec985a	55	2026-02-11	0	0	0	1	0	0	0	2026-02-11 17:05:17.222+05:30	2026-02-11 17:05:17.242+05:30
83a37a65-e31c-4c43-a3b7-cd43028076b4	2114	2026-02-13	0	0	0	1	0	0	0	2026-02-13 12:51:34.453+05:30	2026-02-13 12:51:34.468+05:30
07ee5dbf-038b-4f57-aa93-6aad6a04e00b	2076	2026-02-13	0	0	0	1	0	0	0	2026-02-13 12:51:35.705+05:30	2026-02-13 12:51:35.709+05:30
43caae44-dbf2-47db-b622-b81d2f014739	7	2026-02-13	0	0	0	1	0	0	0	2026-02-13 12:51:36.652+05:30	2026-02-13 12:51:36.752+05:30
26830cf6-e1c1-4c98-9e63-635776081783	1030	2026-02-13	0	0	0	1	0	0	0	2026-02-13 12:51:37.188+05:30	2026-02-13 12:51:37.192+05:30
ce8c5529-cdac-48cb-974c-e21b5ec12bf7	1038	2026-02-13	0	0	0	1	0	0	0	2026-02-13 12:51:37.997+05:30	2026-02-13 12:51:38.003+05:30
15fa5489-ee2a-4ed6-99cf-e6c55e7b65e0	50	2026-02-13	0	0	0	1	0	0	0	2026-02-13 18:45:37.154+05:30	2026-02-13 18:45:37.198+05:30
f34643bd-6cc9-47b6-b7fb-a57e87940ab5	55	2026-02-14	0	0	0	1	0	0	0	2026-02-14 16:28:59.106+05:30	2026-02-14 16:28:59.148+05:30
416d4b09-8e1e-411b-a2ec-255d66baa159	105	2026-02-14	0	0	0	1	0	0	0	2026-02-14 18:08:29.592+05:30	2026-02-14 18:08:29.626+05:30
f0aa7c63-19e5-4a02-a7c8-43a2f9e0a15b	51	2026-02-15	0	0	0	1	0	0	0	2026-02-15 11:07:29.693+05:30	2026-02-15 11:07:29.704+05:30
c8a3d69a-4bfe-4183-a936-f459e5e8883f	10	2026-02-15	0	0	0	1	0	0	0	2026-02-15 16:52:08.6+05:30	2026-02-15 16:52:08.618+05:30
e45353f5-6e52-4e02-873c-4fe2827eb4ee	51	2026-02-16	0	0	0	1	0	0	0	2026-02-16 15:30:22.41+05:30	2026-02-16 15:30:22.429+05:30
fab35b66-acd9-4d4f-a9bb-c6addda07ce8	112	2026-02-19	0	0	0	1	0	0	0	2026-02-19 11:48:15.055+05:30	2026-02-19 11:48:15.086+05:30
3f314f43-b5d4-48f8-9675-80762072041c	133	2026-02-16	0	0	0	1	0	0	0	2026-02-16 17:46:29.001+05:30	2026-02-16 17:46:29.039+05:30
1d5ef905-7396-4c3b-af86-a49398255287	135	2026-02-16	0	0	0	1	0	0	0	2026-02-16 17:50:23.317+05:30	2026-02-16 17:50:23.328+05:30
666dc47d-80e2-414d-a2b6-67f0b50c731c	104	2026-02-16	0	0	0	1	0	0	0	2026-02-16 17:55:22.466+05:30	2026-02-16 17:55:22.497+05:30
2c564cd6-1b8c-4a8f-b2ea-10406d2b4fb6	137	2026-02-16	0	0	0	1	0	0	0	2026-02-16 18:21:54.067+05:30	2026-02-16 18:21:54.106+05:30
793f01b8-1614-453f-8c23-283ab72ebf34	55	2026-02-16	0	0	0	3	0	0	0	2026-02-16 15:31:17.253+05:30	2026-02-16 18:41:49.189+05:30
d7139691-8491-4751-be01-834ba38e7df4	51	2026-02-18	0	0	0	1	0	0	0	2026-02-18 13:14:34.753+05:30	2026-02-18 13:14:34.771+05:30
109f9b0d-9733-483f-9e4e-2442253a1fe7	104	2026-02-18	0	0	0	1	0	0	0	2026-02-18 13:14:47.991+05:30	2026-02-18 13:14:47.998+05:30
d7bdaf15-f1a1-4bbf-8563-7b86aa7a919b	91	2026-02-20	0	0	0	1	0	0	0	2026-02-20 11:49:53.602+05:30	2026-02-20 11:49:53.625+05:30
cec015f4-8d65-429a-8ba7-66bc543e4b6c	105	2026-02-20	0	0	0	2	0	0	0	2026-02-20 11:50:00.911+05:30	2026-02-20 12:33:05.007+05:30
dd043144-0d1e-419d-b386-af0c06c2c413	51	2026-02-20	0	0	0	3	0	0	0	2026-02-20 10:08:39.881+05:30	2026-02-20 12:56:05.506+05:30
d5b68524-03fd-4843-998f-e9b337179423	108	2026-02-20	0	0	0	1	0	0	0	2026-02-20 12:56:13.957+05:30	2026-02-20 12:56:13.972+05:30
50301286-d819-4e1f-9170-7c372fcacd6c	55	2026-02-20	0	0	0	3	0	0	0	2026-02-20 10:08:47.953+05:30	2026-02-20 12:56:47.885+05:30
8d4b5d05-f09b-465b-9408-772064db2008	19	2026-03-05	0	0	0	1	0	0	0	2026-03-05 15:16:07.952+05:30	2026-03-05 15:16:07.955+05:30
11c338d2-71ff-4d97-b757-1d01e6d9742f	51	2026-02-24	0	0	0	1	0	0	0	2026-02-24 10:41:55.698+05:30	2026-02-24 10:41:55.759+05:30
b495ca59-c4a8-4578-9dad-53a21e937ceb	104	2026-02-25	0	0	0	1	0	0	0	2026-02-25 11:10:04.353+05:30	2026-02-25 11:10:04.355+05:30
2024104c-3f9c-498f-bb57-1491e3931ebe	55	2026-02-25	0	0	0	2	0	0	0	2026-02-25 11:10:11.172+05:30	2026-02-25 11:21:54.923+05:30
7f101aca-42cc-4c19-8f93-10195df80065	85	2026-02-25	0	0	0	1	0	0	0	2026-02-25 11:21:58.895+05:30	2026-02-25 11:21:58.913+05:30
856557a8-7b83-4aa0-bd01-72bf09f70457	51	2026-02-25	0	0	0	2	0	0	0	2026-02-25 11:09:58.09+05:30	2026-02-25 11:22:03.103+05:30
cd4ca1d9-e4be-4076-9584-028e3d533646	105	2026-02-25	0	0	0	1	0	0	0	2026-02-25 11:22:05.153+05:30	2026-02-25 11:22:05.155+05:30
64f9b864-5d18-4d30-924b-92d5eb92c8d6	2	2026-02-26	0	0	0	1	0	0	0	2026-02-26 10:32:33.256+05:30	2026-02-26 10:32:33.262+05:30
c07618d0-adaf-45e7-835c-df0852bf41c8	3	2026-02-27	0	0	0	8	0	0	0	2026-02-27 11:26:54.318+05:30	2026-02-27 15:54:33.38+05:30
e86d5487-fd29-46f9-9d5f-b9bd9862b98c	2	2026-02-27	0	0	0	1	0	0	0	2026-02-27 16:07:14.646+05:30	2026-02-27 16:07:14.65+05:30
ac7680cb-5e90-4a41-8581-24a05f77c341	5	2026-02-28	0	0	0	1	0	0	0	2026-02-28 11:47:09.385+05:30	2026-02-28 11:47:09.39+05:30
6297aa15-e0ed-421a-9ee5-0a7372ae6f1a	5	2026-02-26	0	0	0	3	0	0	0	2026-02-26 11:19:16.869+05:30	2026-02-26 12:15:58.278+05:30
67851d0e-cccb-4738-86c8-adfe25faa723	7	2026-02-26	0	0	0	1	0	0	0	2026-02-26 12:15:59.417+05:30	2026-02-26 12:15:59.422+05:30
5713d980-ca62-44f1-a9a5-f3b6bc3f8f8f	6	2026-02-26	0	0	0	1	0	0	0	2026-02-26 12:16:07.049+05:30	2026-02-26 12:16:07.051+05:30
b0efb3f8-c778-4b1d-ad94-72c343878559	3	2026-02-26	0	0	0	4	0	0	0	2026-02-26 11:15:56.96+05:30	2026-02-26 14:44:22.576+05:30
81037f42-295f-4b5b-858f-00708e52aca7	7	2026-02-28	0	0	0	1	0	0	0	2026-02-28 15:37:27.28+05:30	2026-02-28 15:37:27.283+05:30
c2c9f849-3a58-4d68-8d11-9237f9c4b315	5	2026-03-02	0	0	0	1	0	0	0	2026-03-02 11:05:46.07+05:30	2026-03-02 11:05:46.072+05:30
687147c8-d6bd-409b-abff-d2a682963b37	8	2026-03-02	0	0	0	1	0	0	0	2026-03-02 11:06:00.348+05:30	2026-03-02 11:06:00.351+05:30
370e28cd-f041-42b2-bcce-8dd6a839430e	2	2026-03-02	0	0	0	2	0	0	0	2026-03-02 11:05:33.726+05:30	2026-03-02 12:02:27.974+05:30
27fc464d-50b5-461a-a0e7-457dd1ceeb01	10	2026-03-02	0	0	0	3	0	0	0	2026-03-02 12:11:06.212+05:30	2026-03-02 12:28:40.95+05:30
448eb1e6-9b1e-442c-ba83-d28275ed2bcb	3	2026-03-02	0	0	0	2	0	0	0	2026-03-02 11:05:39.034+05:30	2026-03-02 14:30:01.798+05:30
c99e0b74-c70e-4298-9e4a-25ea85e047e2	7	2026-03-04	0	0	0	2	0	0	0	2026-03-04 09:47:29.324+05:30	2026-03-04 10:23:50.962+05:30
01230f6f-90e2-480b-8821-37f826ee791d	3	2026-03-04	0	0	0	2	0	0	0	2026-03-04 10:24:26.512+05:30	2026-03-04 12:45:16.206+05:30
e03852c2-5c49-40ea-acdf-16dd149d106a	5	2026-03-04	0	0	0	1	0	0	0	2026-03-04 12:59:47.634+05:30	2026-03-04 12:59:47.64+05:30
ddc18d0b-9114-4364-bc4f-43276c222348	1	2026-02-04	563	60	44	19	2	15	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
dfe3a00e-2ea2-44ad-b441-2f5deeb3894d	1	2026-02-05	539	166	13	2	3	1	0	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
e78b5218-1ab7-4c32-b319-8dc0003e63dc	1	2026-02-06	538	55	38	15	2	12	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
a0e90bd7-8daa-4069-82eb-20819a3b9e0e	1	2026-02-07	162	84	32	2	3	1	0	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
6b12b71d-7e7e-492e-bd77-7fc9b42f2bb7	1	2026-02-08	596	68	50	19	1	15	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
59e0c90c-3e73-47e8-90c6-00ffeeda5f1a	1	2026-02-09	488	69	34	19	2	15	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
81727cd9-9e7a-480c-8bc8-4c9e1fa78733	1	2026-02-10	334	94	49	2	2	1	0	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
1de22569-21e7-44d3-bde7-6d98b353e0ce	1	2026-02-11	268	222	39	12	3	9	2	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
696103b8-1cd2-44d6-a53e-67339efbff3b	1	2026-02-12	149	191	54	10	1	8	2	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
6af74f04-ffe4-459d-8b10-d53f078b685d	1	2026-02-13	373	213	15	0	0	0	0	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
aeae67be-4a8e-4c7f-a3ea-47a64212e9dd	1	2026-02-14	119	65	22	14	0	11	2	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
0ca4c033-5b2b-4499-9490-0098be4b3e20	1	2026-02-15	174	169	13	9	4	7	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
b550ae71-cce3-445e-a72d-c2e351c484eb	1	2026-02-16	237	234	21	16	2	12	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
2274b605-d873-411f-8122-c6ce5208924d	1	2026-02-17	213	175	45	6	2	4	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
8a1d89ff-8d28-4799-8dcd-0c0d106d4645	1	2026-02-18	305	116	56	13	0	10	2	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
c06a1ad3-959e-4876-9c20-fc5549a74477	1	2026-02-19	174	97	27	14	3	11	2	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
b65658ae-8cf0-4931-be19-86fd71c48f2e	1	2026-02-20	258	177	29	6	0	4	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
66bd91e3-0af8-4429-be05-a8669b387c56	1	2026-02-21	280	126	19	7	4	5	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
75e9456c-3898-4b04-bdea-9edb431f5ea6	1	2026-02-22	280	63	51	16	0	12	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
6ba4d6da-3b14-4f38-b5c6-50fcebbe5ef0	1	2026-02-23	305	146	28	9	3	7	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
f815aea6-6494-470c-9602-d80275bcebc4	1	2026-02-24	217	219	56	18	0	14	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
d6193b25-7683-4e93-af8a-27a0bf59509e	1	2026-02-25	564	174	32	9	3	7	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
d4840cc8-b434-49f5-bbde-02a707f6288d	1	2026-02-26	249	68	54	8	0	6	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
45d67dd6-681a-4fa1-99e0-5818da95d437	1	2026-02-27	411	103	13	13	1	10	2	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
fe0e8170-1dd1-4599-bc1e-7c6b6ba0ecfd	1	2026-02-28	497	82	55	5	3	4	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
281fc984-df71-4660-9c33-7cba64e6e610	1	2026-03-01	294	226	24	4	3	3	0	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
05544bca-21d6-48e4-91bc-2bb0c8cd6127	1	2026-03-02	360	170	36	3	1	2	0	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
85c36e69-e107-4d31-8609-0ee37e3d86c6	1	2026-03-03	158	143	26	7	3	5	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
ba842082-addc-4bf0-9bae-21d9be703071	1	2026-03-04	451	163	46	7	4	5	1	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
a00e7a00-6398-4915-9915-62bd27edb2fc	1	2026-03-05	297	58	28	16	2	12	3	2026-03-05 10:46:39.407+05:30	2026-03-05 10:46:39.407+05:30
\.


--
-- Data for Name: account_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_status (user_id, status, last_checked) FROM stdin;
51	OK	2026-02-09 18:27:58.817+05:30
76	OK	2026-02-11 10:33:13.112+05:30
75	OK	2026-02-11 11:44:21.838+05:30
117	OK	2026-02-16 10:55:10.033+05:30
118	OK	2026-02-16 10:55:30.087+05:30
119	OK	2026-02-16 10:57:34.892+05:30
120	OK	2026-02-16 10:57:54.427+05:30
121	OK	2026-02-16 11:00:44.06+05:30
122	OK	2026-02-16 11:04:00.746+05:30
123	OK	2026-02-16 11:04:31.769+05:30
124	OK	2026-02-16 11:07:50.481+05:30
112	OK	2026-02-16 11:36:57.356+05:30
125	OK	2026-02-16 13:28:39.713+05:30
126	OK	2026-02-16 13:28:56.212+05:30
127	OK	2026-02-16 13:42:42.283+05:30
128	OK	2026-02-16 13:45:25.645+05:30
2	OK	2026-03-02 10:25:57.036+05:30
18	OK	2026-03-05 14:33:03.972+05:30
\.


--
-- Data for Name: ad_bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_bookmarks (id, "adId", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ad_budgets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_budgets (id, "adId", "dailyBudget", "totalBudget", "startDate", "endDate", "durationDays", "createdAt", "updatedAt") FROM stdin;
0b9c709b-d5ad-4ce3-bc1c-3f88b055bd8e	de9f6a39-df36-40da-a96b-0d2ac11eefe8	5.00	\N	2026-03-07 05:30:00+05:30	\N	7	2026-03-07 10:45:27.522+05:30	2026-03-07 10:45:27.522+05:30
fd64dd99-8239-43ab-b8b3-aa2c6cfdf154	a536f0a8-44d4-4410-90be-576376d2959b	5.00	\N	2026-03-07 05:30:00+05:30	\N	7	2026-03-07 10:45:45.196+05:30	2026-03-07 10:45:45.196+05:30
527cebd3-9ba6-4a45-be0b-4aaf3a6e9efb	d7d3eade-2e2c-4566-9b77-8a0d888fd651	5.00	\N	2026-03-07 05:30:00+05:30	\N	7	2026-03-07 11:36:11.669+05:30	2026-03-07 11:36:11.669+05:30
\.


--
-- Data for Name: ad_clicks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_clicks (id, "adId", "clickerId", "timestamp", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ad_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_comments (id, "adId", "userId", content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ad_impressions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_impressions (id, "adId", "viewerId", "timestamp", "createdAt", "updatedAt") FROM stdin;
3	a536f0a8-44d4-4410-90be-576376d2959b	\N	2026-03-07 12:35:41.275+05:30	2026-03-07 12:35:41.276+05:30	2026-03-07 12:35:41.276+05:30
4	a536f0a8-44d4-4410-90be-576376d2959b	\N	2026-03-07 12:37:36.23+05:30	2026-03-07 12:37:36.23+05:30	2026-03-07 12:37:36.23+05:30
5	d7d3eade-2e2c-4566-9b77-8a0d888fd651	\N	2026-03-07 12:37:36.906+05:30	2026-03-07 12:37:36.906+05:30	2026-03-07 12:37:36.906+05:30
6	a536f0a8-44d4-4410-90be-576376d2959b	\N	2026-03-07 12:38:24.403+05:30	2026-03-07 12:38:24.403+05:30	2026-03-07 12:38:24.403+05:30
\.


--
-- Data for Name: ad_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_likes (id, "adId", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ad_media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_media (id, "adId", "mediaType", "r2Key", url, "thumbnailUrl", "aspectRatio", "order", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ad_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_metrics (id, "adId", impressions, clicks, reach, spent, date, "createdAt", "updatedAt") FROM stdin;
67b95287-f53e-4a01-ae3a-15f19f11b67c	d7d3eade-2e2c-4566-9b77-8a0d888fd651	1	0	0	0.00	2026-03-07	2026-03-07 11:36:35.704+05:30	2026-03-07 12:37:36.908+05:30
03456f50-bd7a-41f7-b25a-ea1ee3892837	a536f0a8-44d4-4410-90be-576376d2959b	3	0	0	0.00	2026-03-07	2026-03-07 10:45:46.299+05:30	2026-03-07 12:38:24.408+05:30
\.


--
-- Data for Name: ad_targets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_targets (id, "adId", "targetType", locations, "ageRange", interests, gender, "createdAt", "updatedAt") FROM stdin;
51b4fc43-ed83-4094-99b9-8b1f2072a676	de9f6a39-df36-40da-a96b-0d2ac11eefe8	AUTOMATIC	["Worldwide"]	{"max": 65, "min": 18}	[]	ALL	2026-03-07 10:45:20.119+05:30	2026-03-07 10:45:20.119+05:30
150cb8d4-35e3-4582-986e-cb4fc80fd3eb	a536f0a8-44d4-4410-90be-576376d2959b	AUTOMATIC	["Worldwide"]	{"max": 65, "min": 18}	[]	ALL	2026-03-07 10:45:44.1+05:30	2026-03-07 10:45:44.1+05:30
acf05216-9d44-4d69-b235-67b62b95edd4	d7d3eade-2e2c-4566-9b77-8a0d888fd651	CUSTOM	["Worldwide"]	{"max": 65, "min": 18}	[]	ALL	2026-03-07 11:35:44.269+05:30	2026-03-07 11:35:44.269+05:30
\.


--
-- Data for Name: admin_audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_audit_logs (id, "adminId", "actionType", "targetType", "targetId", metadata, created_at) FROM stdin;
2	1	LOGIN	auth	1	{"ip": "::1"}	2026-02-26 13:44:33.223+05:30
3	1	LOGIN	auth	1	{"ip": "::1"}	2026-02-28 12:22:07.094+05:30
4	1	LOGIN	auth	1	{"ip": "::1"}	2026-03-04 13:14:14.351+05:30
5	1	DELETE_USER	user	16	{}	2026-03-04 13:14:15.961+05:30
6	1	UNBAN_USER	user	16	{}	2026-03-04 13:14:16.007+05:30
7	1	BAN_USER	user	16	{}	2026-03-04 13:14:16.054+05:30
8	1	update_admin_profile	admin	1	{}	2026-03-04 13:14:16.338+05:30
9	1	LOGIN	auth	1	{"ip": "::1"}	2026-03-05 14:38:31.087+05:30
10	1	LOGIN	auth	1	{"ip": "::1"}	2026-03-05 14:41:17.9+05:30
11	1	LOGIN	auth	1	{"ip": "::ffff:127.0.0.1"}	2026-03-05 14:53:09.377+05:30
12	1	LOGIN	auth	1	{"ip": "::ffff:127.0.0.1"}	2026-03-05 14:53:33.717+05:30
13	1	LOGIN	auth	1	{"ip": "::1"}	2026-03-07 12:07:34.463+05:30
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, name, email, password, "roleId", "isActive", "lastLogin", created_at, updated_at) FROM stdin;
1	admin	Super Admin	admin@jaadoe.com	$2b$10$9Foqk9eDtLuSjvBRih2jj.6Vbc9yDC06w1jvovutPYiSGgkXDZiNm	1	t	2026-03-07 12:07:34.457+05:30	2026-02-23 10:16:24.923+05:30	2026-03-07 12:07:34.457+05:30
\.


--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ads (id, "userId", title, caption, "ctaText", "destinationUrl", "adType", status, "hideLikes", "commentsDisabled", "createdAt", "updatedAt") FROM stdin;
76deafb2-696f-4339-8bd2-3a5ca514c0fd	16	\N	\N	\N	\N	NEW_MEDIA	DRAFT	f	f	2026-03-04 13:14:14.539+05:30	2026-03-04 13:14:14.539+05:30
e64c66fe-6662-4365-9d7a-b915b3669e59	16	\N	\N	\N	\N	NEW_MEDIA	DRAFT	f	f	2026-03-04 13:14:15.688+05:30	2026-03-04 13:14:15.688+05:30
744750d8-918b-42ee-a882-a2e0340a81e9	2	\N	\N	\N	\N	NEW_MEDIA	DRAFT	f	f	2026-03-07 10:41:36.795+05:30	2026-03-07 10:41:36.795+05:30
d75cc7a5-a3bd-42af-8592-4a9cb2ac993d	2	\N	\N	\N	\N	BOOST_CONTENT	DRAFT	f	f	2026-03-07 10:41:39.745+05:30	2026-03-07 10:41:39.745+05:30
de9f6a39-df36-40da-a96b-0d2ac11eefe8	2			Learn More		BOOST_CONTENT	DRAFT	f	f	2026-03-07 10:41:52.274+05:30	2026-03-07 10:42:05.624+05:30
a536f0a8-44d4-4410-90be-576376d2959b	2			Learn More		BOOST_CONTENT	ACTIVE	f	f	2026-03-07 10:45:36.129+05:30	2026-03-07 10:45:46.292+05:30
d7d3eade-2e2c-4566-9b77-8a0d888fd651	2			Learn More		BOOST_CONTENT	ACTIVE	f	f	2026-03-07 11:32:09.785+05:30	2026-03-07 11:36:35.701+05:30
\.


--
-- Data for Name: blocked_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blocked_users (id, blocker_id, blocked_id, "createdAt", "updatedAt") FROM stdin;
512561e2-c8ed-49f1-addd-61e05704e452	2	435	2026-03-02 09:54:27.1+05:30	2026-03-02 09:54:27.1+05:30
38eebf82-d1c2-4ebb-a639-02ae1745cb43	2	436	2026-03-04 09:32:45.342+05:30	2026-03-04 09:32:45.342+05:30
\.


--
-- Data for Name: boosted_content_references; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boosted_content_references (id, "adId", "contentType", "contentId", "originalData", "createdAt", "updatedAt") FROM stdin;
c959cd58-3600-45a9-a139-386d4250f6fc	de9f6a39-df36-40da-a96b-0d2ac11eefe8	POST	2083	{"id": 2083, "userId": 2, "caption": "Post#1", "isLiked": false, "isHidden": false, "mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083311074-485773742.jpg", "username": "must", "createdAt": "2026-02-26T05:21:51.559Z", "hideLikes": false, "mediaType": "IMAGE", "updatedAt": "2026-02-27T05:10:53.008Z", "likesCount": 0, "viewsCount": 0, "contentType": "post", "thumbnailUrl": null, "commentsCount": 0, "commentsDisabled": false}	2026-03-07 10:41:56.081+05:30	2026-03-07 10:41:56.081+05:30
0c309b72-0763-449a-9299-d7e0706679cd	a536f0a8-44d4-4410-90be-576376d2959b	POST	2084	{"id": 2084, "userId": 2, "caption": "Post#2\\n", "isLiked": true, "isHidden": false, "mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083331536-854157292.jpg", "username": "must", "createdAt": "2026-02-26T05:22:14.797Z", "hideLikes": false, "mediaType": "IMAGE", "updatedAt": "2026-03-06T06:54:33.231Z", "likesCount": 1, "viewsCount": 0, "contentType": "post", "thumbnailUrl": null, "commentsCount": 1, "commentsDisabled": false}	2026-03-07 10:45:39.424+05:30	2026-03-07 10:45:39.424+05:30
b0c1888e-cffc-429c-8598-aa861e1a5b51	d7d3eade-2e2c-4566-9b77-8a0d888fd651	POST	2084	{"id": 2084, "userId": 2, "caption": "Post#2\\n", "isLiked": true, "isHidden": false, "mediaUrl": "/api/v1/media/files/Jaadoe/temp/1772083331536-854157292.jpg", "username": "must", "createdAt": "2026-02-26T05:22:14.797Z", "hideLikes": false, "mediaType": "IMAGE", "updatedAt": "2026-03-06T06:54:33.231Z", "likesCount": 1, "viewsCount": 0, "contentType": "post", "thumbnailUrl": null, "commentsCount": 1, "commentsDisabled": false}	2026-03-07 11:33:32.434+05:30	2026-03-07 11:33:32.434+05:30
\.


--
-- Data for Name: call_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.call_logs (id, caller_id, receiver_id, call_type, status, started_at, ended_at, duration_seconds) FROM stdin;
f0e19a92-ec0b-4e5a-8648-52102ae91437	104	51	video	missed	2026-02-21 12:45:56.239+05:30	\N	0
b1dbb33a-24eb-4e67-b422-2dab0a98fa8e	104	51	video	missed	2026-02-21 12:49:40.677+05:30	\N	0
88bb15ec-f09c-4bc3-aa88-85553729ddf7	104	51	video	missed	2026-02-21 12:51:41.92+05:30	\N	0
b60a8ee0-cd32-4d07-be96-8885b6d76180	51	105	audio	missed	2026-02-21 13:00:25.702+05:30	\N	0
0332d9ef-47f8-4c8d-bb21-660ccfedc1d5	51	105	audio	completed	2026-02-21 13:08:55.415+05:30	2026-02-21 13:09:04.684+05:30	9
95f93ade-1bea-45e8-9ac7-9ae57e831462	51	105	video	completed	2026-02-21 13:09:07.033+05:30	2026-02-21 13:09:11.688+05:30	4
f9450a35-f606-4d4a-83f0-e0c8bcc73495	51	105	audio	completed	2026-02-21 13:23:44.988+05:30	2026-02-21 13:24:20.38+05:30	35
8dd1a1ba-b296-47a6-9f49-af0d2245fc5a	51	105	audio	completed	2026-02-21 13:29:50.455+05:30	2026-02-21 13:31:13.379+05:30	82
69421d5b-9621-463c-846b-69bd53ba23d2	51	105	audio	completed	2026-02-21 13:35:05.82+05:30	2026-02-21 13:35:28.968+05:30	23
d0aa74f7-03ab-4e82-b232-8822e33ff0f9	51	105	audio	missed	2026-02-21 13:47:55.164+05:30	\N	0
dcdcd589-68d6-442a-9e95-8065ee1c81fc	3	2	audio	missed	2026-03-07 10:04:56.66+05:30	\N	0
08d31928-f00d-44d8-a788-d94ee89cf96e	3	2	audio	missed	2026-03-07 10:12:15.871+05:30	\N	0
ca00c5be-0372-44d0-b81a-b839f10a390e	3	2	video	missed	2026-03-07 10:12:20.37+05:30	\N	0
\.


--
-- Data for Name: call_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.call_sessions (id, room_name, caller_id, receiver_id, call_type, status, started_at, ended_at, duration_seconds, "createdAt", "updatedAt") FROM stdin;
e1f3cdf0-1434-44c7-a530-c16d89a45de9	call_76bf99e0-6222-4ae7-8525-92efe00fd8aa	51	55	audio	ended	2026-02-25 11:41:57.664+05:30	2026-02-25 11:42:01.972+05:30	4	2026-02-25 11:41:57.665+05:30	2026-02-25 11:42:01.972+05:30
ecfe79fe-a7fc-4025-ba7d-94148d0c445c	call_102e1a80-3f3b-414d-bb66-7ad7689b9a41	3	2	audio	rejected	2026-03-07 12:36:59.519+05:30	2026-03-07 12:58:03.183+05:30	6	2026-03-07 12:36:59.521+05:30	2026-03-07 12:58:03.183+05:30
a8962eac-3f3f-42df-be39-5beed3801357	call_db813e6a-a7bb-4e74-9c26-f89ce580984f	51	55	audio	ended	2026-02-25 11:42:49.492+05:30	2026-02-25 11:43:06.972+05:30	17	2026-02-25 11:42:49.492+05:30	2026-02-25 11:43:06.972+05:30
2744ca61-b85d-4a41-b3bf-b841526f8527	call_f187df03-d2d8-44c3-a56a-fac1a178ff71	51	55	audio	ended	2026-02-25 13:10:55.828+05:30	2026-02-25 13:12:51.925+05:30	116	2026-02-25 13:10:55.828+05:30	2026-02-25 13:12:51.925+05:30
9424a327-458f-4d72-bf8d-93b46f09d3ac	call_90d536e8-834a-4702-af79-8ac2a005bcf3	51	55	audio	ended	2026-02-25 11:43:52.701+05:30	2026-02-25 11:43:55.107+05:30	2	2026-02-25 11:43:52.701+05:30	2026-02-25 11:43:55.107+05:30
bcdeb8a9-8455-460f-b2c8-58ccd2386aca	call_1ab8aff0-5b45-44ac-8c69-d74ffa642732	51	163	audio	ended	2026-02-25 14:44:22.645+05:30	2026-02-25 14:44:56.923+05:30	34	2026-02-25 14:44:22.646+05:30	2026-02-25 14:44:56.924+05:30
84629c11-75b3-497b-914e-9cd5630671dd	call_14e7170f-c5e3-4718-aee9-3d97089f7cef	51	55	audio	ended	2026-02-25 11:46:13.375+05:30	2026-02-25 11:46:16.182+05:30	2	2026-02-25 11:46:13.375+05:30	2026-02-25 11:46:16.182+05:30
44245ffb-894d-4053-a170-9edc5ec1bb4c	call_80c57959-045e-4a7e-bfcd-fa30f9b231a8	51	55	audio	ended	2026-02-25 13:13:04.755+05:30	2026-02-25 13:13:43.211+05:30	38	2026-02-25 13:13:04.755+05:30	2026-02-25 13:13:43.211+05:30
24d80a2b-8c07-4ea4-aeac-97c55e360d23	call_bc4f9cfc-a117-4a5e-ad86-bce3d2b5c491	51	55	audio	ended	2026-02-25 11:46:47.466+05:30	2026-02-25 11:46:51.002+05:30	3	2026-02-25 11:46:47.466+05:30	2026-02-25 11:46:51.002+05:30
1b565321-7b02-4197-b7bf-c9ad9f59eb02	call_6556543d-8ab9-4bbc-877f-3b88a31d1102	51	55	audio	ended	2026-02-25 11:48:11.037+05:30	2026-02-25 11:48:33.805+05:30	22	2026-02-25 11:48:11.038+05:30	2026-02-25 11:48:33.805+05:30
65a239ef-464e-4de2-a89b-8a82d11695c3	call_1f3bcbf2-6f78-49d0-af83-40d7ca2e07ca	51	104	audio	ended	2026-02-25 13:15:49.161+05:30	2026-02-25 13:18:45.257+05:30	176	2026-02-25 13:15:49.161+05:30	2026-02-25 13:18:45.257+05:30
2e50715d-8f09-457e-9bb9-f99a26475bfd	call_40bc94b3-af22-4058-aa9a-0076cf8a37dd	51	55	audio	ended	2026-02-25 11:48:46.264+05:30	2026-02-25 11:48:50.322+05:30	4	2026-02-25 11:48:46.264+05:30	2026-02-25 11:48:50.322+05:30
9ee64b39-6866-46ab-be07-e90ce954814e	call_5f3e24f1-c262-42bb-a1a0-f3d2015d1a32	51	55	audio	ended	2026-02-25 12:00:22.7+05:30	2026-02-25 12:00:26.397+05:30	3	2026-02-25 12:00:22.701+05:30	2026-02-25 12:00:26.397+05:30
f10ed222-4fa8-4981-a95b-cd0f9d997825	call_cd526341-83e7-4282-b290-91dccc443fee	1	2	audio	ended	2026-02-26 10:42:41.297+05:30	2026-02-26 10:43:23.527+05:30	42	2026-02-26 10:42:41.298+05:30	2026-02-26 10:43:23.527+05:30
440794b7-75b6-4f02-bf3f-ad3a5a903d92	call_397a00a1-66a6-4b18-946d-7b045b4ddf0a	51	55	audio	ended	2026-02-25 12:11:43.761+05:30	2026-02-25 12:11:47.057+05:30	3	2026-02-25 12:11:43.762+05:30	2026-02-25 12:11:47.057+05:30
0511b686-45f6-4fbd-b5e4-427008d93b42	call_4b785078-6f2b-4bee-9f2e-29e43af0d2c3	55	51	audio	ended	2026-02-25 13:20:09.27+05:30	2026-02-25 13:26:11.668+05:30	362	2026-02-25 13:20:09.27+05:30	2026-02-25 13:26:11.668+05:30
8a2ea492-d2e1-4a82-bd5b-ddc6db83b79e	call_9223cb53-a71e-4cc4-98b4-c19061d86f4a	51	55	audio	ended	2026-02-25 12:18:01.343+05:30	2026-02-25 12:20:32.296+05:30	150	2026-02-25 12:18:01.344+05:30	2026-02-25 12:20:32.296+05:30
dc47cfcd-7c7b-4b5f-b7e0-f38207d51e91	call_1c4d1d59-af1b-4d11-9031-9a9af17bd60f	51	55	video	ended	2026-02-25 12:20:39.659+05:30	2026-02-25 12:21:02.846+05:30	23	2026-02-25 12:20:39.659+05:30	2026-02-25 12:21:02.846+05:30
f791c5bf-c537-4bc9-b735-fab77ea8faaf	call_1587a56e-b95d-4f62-af75-8d3f18c7a577	55	51	audio	active	2026-02-25 13:36:34.047+05:30	\N	0	2026-02-25 13:36:34.048+05:30	2026-02-25 13:36:35.675+05:30
8afc2c4b-abcb-46ec-927e-cd2323806933	call_74783eef-4e74-4686-916e-930f16239a66	51	55	audio	ended	2026-02-25 12:23:35.88+05:30	2026-02-25 12:28:20.585+05:30	284	2026-02-25 12:23:35.88+05:30	2026-02-25 12:28:20.585+05:30
6a1329a9-05d3-4f37-9a99-45457e035f53	call_945fb93e-c530-4818-a1d5-fbc9213eeb93	51	55	audio	ended	2026-02-25 12:31:17.841+05:30	2026-02-25 12:31:29.897+05:30	12	2026-02-25 12:31:17.841+05:30	2026-02-25 12:31:29.897+05:30
c8f6f809-3a0a-4b09-833b-763205cdd349	call_4d25f179-4313-429a-989d-1d63815e2634	51	55	audio	active	2026-02-25 12:34:11.658+05:30	\N	0	2026-02-25 12:34:11.658+05:30	2026-02-25 12:34:13.102+05:30
adeb762d-c484-4b21-8c67-5d609c6601e2	call_d7798ba2-9327-47bb-bb9e-2cea9da42e32	51	55	audio	ended	2026-02-25 13:03:07.857+05:30	2026-02-25 13:03:15.374+05:30	7	2026-02-25 13:03:07.858+05:30	2026-02-25 13:03:15.374+05:30
9b12ed23-7a11-4e18-867a-1a927b08ac78	call_0905f5e4-1cc8-4674-9e7b-cc26275f9196	55	51	audio	ended	2026-02-25 13:03:10.041+05:30	2026-02-25 13:03:16.183+05:30	6	2026-02-25 13:03:10.041+05:30	2026-02-25 13:03:16.183+05:30
4c98b9ca-6449-41ba-aa30-8625fc1f9fd3	call_b78f4890-85ae-4424-9cde-70d791843a47	51	55	audio	ended	2026-02-25 13:03:19.648+05:30	2026-02-25 13:05:20.429+05:30	120	2026-02-25 13:03:19.648+05:30	2026-02-25 13:05:20.429+05:30
71c5024a-828d-455a-a2e6-c832abaf13aa	call_7bb10e63-acb7-402e-8edf-08982988eb35	51	55	audio	ended	2026-02-25 13:10:43.321+05:30	2026-02-25 13:10:52.134+05:30	8	2026-02-25 13:10:43.321+05:30	2026-02-25 13:10:52.134+05:30
14768ff6-c608-455b-a660-640cdb48f6d1	call_e1b9a021-310d-49d4-8f07-af76637b4bf5	51	163	audio	ended	2026-02-25 15:20:21.137+05:30	2026-02-25 15:20:30.732+05:30	9	2026-02-25 15:20:21.138+05:30	2026-02-25 15:20:30.732+05:30
19223191-fa5d-4a89-80e5-3077e47a6596	call_29db08c1-0d09-4e05-8300-bcbb9fba2a80	51	55	audio	ended	2026-02-25 13:48:06.738+05:30	2026-02-25 13:51:02.213+05:30	175	2026-02-25 13:48:06.738+05:30	2026-02-25 13:51:02.213+05:30
5370c354-106c-4bbe-8d1c-3bec58d11ea1	call_d75db7e5-90cf-4670-b76b-616c4383c6f2	51	55	audio	ended	2026-02-25 13:51:06.465+05:30	2026-02-25 13:52:35.051+05:30	88	2026-02-25 13:51:06.465+05:30	2026-02-25 13:52:35.051+05:30
6a06fbf7-374e-494c-975a-471e3bd823c5	call_dcce468d-9b1b-4363-b484-4d9880f57061	51	163	audio	ended	2026-02-25 15:40:29.766+05:30	2026-02-25 15:41:02.545+05:30	32	2026-02-25 15:40:29.767+05:30	2026-02-25 15:41:02.545+05:30
68afc8ed-bea9-4521-8448-38a9732dde1b	call_3f5c3e96-8e99-4d4f-9f80-f749028616e0	51	55	audio	ended	2026-02-25 14:04:01.052+05:30	2026-02-25 14:04:18.743+05:30	17	2026-02-25 14:04:01.052+05:30	2026-02-25 14:04:18.743+05:30
37f340af-fe3f-4cd0-9b12-783ab03a4d84	call_e341af18-3a4e-4569-a917-dc16c41dc51a	51	55	video	ended	2026-02-25 14:04:37.702+05:30	2026-02-25 14:05:19.985+05:30	42	2026-02-25 14:04:37.703+05:30	2026-02-25 14:05:19.985+05:30
9c65e9cc-98ae-4cfd-80d8-a05ee78ef765	call_0bba5f73-bc4f-4082-8df5-9a9188174451	51	55	audio	ended	2026-02-25 14:32:07.877+05:30	2026-02-25 14:32:42.485+05:30	34	2026-02-25 14:32:07.878+05:30	2026-02-25 14:32:42.485+05:30
48d7e9c1-49b0-498f-ad96-d2e231b991d8	call_e5a11178-41e2-4da9-9eb0-b9ef6b3146ae	51	163	audio	ended	2026-02-25 14:33:24.2+05:30	2026-02-25 14:33:56.688+05:30	32	2026-02-25 14:33:24.2+05:30	2026-02-25 14:33:56.688+05:30
c87c7dd2-4819-4f5a-9089-eead6d442cd7	call_ff7930c0-b5a8-4295-a3ac-b93c194aa8c6	51	163	audio	ended	2026-02-25 15:41:07.732+05:30	2026-02-25 15:41:26.803+05:30	19	2026-02-25 15:41:07.732+05:30	2026-02-25 15:41:26.803+05:30
6c1c33d3-eb26-44ff-89c9-db71198f8ed2	call_a73c173c-87c5-4fd4-b131-42a04261a4db	2	3	video	ended	2026-02-27 10:48:03.416+05:30	2026-02-27 10:48:13.751+05:30	10	2026-02-27 10:48:03.417+05:30	2026-02-27 10:48:13.751+05:30
4c18ee7a-1e87-4746-a162-13a2f6a08cca	call_1673a0a9-ecbb-4281-a395-701b21fbce4a	1	2	audio	ended	2026-02-26 10:32:40.438+05:30	2026-02-26 10:33:31.05+05:30	50	2026-02-26 10:32:40.439+05:30	2026-02-26 10:33:31.05+05:30
00a3b59f-7acf-4c4c-aaa3-45a1a2e27aab	call_8a32bb7e-92f8-43a7-b71a-6511dff876f7	1	2	audio	ended	2026-02-26 10:33:44.209+05:30	2026-02-26 10:33:47.783+05:30	3	2026-02-26 10:33:44.209+05:30	2026-02-26 10:33:47.783+05:30
a13586a4-bc10-4f29-9799-f1689bf6632b	call_5dd02f0b-4641-4532-826b-594f433fcb74	1	2	audio	ended	2026-02-26 10:33:50.076+05:30	2026-02-26 10:34:02.256+05:30	12	2026-02-26 10:33:50.076+05:30	2026-02-26 10:34:02.257+05:30
971ead85-4312-411f-94c9-ab44fff4c07f	call_fa0592f1-b1b7-4ec8-8a5f-ac74aa9d3999	3	2	audio	ended	2026-03-07 10:36:44.417+05:30	2026-03-07 10:36:56.877+05:30	12	2026-03-07 10:36:44.418+05:30	2026-03-07 10:36:56.877+05:30
2661f639-0616-4f4c-9392-ab46181765cd	call_0afb0842-d89d-4aae-ba9a-76f1aaa55f0e	2	3	video	ended	2026-02-27 10:48:18.347+05:30	2026-02-27 10:48:33.146+05:30	14	2026-02-27 10:48:18.348+05:30	2026-02-27 10:48:33.146+05:30
86ac0f96-d141-4f19-875a-ffb12a2219d2	call_b96ae214-94c0-4815-8561-904e35a9d1f2	2	5	video	ended	2026-02-28 11:48:25.994+05:30	2026-02-28 11:48:57.118+05:30	31	2026-02-28 11:48:25.996+05:30	2026-02-28 11:48:57.118+05:30
5f2a8ffc-6ed9-4597-8891-2f9f90d66398	call_3b084c94-53c2-4a58-b6a1-e3903f2a9f80	18	2110	audio	ended	2026-03-05 14:36:07.676+05:30	2026-03-05 14:36:12.436+05:30	4	2026-03-05 14:36:07.68+05:30	2026-03-05 14:36:12.436+05:30
3a55f082-873f-4427-a901-a508b59e3ccb	call_4d55091a-53df-43cd-bdbe-e73fd051bb69	3	2	video	ended	2026-03-07 10:37:03.671+05:30	2026-03-07 10:37:24.422+05:30	20	2026-03-07 10:37:03.672+05:30	2026-03-07 10:37:24.422+05:30
\.


--
-- Data for Name: close_friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.close_friends (id, user_id, friend_id, "createdAt", "updatedAt") FROM stdin;
66ea6c04-5d6f-4ae0-8d9f-cf0796bdfe11	51	1	2026-02-14 15:11:58.901+05:30	2026-02-14 15:11:58.901+05:30
819aa3c9-e527-457e-b0be-1c530328e7d7	51	55	2026-02-14 15:19:11.868+05:30	2026-02-14 15:19:11.868+05:30
bcff2828-6e8a-4f7c-958f-eadea0d19d65	51	104	2026-02-14 15:24:35.767+05:30	2026-02-14 15:24:35.767+05:30
e6946b4f-9b7f-41d6-b3f2-b079773dca1d	2	435	2026-03-02 09:59:15.246+05:30	2026-03-02 09:59:15.246+05:30
7337104e-2ffc-4b77-b34e-93260ebe8e39	2	438	2026-03-02 10:03:35.31+05:30	2026-03-02 10:03:35.31+05:30
4622f94d-a723-4f33-ab33-7b4d53d5b5cc	2	440	2026-03-02 12:50:57.745+05:30	2026-03-02 12:50:57.745+05:30
99643b12-8e0c-4b51-937e-068e8cc4d9be	2	3	2026-03-05 14:46:15.477+05:30	2026-03-05 14:46:15.477+05:30
\.


--
-- Data for Name: connected_apps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.connected_apps (id, user_id, app_name, status, access_type, connected_at) FROM stdin;
\.


--
-- Data for Name: content_metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_metrics (id, "userId", "contentId", "contentType", date, views, reach, likes, comments, shares, saves, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: content_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_preferences (user_id, sensitive_content_level, created_at) FROM stdin;
76	limit_more	2026-02-11 10:33:13.706+05:30
75	limit_more	2026-02-11 11:44:22.543+05:30
51	limit_more	2026-02-09 18:14:21.129+05:30
112	limit_more	2026-02-16 11:36:56.07+05:30
125	limit_more	2026-02-16 13:28:40.595+05:30
126	limit_more	2026-02-16 13:28:56.987+05:30
127	limit_more	2026-02-16 13:42:42.804+05:30
128	limit_more	2026-02-16 13:45:26.17+05:30
2	allow	2026-02-28 15:17:04.419+05:30
18	limit_more	2026-03-05 14:31:42.158+05:30
\.


--
-- Data for Name: dm_moderation_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dm_moderation_logs (id, "adminId", "conversationId", "actionType", metadata, created_at) FROM stdin;
\.


--
-- Data for Name: explore_algorithm_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.explore_algorithm_config (id, "freshnessWeight", "engagementWeight", "relevanceWeight", "locationWeight", updated_at) FROM stdin;
1	70	60	80	40	2026-02-16 13:45:07.178+05:30
\.


--
-- Data for Name: explore_trending_topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.explore_trending_topics (id, topic, created_at) FROM stdin;
6	#fitness	2026-02-04 16:48:24.988+05:30
\.


--
-- Data for Name: favorite_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorite_accounts (id, user_id, favorite_user_id, created_at) FROM stdin;
\.


--
-- Data for Name: feature_limits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feature_limits (id, user_id, feature_name, is_blocked) FROM stdin;
\.


--
-- Data for Name: featured_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.featured_content (id, "contentType", "contentId", "isFeatured", created_at) FROM stdin;
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedback (id, user_id, rating, created_at) FROM stdin;
11475c85-43fe-4d68-a0d0-9c8c8474472f	75	5	2026-02-11 15:45:21.151+05:30
0ccd9ee6-c5c7-41ac-a056-9c8ff1b6afee	75	5	2026-02-11 16:16:07.003+05:30
178bc245-7f4d-4da9-b9d6-921eee1ee6de	120	5	2026-02-16 10:57:54.54+05:30
7222ad86-d314-42b5-8017-ca60d79a35a0	121	5	2026-02-16 11:00:44.329+05:30
e30484c1-5b7d-4d38-ba5c-c772f38481b9	122	5	2026-02-16 11:04:00.882+05:30
9393c26b-ac6a-4a08-9577-7ac82875353e	123	5	2026-02-16 11:04:31.878+05:30
deafe850-66ae-4ca0-92d2-11eff14841fc	124	5	2026-02-16 11:07:50.598+05:30
\.


--
-- Data for Name: follower_activity_heatmap; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follower_activity_heatmap (id, "userId", "dayOfWeek", "hourOfDay", count, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follows (id, follower_id, following_id, "createdAt", "updatedAt") FROM stdin;
b5fc7dda-2c44-4837-9f66-3aee7cfbb37a	8	2	2026-03-02 11:05:33.684+05:30	2026-03-02 11:05:33.684+05:30
cf696340-792c-4901-89e7-c4a1e81c0020	8	3	2026-03-02 11:05:39.027+05:30	2026-03-02 11:05:39.027+05:30
6ea3e0a0-110c-4a02-b29a-20b32d31763c	8	5	2026-03-02 11:05:46.063+05:30	2026-03-02 11:05:46.063+05:30
1d2210c1-54c2-4170-bacd-3ef4467c0596	2	8	2026-03-02 11:06:00.314+05:30	2026-03-02 11:06:00.314+05:30
6c7fefcd-a37a-4cbc-a9ad-f5213b6b4051	5	2	2026-03-02 12:02:27.934+05:30	2026-03-02 12:02:27.934+05:30
c5ed2842-b471-4789-bc88-67989a1dfbc3	9	10	2026-03-02 12:11:06.179+05:30	2026-03-02 12:11:06.179+05:30
0ecfb0f6-fd3c-4de6-9f9f-8cd0eded525a	8	10	2026-03-02 12:27:51.442+05:30	2026-03-02 12:27:51.442+05:30
6b59b1ba-95c9-4d48-8d67-b6218dcb6ff8	3	10	2026-03-02 12:28:40.799+05:30	2026-03-02 12:28:40.799+05:30
a6a9b267-4b62-4a37-bb23-1c6ef2f5c4c8	10	3	2026-03-02 14:30:01.758+05:30	2026-03-02 14:30:01.758+05:30
83439dc3-b152-465e-ae60-03f239ef6f43	14	3	2026-03-04 12:45:16.164+05:30	2026-03-04 12:45:16.164+05:30
4b340396-eb4f-41c4-bc48-2e084cc75e25	15	5	2026-03-04 12:59:47.6+05:30	2026-03-04 12:59:47.6+05:30
797afca5-bf5c-4f2c-a635-7c8af159c737	18	3	2026-03-05 14:27:39.136+05:30	2026-03-05 14:27:39.136+05:30
ac23d097-2c57-47d1-a386-be6b05c22305	18	5	2026-03-05 14:27:40.141+05:30	2026-03-05 14:27:40.141+05:30
9899c075-b182-4e56-bc19-43f5fecfaa81	18	10	2026-03-05 14:27:41.001+05:30	2026-03-05 14:27:41.001+05:30
68a34996-b6b8-47aa-afa1-f0b2572b6fb0	18	2	2026-03-05 14:27:41.758+05:30	2026-03-05 14:27:41.758+05:30
f1bdcf32-9d24-4652-acf5-276d4351f904	18	7	2026-03-05 14:27:42.571+05:30	2026-03-05 14:27:42.571+05:30
f3f2bbc0-63e5-4131-9c4b-23ac9a01ed2c	2	19	2026-03-05 15:16:07.918+05:30	2026-03-05 15:16:07.918+05:30
77ad14ac-3f88-4b37-915e-c1f95b286a24	2	3	2026-03-05 15:18:37.583+05:30	2026-03-05 15:18:37.583+05:30
066140d2-81f6-4380-af07-82747e5506d6	2	5	2026-03-05 15:18:44.719+05:30	2026-03-05 15:18:44.719+05:30
f5e21a3f-2d30-4774-9022-5b2b976fbb81	2	17	2026-03-05 15:18:55.982+05:30	2026-03-05 15:18:55.982+05:30
8ed034e3-0f6a-4ae9-a9d5-816080fb1d0b	20	3	2026-03-07 10:39:52.593+05:30	2026-03-07 10:39:52.593+05:30
38faa7e8-d697-45ba-8f25-af4303beb089	20	5	2026-03-07 10:40:01.516+05:30	2026-03-07 10:40:01.516+05:30
531cca59-fadc-44cb-a186-b68c96003698	20	17	2026-03-07 10:40:03.961+05:30	2026-03-07 10:40:03.961+05:30
89fe2505-a6a3-4443-b27d-d5adaaeeb6fc	20	2	2026-03-07 10:40:05.432+05:30	2026-03-07 10:40:05.432+05:30
58321926-245d-45b4-89a7-8c78a837e14a	5	3	2026-02-26 11:15:56.917+05:30	2026-02-26 11:15:56.917+05:30
aaa6e35f-3a12-4ef7-9634-90e41d759511	6	5	2026-02-26 11:19:16.827+05:30	2026-02-26 11:19:16.827+05:30
8d54dfac-74c3-4d10-a3bc-b9936c61f966	6	3	2026-02-26 11:19:41.736+05:30	2026-02-26 11:19:41.736+05:30
2cb411b6-dc8f-4643-8a55-ede812439fca	7	3	2026-02-26 11:23:56.007+05:30	2026-02-26 11:23:56.007+05:30
5305ae49-8b95-452c-9cbf-f58e4146d370	7	5	2026-02-26 11:24:02.983+05:30	2026-02-26 11:24:02.983+05:30
211635b0-d1c8-432a-a793-3290c78345e5	3	5	2026-02-26 12:15:58.236+05:30	2026-02-26 12:15:58.236+05:30
5b392b85-b57d-435a-a450-c8d0d825f0b2	3	7	2026-02-26 12:15:59.409+05:30	2026-02-26 12:15:59.409+05:30
2cd9da33-8d95-42dd-946d-97f65e3981c1	3	6	2026-02-26 12:16:07.041+05:30	2026-02-26 12:16:07.041+05:30
\.


--
-- Data for Name: hashtag_follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hashtag_follows (id, user_id, hashtag, created_at) FROM stdin;
\.


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hashtags (id, name, status, "isTrending", deleted, "postsCount", "reelsCount", created_at, updated_at) FROM stdin;
2	#photography	active	t	f	3400	890	2026-02-04 15:50:48.068+05:30	2026-02-04 15:50:48.068+05:30
3	#travel	active	f	f	2100	670	2026-02-04 15:50:48.078+05:30	2026-02-04 15:50:48.078+05:30
4	#fitness	active	t	f	1560	340	2026-02-04 15:50:48.088+05:30	2026-02-04 15:50:48.088+05:30
6	#art	active	t	f	5600	1200	2026-02-04 15:50:48.11+05:30	2026-02-04 15:50:48.11+05:30
7	#lifestyle	active	f	f	750	90	2026-02-04 15:50:48.121+05:30	2026-02-04 15:50:48.121+05:30
8	#tech	active	f	f	430	45	2026-02-04 15:50:48.131+05:30	2026-02-04 15:50:48.131+05:30
10	#music	active	f	f	1200	560	2026-02-04 15:50:48.154+05:30	2026-02-04 15:50:48.154+05:30
11	#dummy	active	f	f	133	2	2026-02-04 15:50:48.161+05:30	2026-02-04 15:51:15.731+05:30
83	#71	active	f	f	6	0	2026-02-12 18:23:40.77+05:30	2026-02-12 18:23:40.77+05:30
84	#72	active	f	f	6	0	2026-02-12 18:23:40.775+05:30	2026-02-12 18:23:40.775+05:30
85	#73	active	f	f	6	0	2026-02-12 18:23:40.782+05:30	2026-02-12 18:23:40.782+05:30
86	#74	active	f	f	6	0	2026-02-12 18:23:40.79+05:30	2026-02-12 18:23:40.79+05:30
87	#75	active	f	f	6	0	2026-02-12 18:23:40.796+05:30	2026-02-12 18:23:40.796+05:30
88	#76	active	f	f	6	0	2026-02-12 18:23:40.803+05:30	2026-02-12 18:23:40.803+05:30
89	#53	active	f	f	6	0	2026-02-12 18:23:40.809+05:30	2026-02-12 18:23:40.809+05:30
90	#52	active	f	f	6	0	2026-02-12 18:23:40.816+05:30	2026-02-12 18:23:40.816+05:30
91	#77	active	f	f	6	0	2026-02-12 18:23:40.824+05:30	2026-02-12 18:23:40.824+05:30
92	#78	active	f	f	6	0	2026-02-12 18:23:40.831+05:30	2026-02-12 18:23:40.831+05:30
5	#foodie	active	f	t	980	120	2026-02-04 15:50:48.098+05:30	2026-02-12 18:25:43.254+05:30
12	#0	active	f	f	6	0	2026-02-12 18:23:40.309+05:30	2026-02-12 18:23:40.309+05:30
13	#test	active	t	f	200	0	2026-02-12 18:23:40.393+05:30	2026-02-12 18:23:40.393+05:30
14	#analytics	active	t	f	200	0	2026-02-12 18:23:40.4+05:30	2026-02-12 18:23:40.4+05:30
15	#demo	active	t	f	200	0	2026-02-12 18:23:40.406+05:30	2026-02-12 18:23:40.406+05:30
16	#1	active	f	f	6	0	2026-02-12 18:23:40.413+05:30	2026-02-12 18:23:40.413+05:30
17	#2	active	f	f	6	0	2026-02-12 18:23:40.419+05:30	2026-02-12 18:23:40.419+05:30
18	#3	active	f	f	6	0	2026-02-12 18:23:40.425+05:30	2026-02-12 18:23:40.425+05:30
19	#4	active	f	f	6	0	2026-02-12 18:23:40.431+05:30	2026-02-12 18:23:40.431+05:30
20	#5	active	f	f	6	0	2026-02-12 18:23:40.437+05:30	2026-02-12 18:23:40.437+05:30
21	#6	active	f	f	6	0	2026-02-12 18:23:40.444+05:30	2026-02-12 18:23:40.444+05:30
22	#7	active	f	f	6	0	2026-02-12 18:23:40.45+05:30	2026-02-12 18:23:40.45+05:30
23	#8	active	f	f	6	0	2026-02-12 18:23:40.454+05:30	2026-02-12 18:23:40.454+05:30
24	#9	active	f	f	6	0	2026-02-12 18:23:40.458+05:30	2026-02-12 18:23:40.458+05:30
25	#10	active	f	f	6	0	2026-02-12 18:23:40.463+05:30	2026-02-12 18:23:40.463+05:30
26	#11	active	f	f	6	0	2026-02-12 18:23:40.469+05:30	2026-02-12 18:23:40.469+05:30
27	#12	active	f	f	6	0	2026-02-12 18:23:40.474+05:30	2026-02-12 18:23:40.474+05:30
28	#13	active	f	f	6	0	2026-02-12 18:23:40.48+05:30	2026-02-12 18:23:40.48+05:30
29	#14	active	f	f	6	0	2026-02-12 18:23:40.488+05:30	2026-02-12 18:23:40.488+05:30
30	#15	active	f	f	6	0	2026-02-12 18:23:40.495+05:30	2026-02-12 18:23:40.495+05:30
31	#16	active	f	f	6	0	2026-02-12 18:23:40.502+05:30	2026-02-12 18:23:40.502+05:30
32	#17	active	f	f	6	0	2026-02-12 18:23:40.508+05:30	2026-02-12 18:23:40.508+05:30
33	#18	active	f	f	6	0	2026-02-12 18:23:40.515+05:30	2026-02-12 18:23:40.515+05:30
34	#19	active	f	f	6	0	2026-02-12 18:23:40.521+05:30	2026-02-12 18:23:40.521+05:30
35	#20	active	f	f	6	0	2026-02-12 18:23:40.526+05:30	2026-02-12 18:23:40.526+05:30
36	#21	active	f	f	6	0	2026-02-12 18:23:40.53+05:30	2026-02-12 18:23:40.53+05:30
37	#22	active	f	f	6	0	2026-02-12 18:23:40.534+05:30	2026-02-12 18:23:40.534+05:30
38	#23	active	f	f	6	0	2026-02-12 18:23:40.538+05:30	2026-02-12 18:23:40.538+05:30
39	#24	active	f	f	6	0	2026-02-12 18:23:40.543+05:30	2026-02-12 18:23:40.543+05:30
40	#25	active	f	f	6	0	2026-02-12 18:23:40.548+05:30	2026-02-12 18:23:40.548+05:30
41	#26	active	f	f	6	0	2026-02-12 18:23:40.554+05:30	2026-02-12 18:23:40.554+05:30
42	#27	active	f	f	6	0	2026-02-12 18:23:40.559+05:30	2026-02-12 18:23:40.559+05:30
43	#28	active	f	f	6	0	2026-02-12 18:23:40.564+05:30	2026-02-12 18:23:40.564+05:30
44	#29	active	f	f	6	0	2026-02-12 18:23:40.569+05:30	2026-02-12 18:23:40.569+05:30
45	#30	active	f	f	6	0	2026-02-12 18:23:40.573+05:30	2026-02-12 18:23:40.573+05:30
46	#31	active	f	f	6	0	2026-02-12 18:23:40.577+05:30	2026-02-12 18:23:40.577+05:30
47	#32	active	f	f	6	0	2026-02-12 18:23:40.583+05:30	2026-02-12 18:23:40.583+05:30
48	#33	active	f	f	6	0	2026-02-12 18:23:40.588+05:30	2026-02-12 18:23:40.588+05:30
49	#34	active	f	f	6	0	2026-02-12 18:23:40.594+05:30	2026-02-12 18:23:40.594+05:30
50	#35	active	f	f	6	0	2026-02-12 18:23:40.601+05:30	2026-02-12 18:23:40.601+05:30
51	#36	active	f	f	6	0	2026-02-12 18:23:40.606+05:30	2026-02-12 18:23:40.606+05:30
52	#37	active	f	f	6	0	2026-02-12 18:23:40.611+05:30	2026-02-12 18:23:40.611+05:30
53	#38	active	f	f	6	0	2026-02-12 18:23:40.616+05:30	2026-02-12 18:23:40.616+05:30
54	#39	active	f	f	6	0	2026-02-12 18:23:40.622+05:30	2026-02-12 18:23:40.622+05:30
55	#40	active	f	f	6	0	2026-02-12 18:23:40.627+05:30	2026-02-12 18:23:40.627+05:30
56	#41	active	f	f	6	0	2026-02-12 18:23:40.632+05:30	2026-02-12 18:23:40.632+05:30
57	#42	active	f	f	6	0	2026-02-12 18:23:40.637+05:30	2026-02-12 18:23:40.637+05:30
58	#43	active	f	f	6	0	2026-02-12 18:23:40.64+05:30	2026-02-12 18:23:40.64+05:30
59	#44	active	f	f	6	0	2026-02-12 18:23:40.645+05:30	2026-02-12 18:23:40.645+05:30
60	#45	active	f	f	6	0	2026-02-12 18:23:40.65+05:30	2026-02-12 18:23:40.65+05:30
61	#46	active	f	f	6	0	2026-02-12 18:23:40.656+05:30	2026-02-12 18:23:40.656+05:30
62	#47	active	f	f	6	0	2026-02-12 18:23:40.66+05:30	2026-02-12 18:23:40.66+05:30
63	#48	active	f	f	6	0	2026-02-12 18:23:40.666+05:30	2026-02-12 18:23:40.666+05:30
64	#49	active	f	f	6	0	2026-02-12 18:23:40.67+05:30	2026-02-12 18:23:40.67+05:30
65	#50	active	f	f	6	0	2026-02-12 18:23:40.674+05:30	2026-02-12 18:23:40.674+05:30
66	#51	active	f	f	6	0	2026-02-12 18:23:40.677+05:30	2026-02-12 18:23:40.677+05:30
67	#55	active	f	f	6	0	2026-02-12 18:23:40.683+05:30	2026-02-12 18:23:40.683+05:30
68	#56	active	f	f	6	0	2026-02-12 18:23:40.689+05:30	2026-02-12 18:23:40.689+05:30
69	#57	active	f	f	6	0	2026-02-12 18:23:40.695+05:30	2026-02-12 18:23:40.695+05:30
70	#58	active	f	f	6	0	2026-02-12 18:23:40.701+05:30	2026-02-12 18:23:40.701+05:30
71	#59	active	f	f	6	0	2026-02-12 18:23:40.705+05:30	2026-02-12 18:23:40.705+05:30
72	#60	active	f	f	6	0	2026-02-12 18:23:40.71+05:30	2026-02-12 18:23:40.71+05:30
73	#61	active	f	f	6	0	2026-02-12 18:23:40.715+05:30	2026-02-12 18:23:40.715+05:30
74	#62	active	f	f	6	0	2026-02-12 18:23:40.721+05:30	2026-02-12 18:23:40.721+05:30
75	#63	active	f	f	6	0	2026-02-12 18:23:40.726+05:30	2026-02-12 18:23:40.726+05:30
76	#64	active	f	f	6	0	2026-02-12 18:23:40.734+05:30	2026-02-12 18:23:40.734+05:30
77	#65	active	f	f	6	0	2026-02-12 18:23:40.739+05:30	2026-02-12 18:23:40.739+05:30
78	#66	active	f	f	6	0	2026-02-12 18:23:40.744+05:30	2026-02-12 18:23:40.744+05:30
79	#67	active	f	f	6	0	2026-02-12 18:23:40.75+05:30	2026-02-12 18:23:40.75+05:30
80	#68	active	f	f	6	0	2026-02-12 18:23:40.755+05:30	2026-02-12 18:23:40.755+05:30
81	#69	active	f	f	6	0	2026-02-12 18:23:40.759+05:30	2026-02-12 18:23:40.759+05:30
82	#70	active	f	f	6	0	2026-02-12 18:23:40.765+05:30	2026-02-12 18:23:40.765+05:30
93	#79	active	f	f	6	0	2026-02-12 18:23:40.837+05:30	2026-02-12 18:23:40.837+05:30
94	#80	active	f	f	6	0	2026-02-12 18:23:40.841+05:30	2026-02-12 18:23:40.841+05:30
95	#81	active	f	f	6	0	2026-02-12 18:23:40.848+05:30	2026-02-12 18:23:40.848+05:30
96	#82	active	f	f	6	0	2026-02-12 18:23:40.853+05:30	2026-02-12 18:23:40.853+05:30
97	#83	active	f	f	6	0	2026-02-12 18:23:40.859+05:30	2026-02-12 18:23:40.859+05:30
98	#84	active	f	f	6	0	2026-02-12 18:23:40.865+05:30	2026-02-12 18:23:40.865+05:30
99	#85	active	f	f	6	0	2026-02-12 18:23:40.872+05:30	2026-02-12 18:23:40.872+05:30
100	#86	active	f	f	6	0	2026-02-12 18:23:40.876+05:30	2026-02-12 18:23:40.876+05:30
101	#87	active	f	f	6	0	2026-02-12 18:23:40.883+05:30	2026-02-12 18:23:40.883+05:30
102	#88	active	f	f	6	0	2026-02-12 18:23:40.887+05:30	2026-02-12 18:23:40.887+05:30
103	#89	active	f	f	6	0	2026-02-12 18:23:40.891+05:30	2026-02-12 18:23:40.891+05:30
104	#90	active	f	f	6	0	2026-02-12 18:23:40.896+05:30	2026-02-12 18:23:40.896+05:30
105	#91	active	f	f	6	0	2026-02-12 18:23:40.903+05:30	2026-02-12 18:23:40.903+05:30
1	#nature	inactive	t	t	1250	450	2026-02-04 15:50:47.998+05:30	2026-02-16 13:45:06.425+05:30
106	#92	active	f	f	6	0	2026-02-12 18:23:40.908+05:30	2026-02-12 18:23:40.908+05:30
107	#93	active	f	f	6	0	2026-02-12 18:23:40.918+05:30	2026-02-12 18:23:40.918+05:30
108	#94	active	f	f	6	0	2026-02-12 18:23:40.923+05:30	2026-02-12 18:23:40.923+05:30
109	#95	active	f	f	6	0	2026-02-12 18:23:40.929+05:30	2026-02-12 18:23:40.929+05:30
110	#96	active	f	f	6	0	2026-02-12 18:23:40.935+05:30	2026-02-12 18:23:40.935+05:30
111	#97	active	f	f	6	0	2026-02-12 18:23:40.944+05:30	2026-02-12 18:23:40.944+05:30
112	#98	active	f	f	6	0	2026-02-12 18:23:40.952+05:30	2026-02-12 18:23:40.952+05:30
113	#99	active	f	f	6	0	2026-02-12 18:23:40.959+05:30	2026-02-12 18:23:40.959+05:30
114	#100	active	f	f	6	0	2026-02-12 18:23:40.966+05:30	2026-02-12 18:23:40.966+05:30
115	#101	active	f	f	6	0	2026-02-12 18:23:40.974+05:30	2026-02-12 18:23:40.974+05:30
116	#102	active	f	f	6	0	2026-02-12 18:23:40.982+05:30	2026-02-12 18:23:40.982+05:30
117	#103	active	f	f	6	0	2026-02-12 18:23:40.989+05:30	2026-02-12 18:23:40.989+05:30
118	#104	active	f	f	6	0	2026-02-12 18:23:40.997+05:30	2026-02-12 18:23:40.997+05:30
119	#105	active	f	f	6	0	2026-02-12 18:23:41.005+05:30	2026-02-12 18:23:41.005+05:30
120	#106	active	f	f	6	0	2026-02-12 18:23:41.014+05:30	2026-02-12 18:23:41.014+05:30
121	#107	active	f	f	6	0	2026-02-12 18:23:41.022+05:30	2026-02-12 18:23:41.022+05:30
122	#108	active	f	f	6	0	2026-02-12 18:23:41.031+05:30	2026-02-12 18:23:41.031+05:30
123	#109	active	f	f	6	0	2026-02-12 18:23:41.041+05:30	2026-02-12 18:23:41.041+05:30
124	#110	active	f	f	6	0	2026-02-12 18:23:41.049+05:30	2026-02-12 18:23:41.049+05:30
125	#111	active	f	f	6	0	2026-02-12 18:23:41.057+05:30	2026-02-12 18:23:41.057+05:30
126	#112	active	f	f	6	0	2026-02-12 18:23:41.065+05:30	2026-02-12 18:23:41.065+05:30
127	#113	active	f	f	6	0	2026-02-12 18:23:41.073+05:30	2026-02-12 18:23:41.073+05:30
128	#114	active	f	f	6	0	2026-02-12 18:23:41.081+05:30	2026-02-12 18:23:41.081+05:30
129	#115	active	f	f	6	0	2026-02-12 18:23:41.091+05:30	2026-02-12 18:23:41.091+05:30
130	#116	active	f	f	6	0	2026-02-12 18:23:41.1+05:30	2026-02-12 18:23:41.1+05:30
131	#117	active	f	f	6	0	2026-02-12 18:23:41.111+05:30	2026-02-12 18:23:41.111+05:30
132	#118	active	f	f	6	0	2026-02-12 18:23:41.119+05:30	2026-02-12 18:23:41.119+05:30
133	#119	active	f	f	6	0	2026-02-12 18:23:41.13+05:30	2026-02-12 18:23:41.13+05:30
134	#120	active	f	f	6	0	2026-02-12 18:23:41.139+05:30	2026-02-12 18:23:41.139+05:30
135	#121	active	f	f	6	0	2026-02-12 18:23:41.156+05:30	2026-02-12 18:23:41.156+05:30
136	#122	active	f	f	6	0	2026-02-12 18:23:41.169+05:30	2026-02-12 18:23:41.169+05:30
137	#123	active	f	f	6	0	2026-02-12 18:23:41.177+05:30	2026-02-12 18:23:41.177+05:30
138	#124	active	f	f	6	0	2026-02-12 18:23:41.187+05:30	2026-02-12 18:23:41.187+05:30
139	#125	active	f	f	6	0	2026-02-12 18:23:41.196+05:30	2026-02-12 18:23:41.196+05:30
140	#126	active	f	f	6	0	2026-02-12 18:23:41.205+05:30	2026-02-12 18:23:41.205+05:30
141	#127	active	f	f	6	0	2026-02-12 18:23:41.212+05:30	2026-02-12 18:23:41.212+05:30
142	#128	active	f	f	6	0	2026-02-12 18:23:41.219+05:30	2026-02-12 18:23:41.219+05:30
143	#129	active	f	f	6	0	2026-02-12 18:23:41.227+05:30	2026-02-12 18:23:41.227+05:30
144	#130	active	f	f	6	0	2026-02-12 18:23:41.233+05:30	2026-02-12 18:23:41.233+05:30
145	#131	active	f	f	6	0	2026-02-12 18:23:41.237+05:30	2026-02-12 18:23:41.237+05:30
146	#132	active	f	f	6	0	2026-02-12 18:23:41.244+05:30	2026-02-12 18:23:41.244+05:30
147	#133	active	f	f	6	0	2026-02-12 18:23:41.249+05:30	2026-02-12 18:23:41.249+05:30
148	#134	active	f	f	6	0	2026-02-12 18:23:41.255+05:30	2026-02-12 18:23:41.255+05:30
149	#135	active	f	f	6	0	2026-02-12 18:23:41.262+05:30	2026-02-12 18:23:41.262+05:30
150	#136	active	f	f	6	0	2026-02-12 18:23:41.268+05:30	2026-02-12 18:23:41.268+05:30
151	#137	active	f	f	6	0	2026-02-12 18:23:41.273+05:30	2026-02-12 18:23:41.273+05:30
152	#138	active	f	f	6	0	2026-02-12 18:23:41.281+05:30	2026-02-12 18:23:41.281+05:30
153	#139	active	f	f	6	0	2026-02-12 18:23:41.287+05:30	2026-02-12 18:23:41.287+05:30
154	#140	active	f	f	6	0	2026-02-12 18:23:41.294+05:30	2026-02-12 18:23:41.294+05:30
155	#141	active	f	f	6	0	2026-02-12 18:23:41.301+05:30	2026-02-12 18:23:41.301+05:30
156	#142	active	f	f	6	0	2026-02-12 18:23:41.308+05:30	2026-02-12 18:23:41.308+05:30
157	#143	active	f	f	6	0	2026-02-12 18:23:41.317+05:30	2026-02-12 18:23:41.317+05:30
158	#144	active	f	f	6	0	2026-02-12 18:23:41.325+05:30	2026-02-12 18:23:41.325+05:30
159	#145	active	f	f	6	0	2026-02-12 18:23:41.332+05:30	2026-02-12 18:23:41.332+05:30
160	#146	active	f	f	6	0	2026-02-12 18:23:41.339+05:30	2026-02-12 18:23:41.339+05:30
161	#147	active	f	f	6	0	2026-02-12 18:23:41.346+05:30	2026-02-12 18:23:41.346+05:30
162	#148	active	f	f	6	0	2026-02-12 18:23:41.353+05:30	2026-02-12 18:23:41.353+05:30
163	#149	active	f	f	6	0	2026-02-12 18:23:41.36+05:30	2026-02-12 18:23:41.36+05:30
164	#150	active	f	f	6	0	2026-02-12 18:23:41.368+05:30	2026-02-12 18:23:41.368+05:30
165	#151	active	f	f	6	0	2026-02-12 18:23:41.374+05:30	2026-02-12 18:23:41.374+05:30
166	#152	active	f	f	6	0	2026-02-12 18:23:41.38+05:30	2026-02-12 18:23:41.38+05:30
167	#153	active	f	f	6	0	2026-02-12 18:23:41.386+05:30	2026-02-12 18:23:41.386+05:30
168	#154	active	f	f	6	0	2026-02-12 18:23:41.391+05:30	2026-02-12 18:23:41.391+05:30
169	#155	active	f	f	6	0	2026-02-12 18:23:41.398+05:30	2026-02-12 18:23:41.398+05:30
170	#156	active	f	f	6	0	2026-02-12 18:23:41.407+05:30	2026-02-12 18:23:41.407+05:30
171	#157	active	f	f	6	0	2026-02-12 18:23:41.413+05:30	2026-02-12 18:23:41.413+05:30
172	#158	active	f	f	6	0	2026-02-12 18:23:41.419+05:30	2026-02-12 18:23:41.419+05:30
173	#159	active	f	f	6	0	2026-02-12 18:23:41.424+05:30	2026-02-12 18:23:41.424+05:30
174	#160	active	f	f	6	0	2026-02-12 18:23:41.431+05:30	2026-02-12 18:23:41.431+05:30
175	#161	active	f	f	6	0	2026-02-12 18:23:41.437+05:30	2026-02-12 18:23:41.437+05:30
176	#162	active	f	f	6	0	2026-02-12 18:23:41.444+05:30	2026-02-12 18:23:41.444+05:30
177	#163	active	f	f	6	0	2026-02-12 18:23:41.452+05:30	2026-02-12 18:23:41.452+05:30
178	#164	active	f	f	6	0	2026-02-12 18:23:41.458+05:30	2026-02-12 18:23:41.458+05:30
179	#165	active	f	f	6	0	2026-02-12 18:23:41.466+05:30	2026-02-12 18:23:41.466+05:30
180	#166	active	f	f	6	0	2026-02-12 18:23:41.472+05:30	2026-02-12 18:23:41.472+05:30
181	#167	active	f	f	6	0	2026-02-12 18:23:41.479+05:30	2026-02-12 18:23:41.479+05:30
182	#168	active	f	f	6	0	2026-02-12 18:23:41.486+05:30	2026-02-12 18:23:41.486+05:30
183	#169	active	f	f	6	0	2026-02-12 18:23:41.491+05:30	2026-02-12 18:23:41.491+05:30
184	#170	active	f	f	6	0	2026-02-12 18:23:41.497+05:30	2026-02-12 18:23:41.497+05:30
185	#171	active	f	f	6	0	2026-02-12 18:23:41.503+05:30	2026-02-12 18:23:41.503+05:30
186	#172	active	f	f	6	0	2026-02-12 18:23:41.509+05:30	2026-02-12 18:23:41.509+05:30
187	#173	active	f	f	6	0	2026-02-12 18:23:41.516+05:30	2026-02-12 18:23:41.516+05:30
188	#174	active	f	f	6	0	2026-02-12 18:23:41.52+05:30	2026-02-12 18:23:41.52+05:30
189	#175	active	f	f	6	0	2026-02-12 18:23:41.526+05:30	2026-02-12 18:23:41.526+05:30
190	#176	active	f	f	6	0	2026-02-12 18:23:41.533+05:30	2026-02-12 18:23:41.533+05:30
191	#177	active	f	f	6	0	2026-02-12 18:23:41.539+05:30	2026-02-12 18:23:41.539+05:30
192	#178	active	f	f	6	0	2026-02-12 18:23:41.545+05:30	2026-02-12 18:23:41.545+05:30
193	#179	active	f	f	6	0	2026-02-12 18:23:41.551+05:30	2026-02-12 18:23:41.551+05:30
194	#180	active	f	f	6	0	2026-02-12 18:23:41.557+05:30	2026-02-12 18:23:41.557+05:30
195	#181	active	f	f	6	0	2026-02-12 18:23:41.564+05:30	2026-02-12 18:23:41.564+05:30
196	#182	active	f	f	6	0	2026-02-12 18:23:41.572+05:30	2026-02-12 18:23:41.572+05:30
197	#183	active	f	f	6	0	2026-02-12 18:23:41.578+05:30	2026-02-12 18:23:41.578+05:30
198	#184	active	f	f	6	0	2026-02-12 18:23:41.585+05:30	2026-02-12 18:23:41.585+05:30
199	#185	active	f	f	6	0	2026-02-12 18:23:41.592+05:30	2026-02-12 18:23:41.592+05:30
200	#186	active	f	f	6	0	2026-02-12 18:23:41.6+05:30	2026-02-12 18:23:41.6+05:30
201	#187	active	f	f	6	0	2026-02-12 18:23:41.606+05:30	2026-02-12 18:23:41.606+05:30
202	#188	active	f	f	6	0	2026-02-12 18:23:41.614+05:30	2026-02-12 18:23:41.614+05:30
203	#189	active	f	f	6	0	2026-02-12 18:23:41.619+05:30	2026-02-12 18:23:41.619+05:30
204	#190	active	f	f	6	0	2026-02-12 18:23:41.626+05:30	2026-02-12 18:23:41.626+05:30
205	#191	active	f	f	6	0	2026-02-12 18:23:41.633+05:30	2026-02-12 18:23:41.633+05:30
206	#192	active	f	f	6	0	2026-02-12 18:23:41.639+05:30	2026-02-12 18:23:41.639+05:30
207	#193	active	f	f	6	0	2026-02-12 18:23:41.646+05:30	2026-02-12 18:23:41.646+05:30
208	#194	active	f	f	6	0	2026-02-12 18:23:41.653+05:30	2026-02-12 18:23:41.653+05:30
209	#195	active	f	f	6	0	2026-02-12 18:23:41.659+05:30	2026-02-12 18:23:41.659+05:30
210	#196	active	f	f	6	0	2026-02-12 18:23:41.666+05:30	2026-02-12 18:23:41.666+05:30
211	#197	active	f	f	6	0	2026-02-12 18:23:41.672+05:30	2026-02-12 18:23:41.672+05:30
212	#198	active	f	f	6	0	2026-02-12 18:23:41.68+05:30	2026-02-12 18:23:41.68+05:30
213	#199	active	f	f	6	0	2026-02-12 18:23:41.686+05:30	2026-02-12 18:23:41.686+05:30
214	#metrics	active	t	f	1500	0	2026-02-12 18:23:41.693+05:30	2026-02-12 18:23:41.693+05:30
215	#2026	active	t	f	1500	0	2026-02-12 18:23:41.701+05:30	2026-02-12 18:23:41.701+05:30
216	#54	active	f	f	6	0	2026-02-12 18:23:41.707+05:30	2026-02-12 18:23:41.707+05:30
217	#200	active	f	f	5	0	2026-02-12 18:23:41.717+05:30	2026-02-12 18:23:41.717+05:30
218	#201	active	f	f	5	0	2026-02-12 18:23:41.724+05:30	2026-02-12 18:23:41.724+05:30
219	#202	active	f	f	5	0	2026-02-12 18:23:41.731+05:30	2026-02-12 18:23:41.731+05:30
220	#203	active	f	f	5	0	2026-02-12 18:23:41.738+05:30	2026-02-12 18:23:41.738+05:30
221	#204	active	f	f	5	0	2026-02-12 18:23:41.747+05:30	2026-02-12 18:23:41.747+05:30
222	#205	active	f	f	5	0	2026-02-12 18:23:41.754+05:30	2026-02-12 18:23:41.754+05:30
223	#206	active	f	f	5	0	2026-02-12 18:23:41.76+05:30	2026-02-12 18:23:41.76+05:30
224	#207	active	f	f	5	0	2026-02-12 18:23:41.767+05:30	2026-02-12 18:23:41.767+05:30
225	#208	active	f	f	5	0	2026-02-12 18:23:41.774+05:30	2026-02-12 18:23:41.774+05:30
226	#209	active	f	f	5	0	2026-02-12 18:23:41.782+05:30	2026-02-12 18:23:41.782+05:30
227	#210	active	f	f	5	0	2026-02-12 18:23:41.789+05:30	2026-02-12 18:23:41.789+05:30
228	#211	active	f	f	5	0	2026-02-12 18:23:41.797+05:30	2026-02-12 18:23:41.797+05:30
229	#212	active	f	f	5	0	2026-02-12 18:23:41.804+05:30	2026-02-12 18:23:41.804+05:30
230	#213	active	f	f	5	0	2026-02-12 18:23:41.812+05:30	2026-02-12 18:23:41.812+05:30
231	#214	active	f	f	5	0	2026-02-12 18:23:41.82+05:30	2026-02-12 18:23:41.82+05:30
232	#215	active	f	f	5	0	2026-02-12 18:23:41.83+05:30	2026-02-12 18:23:41.83+05:30
233	#216	active	f	f	5	0	2026-02-12 18:23:41.838+05:30	2026-02-12 18:23:41.838+05:30
234	#217	active	f	f	5	0	2026-02-12 18:23:41.847+05:30	2026-02-12 18:23:41.847+05:30
235	#218	active	f	f	5	0	2026-02-12 18:23:41.856+05:30	2026-02-12 18:23:41.856+05:30
236	#219	active	f	f	5	0	2026-02-12 18:23:41.863+05:30	2026-02-12 18:23:41.863+05:30
237	#220	active	f	f	5	0	2026-02-12 18:23:41.869+05:30	2026-02-12 18:23:41.869+05:30
238	#221	active	f	f	5	0	2026-02-12 18:23:41.876+05:30	2026-02-12 18:23:41.876+05:30
239	#222	active	f	f	5	0	2026-02-12 18:23:41.884+05:30	2026-02-12 18:23:41.884+05:30
240	#223	active	f	f	5	0	2026-02-12 18:23:41.89+05:30	2026-02-12 18:23:41.89+05:30
241	#224	active	f	f	5	0	2026-02-12 18:23:41.9+05:30	2026-02-12 18:23:41.9+05:30
242	#225	active	f	f	5	0	2026-02-12 18:23:41.906+05:30	2026-02-12 18:23:41.906+05:30
243	#226	active	f	f	5	0	2026-02-12 18:23:41.914+05:30	2026-02-12 18:23:41.914+05:30
244	#227	active	f	f	5	0	2026-02-12 18:23:41.922+05:30	2026-02-12 18:23:41.922+05:30
245	#228	active	f	f	5	0	2026-02-12 18:23:41.93+05:30	2026-02-12 18:23:41.93+05:30
246	#229	active	f	f	5	0	2026-02-12 18:23:41.941+05:30	2026-02-12 18:23:41.941+05:30
247	#230	active	f	f	5	0	2026-02-12 18:23:41.948+05:30	2026-02-12 18:23:41.948+05:30
248	#231	active	f	f	5	0	2026-02-12 18:23:41.955+05:30	2026-02-12 18:23:41.955+05:30
249	#232	active	f	f	5	0	2026-02-12 18:23:41.963+05:30	2026-02-12 18:23:41.963+05:30
250	#233	active	f	f	5	0	2026-02-12 18:23:41.97+05:30	2026-02-12 18:23:41.97+05:30
251	#234	active	f	f	5	0	2026-02-12 18:23:41.979+05:30	2026-02-12 18:23:41.979+05:30
252	#235	active	f	f	5	0	2026-02-12 18:23:41.986+05:30	2026-02-12 18:23:41.986+05:30
253	#236	active	f	f	5	0	2026-02-12 18:23:41.992+05:30	2026-02-12 18:23:41.992+05:30
254	#237	active	f	f	5	0	2026-02-12 18:23:42+05:30	2026-02-12 18:23:42+05:30
255	#238	active	f	f	5	0	2026-02-12 18:23:42.007+05:30	2026-02-12 18:23:42.007+05:30
256	#239	active	f	f	5	0	2026-02-12 18:23:42.015+05:30	2026-02-12 18:23:42.015+05:30
257	#240	active	f	f	5	0	2026-02-12 18:23:42.023+05:30	2026-02-12 18:23:42.023+05:30
258	#241	active	f	f	5	0	2026-02-12 18:23:42.03+05:30	2026-02-12 18:23:42.03+05:30
259	#242	active	f	f	5	0	2026-02-12 18:23:42.038+05:30	2026-02-12 18:23:42.038+05:30
260	#243	active	f	f	5	0	2026-02-12 18:23:42.046+05:30	2026-02-12 18:23:42.046+05:30
261	#244	active	f	f	5	0	2026-02-12 18:23:42.053+05:30	2026-02-12 18:23:42.053+05:30
262	#245	active	f	f	5	0	2026-02-12 18:23:42.06+05:30	2026-02-12 18:23:42.06+05:30
263	#246	active	f	f	5	0	2026-02-12 18:23:42.068+05:30	2026-02-12 18:23:42.068+05:30
264	#247	active	f	f	5	0	2026-02-12 18:23:42.074+05:30	2026-02-12 18:23:42.074+05:30
265	#248	active	f	f	5	0	2026-02-12 18:23:42.082+05:30	2026-02-12 18:23:42.082+05:30
266	#249	active	f	f	5	0	2026-02-12 18:23:42.09+05:30	2026-02-12 18:23:42.09+05:30
267	#250	active	f	f	5	0	2026-02-12 18:23:42.099+05:30	2026-02-12 18:23:42.099+05:30
268	#251	active	f	f	5	0	2026-02-12 18:23:42.108+05:30	2026-02-12 18:23:42.108+05:30
269	#252	active	f	f	5	0	2026-02-12 18:23:42.115+05:30	2026-02-12 18:23:42.115+05:30
270	#253	active	f	f	5	0	2026-02-12 18:23:42.122+05:30	2026-02-12 18:23:42.122+05:30
271	#254	active	f	f	5	0	2026-02-12 18:23:42.129+05:30	2026-02-12 18:23:42.129+05:30
272	#255	active	f	f	5	0	2026-02-12 18:23:42.137+05:30	2026-02-12 18:23:42.137+05:30
273	#256	active	f	f	5	0	2026-02-12 18:23:42.144+05:30	2026-02-12 18:23:42.144+05:30
274	#257	active	f	f	5	0	2026-02-12 18:23:42.152+05:30	2026-02-12 18:23:42.152+05:30
275	#258	active	f	f	5	0	2026-02-12 18:23:42.158+05:30	2026-02-12 18:23:42.158+05:30
276	#259	active	f	f	5	0	2026-02-12 18:23:42.167+05:30	2026-02-12 18:23:42.167+05:30
277	#260	active	f	f	5	0	2026-02-12 18:23:42.173+05:30	2026-02-12 18:23:42.173+05:30
278	#261	active	f	f	5	0	2026-02-12 18:23:42.179+05:30	2026-02-12 18:23:42.179+05:30
279	#262	active	f	f	5	0	2026-02-12 18:23:42.188+05:30	2026-02-12 18:23:42.188+05:30
280	#263	active	f	f	5	0	2026-02-12 18:23:42.195+05:30	2026-02-12 18:23:42.195+05:30
281	#264	active	f	f	5	0	2026-02-12 18:23:42.202+05:30	2026-02-12 18:23:42.202+05:30
282	#265	active	f	f	5	0	2026-02-12 18:23:42.209+05:30	2026-02-12 18:23:42.209+05:30
283	#266	active	f	f	5	0	2026-02-12 18:23:42.215+05:30	2026-02-12 18:23:42.215+05:30
284	#267	active	f	f	5	0	2026-02-12 18:23:42.223+05:30	2026-02-12 18:23:42.223+05:30
285	#268	active	f	f	5	0	2026-02-12 18:23:42.229+05:30	2026-02-12 18:23:42.229+05:30
286	#269	active	f	f	5	0	2026-02-12 18:23:42.236+05:30	2026-02-12 18:23:42.236+05:30
287	#270	active	f	f	5	0	2026-02-12 18:23:42.244+05:30	2026-02-12 18:23:42.244+05:30
288	#271	active	f	f	5	0	2026-02-12 18:23:42.251+05:30	2026-02-12 18:23:42.251+05:30
289	#272	active	f	f	5	0	2026-02-12 18:23:42.259+05:30	2026-02-12 18:23:42.259+05:30
290	#273	active	f	f	5	0	2026-02-12 18:23:42.267+05:30	2026-02-12 18:23:42.267+05:30
291	#274	active	f	f	5	0	2026-02-12 18:23:42.273+05:30	2026-02-12 18:23:42.273+05:30
292	#275	active	f	f	5	0	2026-02-12 18:23:42.28+05:30	2026-02-12 18:23:42.28+05:30
293	#276	active	f	f	5	0	2026-02-12 18:23:42.288+05:30	2026-02-12 18:23:42.288+05:30
294	#277	active	f	f	5	0	2026-02-12 18:23:42.295+05:30	2026-02-12 18:23:42.295+05:30
295	#278	active	f	f	5	0	2026-02-12 18:23:42.303+05:30	2026-02-12 18:23:42.303+05:30
296	#279	active	f	f	5	0	2026-02-12 18:23:42.31+05:30	2026-02-12 18:23:42.31+05:30
297	#280	active	f	f	5	0	2026-02-12 18:23:42.318+05:30	2026-02-12 18:23:42.318+05:30
298	#281	active	f	f	5	0	2026-02-12 18:23:42.326+05:30	2026-02-12 18:23:42.326+05:30
299	#282	active	f	f	5	0	2026-02-12 18:23:42.335+05:30	2026-02-12 18:23:42.335+05:30
300	#283	active	f	f	5	0	2026-02-12 18:23:42.342+05:30	2026-02-12 18:23:42.342+05:30
301	#284	active	f	f	5	0	2026-02-12 18:23:42.35+05:30	2026-02-12 18:23:42.35+05:30
302	#285	active	f	f	5	0	2026-02-12 18:23:42.358+05:30	2026-02-12 18:23:42.358+05:30
303	#286	active	f	f	5	0	2026-02-12 18:23:42.366+05:30	2026-02-12 18:23:42.366+05:30
304	#287	active	f	f	5	0	2026-02-12 18:23:42.372+05:30	2026-02-12 18:23:42.372+05:30
305	#288	active	f	f	5	0	2026-02-12 18:23:42.38+05:30	2026-02-12 18:23:42.38+05:30
306	#289	active	f	f	5	0	2026-02-12 18:23:42.387+05:30	2026-02-12 18:23:42.387+05:30
307	#290	active	f	f	5	0	2026-02-12 18:23:42.393+05:30	2026-02-12 18:23:42.393+05:30
308	#291	active	f	f	5	0	2026-02-12 18:23:42.399+05:30	2026-02-12 18:23:42.399+05:30
309	#292	active	f	f	5	0	2026-02-12 18:23:42.406+05:30	2026-02-12 18:23:42.406+05:30
310	#293	active	f	f	5	0	2026-02-12 18:23:42.412+05:30	2026-02-12 18:23:42.412+05:30
311	#294	active	f	f	5	0	2026-02-12 18:23:42.418+05:30	2026-02-12 18:23:42.418+05:30
312	#295	active	f	f	5	0	2026-02-12 18:23:42.424+05:30	2026-02-12 18:23:42.424+05:30
313	#296	active	f	f	5	0	2026-02-12 18:23:42.43+05:30	2026-02-12 18:23:42.43+05:30
314	#297	active	f	f	5	0	2026-02-12 18:23:42.437+05:30	2026-02-12 18:23:42.437+05:30
315	#298	active	f	f	5	0	2026-02-12 18:23:42.443+05:30	2026-02-12 18:23:42.443+05:30
316	#299	active	f	f	5	0	2026-02-12 18:23:42.45+05:30	2026-02-12 18:23:42.45+05:30
317	#photo	active	t	f	121	0	2026-02-12 18:23:42.455+05:30	2026-02-12 18:23:42.455+05:30
318	#explore	active	t	f	121	0	2026-02-12 18:23:42.463+05:30	2026-02-12 18:23:42.463+05:30
319	#reel	active	t	f	60	0	2026-02-12 18:23:42.472+05:30	2026-02-12 18:23:42.472+05:30
320	#viral	active	t	f	60	0	2026-02-12 18:23:42.478+05:30	2026-02-12 18:23:42.478+05:30
9	#fashion	active	t	f	8900	2100	2026-02-04 15:50:48.143+05:30	2026-02-12 18:25:28.85+05:30
\.


--
-- Data for Name: help_article_feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_article_feedbacks (id, "articleId", "userId", "isHelpful", comment, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: help_article_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_article_tags (article_id, tag_id) FROM stdin;
\.


--
-- Data for Name: help_articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_articles (id, title, slug, content, excerpt, status, category_id, views_count, is_featured, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: help_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_categories (id, name, slug, icon, parent_id, order_index, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: help_subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_subcategories (id, "categoryId", name, slug, "order", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: help_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.help_tags (id, name, slug) FROM stdin;
\.


--
-- Data for Name: highlight_stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.highlight_stories (id, highlight_id, story_id, created_at) FROM stdin;
\.


--
-- Data for Name: highlights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.highlights (id, user_id, title, cover_story_id, created_at) FROM stdin;
\.


--
-- Data for Name: impressions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.impressions (id, "userId", "contentId", "contentType", "viewerId", "timestamp") FROM stdin;
1	104	2069	POST	51	2026-02-23 15:35:21.075+05:30
2	104	2069	POST	51	2026-02-23 15:35:21.083+05:30
3	104	2065	POST	51	2026-02-23 15:35:29.49+05:30
4	104	2065	POST	51	2026-02-23 15:35:29.502+05:30
5	148	2078	POST	51	2026-02-24 09:19:58.644+05:30
6	148	2078	POST	51	2026-02-24 09:19:58.656+05:30
7	51	1852	POST	51	2026-02-24 10:19:03.496+05:30
8	51	1852	POST	51	2026-02-24 10:19:03.505+05:30
9	104	2069	POST	51	2026-02-24 10:20:34.997+05:30
10	104	2069	POST	51	2026-02-24 10:20:35.009+05:30
11	104	60	POST	51	2026-02-24 10:32:50.54+05:30
12	104	60	POST	51	2026-02-24 10:32:50.55+05:30
13	55	59	POST	112	2026-02-24 10:43:46.528+05:30
14	55	59	POST	112	2026-02-24 10:43:46.541+05:30
15	104	60	POST	51	2026-02-24 11:22:01.469+05:30
16	104	60	POST	51	2026-02-24 11:22:01.478+05:30
17	105	58	POST	112	2026-02-24 11:34:24.258+05:30
18	51	136	POST	51	2026-02-24 12:06:35.16+05:30
19	51	136	POST	51	2026-02-24 12:06:35.17+05:30
20	51	135	POST	51	2026-02-24 12:06:41.352+05:30
21	51	135	POST	51	2026-02-24 12:06:41.361+05:30
22	148	2078	POST	112	2026-02-24 12:49:39.086+05:30
23	51	2059	POST	51	2026-02-24 12:55:48.081+05:30
24	51	2059	POST	51	2026-02-24 12:55:48.089+05:30
25	51	2073	POST	51	2026-02-24 12:55:56.639+05:30
26	51	2073	POST	51	2026-02-24 12:55:56.649+05:30
27	51	2059	POST	51	2026-02-24 12:56:23.431+05:30
28	51	2059	POST	51	2026-02-24 12:56:23.439+05:30
29	51	2059	POST	51	2026-02-24 12:56:35.744+05:30
30	51	2059	POST	51	2026-02-24 12:56:35.753+05:30
31	51	2059	POST	51	2026-02-24 12:58:42.46+05:30
32	51	2059	POST	51	2026-02-24 12:58:42.47+05:30
33	51	2059	POST	51	2026-02-24 12:59:11.174+05:30
34	51	2059	POST	51	2026-02-24 12:59:11.186+05:30
35	51	1848	POST	51	2026-02-24 13:02:42.15+05:30
36	51	1848	POST	51	2026-02-24 13:02:42.158+05:30
37	51	1852	POST	51	2026-02-24 13:02:49.149+05:30
38	51	1852	POST	51	2026-02-24 13:02:49.158+05:30
39	55	2064	POST	51	2026-02-24 13:03:51.036+05:30
40	55	2064	POST	51	2026-02-24 13:03:51.047+05:30
41	51	2059	POST	51	2026-02-24 13:27:51.119+05:30
42	51	2059	POST	51	2026-02-24 13:27:51.129+05:30
43	51	2073	POST	51	2026-02-24 13:31:23.621+05:30
44	51	2073	POST	51	2026-02-24 13:31:23.648+05:30
45	112	2071	POST	51	2026-02-24 13:31:30.037+05:30
46	112	2071	POST	51	2026-02-24 13:31:30.047+05:30
47	51	2068	POST	51	2026-02-24 13:31:34.451+05:30
48	51	2068	POST	51	2026-02-24 13:31:34.438+05:30
49	51	136	POST	51	2026-02-24 13:31:59.179+05:30
50	51	136	POST	51	2026-02-24 13:31:59.239+05:30
51	51	2068	POST	51	2026-02-24 13:33:04.53+05:30
52	51	2068	POST	51	2026-02-24 13:33:04.548+05:30
53	51	2053	POST	51	2026-02-24 13:46:01.943+05:30
54	51	2053	POST	51	2026-02-24 13:46:01.954+05:30
55	55	2063	POST	51	2026-02-24 14:15:24.046+05:30
56	55	2063	POST	51	2026-02-24 14:15:24.059+05:30
57	51	2053	POST	51	2026-02-24 14:21:27.199+05:30
58	51	2053	POST	51	2026-02-24 14:21:27.207+05:30
59	51	2080	POST	51	2026-02-24 14:28:34.062+05:30
60	51	2080	POST	51	2026-02-24 14:28:34.07+05:30
61	51	136	POST	51	2026-02-24 14:55:23.521+05:30
62	51	136	POST	51	2026-02-24 14:55:23.533+05:30
63	51	137	POST	51	2026-02-24 14:55:47.722+05:30
64	51	137	POST	51	2026-02-24 14:55:47.735+05:30
65	51	139	POST	51	2026-02-24 15:04:07.822+05:30
66	51	139	POST	51	2026-02-24 15:04:07.83+05:30
67	51	139	POST	51	2026-02-24 15:04:14.197+05:30
68	51	139	POST	51	2026-02-24 15:04:14.206+05:30
69	104	2069	POST	112	2026-02-24 15:09:25.609+05:30
70	51	139	POST	51	2026-02-24 15:23:34.044+05:30
71	51	139	POST	51	2026-02-24 15:23:34.057+05:30
72	51	1844	POST	51	2026-02-24 15:28:53.151+05:30
73	51	1844	POST	51	2026-02-24 15:28:53.162+05:30
74	51	1847	POST	51	2026-02-24 15:29:01.396+05:30
75	51	1847	POST	51	2026-02-24 15:29:01.406+05:30
76	104	2095	POST	112	2026-02-25 09:34:35.77+05:30
77	105	58	POST	51	2026-02-25 09:35:25.611+05:30
78	105	58	POST	51	2026-02-25 09:35:25.621+05:30
79	104	60	POST	51	2026-02-25 09:35:29.833+05:30
80	104	60	POST	51	2026-02-25 09:35:29.846+05:30
81	104	60	POST	51	2026-02-25 09:35:37.007+05:30
82	104	60	POST	51	2026-02-25 09:35:37.016+05:30
83	104	60	POST	51	2026-02-25 09:35:47.55+05:30
84	104	60	POST	51	2026-02-25 09:35:47.558+05:30
85	55	62	POST	51	2026-02-25 09:44:54.591+05:30
86	55	62	POST	51	2026-02-25 09:44:54.603+05:30
87	104	60	POST	51	2026-02-25 09:44:58.571+05:30
88	104	60	POST	51	2026-02-25 09:44:58.579+05:30
89	55	2063	POST	2	2026-02-25 10:09:32.087+05:30
90	104	2069	POST	2	2026-02-25 10:10:37.739+05:30
91	60	1843	POST	148	2026-02-25 10:13:15.711+05:30
92	51	2081	POST	148	2026-02-25 10:13:19.823+05:30
93	148	2078	POST	148	2026-02-25 10:14:24.909+05:30
94	105	2102	POST	51	2026-02-25 10:17:18.846+05:30
95	105	2102	POST	51	2026-02-25 10:17:18.853+05:30
96	105	2102	POST	51	2026-02-25 10:17:24.227+05:30
97	105	2102	POST	51	2026-02-25 10:17:24.236+05:30
98	105	2102	POST	51	2026-02-25 10:17:27.441+05:30
99	105	2102	POST	51	2026-02-25 10:17:27.45+05:30
100	105	2102	POST	51	2026-02-25 10:17:32.945+05:30
101	105	2102	POST	51	2026-02-25 10:17:32.954+05:30
102	105	2102	POST	51	2026-02-25 10:17:38.503+05:30
103	105	2102	POST	51	2026-02-25 10:17:38.512+05:30
104	104	2097	POST	51	2026-02-25 10:17:46.711+05:30
105	104	2097	POST	51	2026-02-25 10:17:46.72+05:30
106	72	1858	POST	51	2026-02-25 10:24:59.103+05:30
107	72	1858	POST	51	2026-02-25 10:24:59.113+05:30
108	72	1858	POST	51	2026-02-25 10:25:31.785+05:30
109	72	1858	POST	51	2026-02-25 10:25:31.796+05:30
110	72	1858	POST	51	2026-02-25 10:25:42.338+05:30
111	72	1858	POST	51	2026-02-25 10:25:42.347+05:30
112	72	1858	POST	148	2026-02-25 10:26:08.625+05:30
113	51	2086	POST	148	2026-02-25 10:26:12.437+05:30
114	72	1858	POST	51	2026-02-25 10:28:59.637+05:30
115	72	1858	POST	51	2026-02-25 10:28:59.68+05:30
116	72	1858	POST	51	2026-02-25 10:30:01.174+05:30
117	72	1858	POST	51	2026-02-25 10:30:01.184+05:30
118	72	1858	POST	51	2026-02-25 10:30:08.481+05:30
119	72	1858	POST	51	2026-02-25 10:30:08.489+05:30
120	148	2078	POST	148	2026-02-25 10:34:04.403+05:30
121	112	2071	POST	148	2026-02-25 10:35:33.665+05:30
122	51	56	POST	148	2026-02-25 10:41:42.67+05:30
123	148	2078	POST	51	2026-02-25 11:03:04.587+05:30
124	148	2078	POST	51	2026-02-25 11:03:04.596+05:30
125	148	2078	POST	51	2026-02-25 11:03:11.806+05:30
126	148	2078	POST	51	2026-02-25 11:03:11.814+05:30
127	148	2078	POST	51	2026-02-25 11:03:17.194+05:30
128	148	2078	POST	51	2026-02-25 11:03:17.203+05:30
129	148	2078	POST	51	2026-02-25 11:03:25.062+05:30
130	148	2078	POST	51	2026-02-25 11:03:25.072+05:30
131	148	2078	POST	51	2026-02-25 11:03:29.238+05:30
132	148	2078	POST	51	2026-02-25 11:03:29.246+05:30
133	112	2072	POST	51	2026-02-25 11:03:35.27+05:30
134	112	2072	POST	51	2026-02-25 11:03:35.279+05:30
135	112	2072	POST	51	2026-02-25 11:03:49.319+05:30
136	112	2072	POST	51	2026-02-25 11:03:49.329+05:30
137	148	2078	POST	51	2026-02-25 11:03:55.654+05:30
138	148	2078	POST	51	2026-02-25 11:03:55.664+05:30
139	72	1858	POST	51	2026-02-25 11:04:01.745+05:30
140	72	1858	POST	51	2026-02-25 11:04:01.753+05:30
141	72	1858	POST	51	2026-02-25 11:05:11.469+05:30
142	72	1858	POST	51	2026-02-25 11:05:11.488+05:30
143	72	1858	POST	51	2026-02-25 11:05:54.984+05:30
144	72	1858	POST	51	2026-02-25 11:05:54.992+05:30
145	112	2071	POST	51	2026-02-25 11:06:30.879+05:30
146	112	2071	POST	51	2026-02-25 11:06:30.886+05:30
147	51	2086	POST	148	2026-02-25 11:09:55.132+05:30
148	104	2098	POST	148	2026-02-25 11:10:01.918+05:30
149	51	2083	POST	148	2026-02-25 11:10:07.008+05:30
150	55	2093	POST	148	2026-02-25 11:10:09.128+05:30
151	60	1843	POST	51	2026-02-25 11:11:19.949+05:30
152	60	1843	POST	51	2026-02-25 11:11:19.957+05:30
153	55	2091	POST	163	2026-02-25 11:21:50.864+05:30
154	163	2104	POST	51	2026-02-25 11:29:54.358+05:30
155	163	2104	POST	51	2026-02-25 11:29:54.367+05:30
156	163	2104	POST	163	2026-02-25 11:48:30.085+05:30
157	55	2092	POST	163	2026-02-25 12:19:17.678+05:30
158	55	2092	POST	163	2026-02-25 13:49:08.49+05:30
159	105	2101	POST	163	2026-02-25 13:49:16.972+05:30
160	163	2104	POST	163	2026-02-25 13:49:20.948+05:30
161	51	2087	POST	163	2026-02-25 14:34:41.548+05:30
162	105	2102	POST	163	2026-02-25 14:42:31.658+05:30
163	51	2087	POST	163	2026-02-25 14:42:34.06+05:30
164	51	2087	POST	163	2026-02-25 15:44:15.554+05:30
165	163	2104	POST	163	2026-02-25 15:55:17.661+05:30
166	51	2053	POST	2	2026-02-26 10:15:10.745+05:30
167	112	2072	POST	2	2026-02-26 10:35:33.816+05:30
168	148	2078	POST	2	2026-02-26 10:35:40.811+05:30
169	105	2079	POST	2	2026-02-26 10:35:43.092+05:30
170	148	2078	POST	2	2026-02-26 10:35:52.417+05:30
171	112	2072	POST	2	2026-02-26 10:46:17.473+05:30
172	112	2072	POST	2	2026-02-26 10:46:17.489+05:30
173	51	2059	POST	2	2026-02-26 10:46:22.1+05:30
174	51	2059	POST	2	2026-02-26 10:46:22.11+05:30
175	51	2059	POST	2	2026-02-26 10:48:14.764+05:30
176	51	2059	POST	2	2026-02-26 10:48:14.802+05:30
177	2	2080	POST	2	2026-02-26 10:48:23.622+05:30
178	2	2080	POST	2	2026-02-26 10:48:23.642+05:30
179	3	2082	POST	3	2026-02-26 10:49:18.818+05:30
180	3	2082	POST	3	2026-02-26 10:49:18.826+05:30
181	2	2081	POST	2	2026-02-26 11:00:00.553+05:30
182	105	2079	POST	2	2026-02-26 11:16:44.095+05:30
183	2	2081	POST	2	2026-02-26 11:34:57.131+05:30
184	3	2086	POST	2	2026-02-26 11:50:01.623+05:30
185	7	2108	POST	2	2026-02-26 11:57:37.927+05:30
186	6	2102	POST	2	2026-02-26 11:57:40.355+05:30
187	2	2084	POST	2	2026-02-26 12:19:17.703+05:30
188	5	2097	POST	3	2026-02-26 13:03:47.659+05:30
189	6	2099	POST	2	2026-02-26 13:07:50.383+05:30
190	6	2099	POST	2	2026-02-26 13:07:50.405+05:30
191	105	2079	POST	2	2026-02-26 13:07:53.066+05:30
192	105	2079	POST	2	2026-02-26 13:07:53.087+05:30
193	2	2081	POST	2	2026-02-26 13:22:06.629+05:30
194	2	2080	POST	2	2026-02-26 13:22:11.259+05:30
195	6	2099	POST	2	2026-02-26 13:22:42.744+05:30
196	105	2075	POST	2	2026-02-26 13:24:01.726+05:30
197	5	2097	POST	2	2026-02-26 13:24:06.371+05:30
198	2	2081	POST	2	2026-02-26 13:24:15.263+05:30
199	2	2084	POST	2	2026-02-26 13:24:24.167+05:30
200	2	2081	POST	2	2026-02-26 13:27:18.296+05:30
201	2	2081	POST	2	2026-02-26 13:27:18.316+05:30
202	2	2083	POST	2	2026-02-26 13:49:16.232+05:30
203	3	2092	POST	2	2026-02-26 13:49:19.163+05:30
204	2	2081	POST	2	2026-02-26 13:49:29.276+05:30
205	2	2081	POST	2	2026-02-26 14:15:12.003+05:30
206	2	2081	POST	2	2026-02-26 14:15:22.581+05:30
207	2	2081	POST	2	2026-02-26 14:15:22.609+05:30
208	2	2081	POST	2	2026-02-26 14:21:07.891+05:30
209	51	1851	POST	3	2026-02-26 14:21:45.935+05:30
210	51	1851	POST	3	2026-02-26 14:21:46.017+05:30
211	51	1851	POST	3	2026-02-26 14:21:52.28+05:30
212	51	1851	POST	3	2026-02-26 14:21:52.3+05:30
213	55	2060	POST	2	2026-02-26 14:28:21.012+05:30
214	5	2093	POST	2	2026-02-26 14:36:12.667+05:30
215	2	2081	POST	2	2026-02-26 14:36:58.854+05:30
216	5	2097	POST	2	2026-02-26 14:40:39.508+05:30
217	7	2108	POST	2	2026-02-26 14:41:30.877+05:30
218	2	2081	POST	2	2026-02-26 14:41:33.796+05:30
219	5	2097	POST	2	2026-02-26 14:41:36.707+05:30
220	2	2080	POST	2	2026-02-26 14:41:38.655+05:30
221	3	2086	POST	2	2026-02-26 14:42:46.612+05:30
222	5	2096	POST	2	2026-02-26 14:51:54.031+05:30
223	2	2081	POST	2	2026-02-26 14:52:52.206+05:30
224	2	2081	POST	2	2026-02-26 14:53:07.675+05:30
225	2	2081	POST	2	2026-02-26 14:53:15.986+05:30
226	2	2083	POST	2	2026-02-26 14:53:19.033+05:30
227	2	2081	POST	2	2026-02-26 14:53:20.287+05:30
228	2	2081	POST	2	2026-02-26 14:54:01.713+05:30
229	2	2081	POST	2	2026-02-26 14:54:01.763+05:30
230	2	2081	POST	3	2026-02-26 14:54:32.554+05:30
231	2	2081	POST	3	2026-02-26 14:54:32.578+05:30
232	2	2081	POST	2	2026-02-26 14:56:32.885+05:30
233	2	2081	POST	2	2026-02-26 14:56:32.901+05:30
234	2	2081	POST	2	2026-02-26 14:56:44.252+05:30
235	2	2081	POST	2	2026-02-26 14:56:44.28+05:30
236	7	2107	POST	2	2026-02-26 14:57:58.639+05:30
237	7	2107	POST	2	2026-02-26 14:57:58.716+05:30
238	2	2080	POST	2	2026-02-26 14:58:03.73+05:30
239	2	2080	POST	2	2026-02-26 14:58:03.758+05:30
240	7	2108	POST	3	2026-02-26 15:23:28.65+05:30
241	7	2108	POST	3	2026-02-26 15:23:28.662+05:30
242	7	2108	POST	3	2026-02-26 15:23:36.263+05:30
243	7	2108	POST	3	2026-02-26 15:23:36.27+05:30
244	7	2108	POST	3	2026-02-26 15:23:48.012+05:30
245	7	2108	POST	3	2026-02-26 15:23:48.018+05:30
246	2	2084	POST	3	2026-02-26 15:23:52.582+05:30
247	2	2084	POST	3	2026-02-26 15:23:52.589+05:30
248	2	2084	POST	3	2026-02-26 15:23:58.377+05:30
249	2	2084	POST	3	2026-02-26 15:23:58.384+05:30
250	2	2084	POST	2	2026-02-26 15:55:15.792+05:30
251	7	2108	POST	2	2026-02-26 15:55:18.922+05:30
252	7	2108	POST	2	2026-02-26 15:55:21.847+05:30
253	2	2081	POST	2	2026-02-26 15:55:44.349+05:30
254	3	2082	POST	2	2026-02-26 15:56:50.877+05:30
255	2	2080	POST	2	2026-02-26 15:56:52.867+05:30
256	7	2109	POST	2	2026-02-26 15:56:56.805+05:30
257	6	2101	POST	2	2026-02-26 15:56:58.617+05:30
258	5	2093	POST	2	2026-02-26 15:58:24.206+05:30
259	2	57	POST	2	2026-02-26 15:58:40.636+05:30
260	2	58	POST	2	2026-02-26 15:58:43.787+05:30
261	2	2081	POST	2	2026-02-27 09:35:10.28+05:30
262	2	2083	POST	2	2026-02-27 09:35:14.645+05:30
263	2	2080	POST	2	2026-02-27 09:36:22.109+05:30
264	5	2093	POST	2	2026-02-27 09:36:45.089+05:30
265	2	2081	POST	2	2026-02-27 09:36:48.119+05:30
266	3	2086	POST	2	2026-02-27 10:02:05.015+05:30
267	5	2095	POST	2	2026-02-27 10:07:41.037+05:30
268	2	2081	POST	2	2026-02-27 10:07:43.615+05:30
269	2	2084	POST	2	2026-02-27 10:07:56.928+05:30
270	2	2083	POST	2	2026-02-27 10:08:01.196+05:30
271	3	2082	POST	2	2026-02-27 10:18:37.765+05:30
272	2	2084	POST	2	2026-02-27 10:40:45.256+05:30
273	2	2084	POST	2	2026-02-27 10:40:45.32+05:30
274	2	2083	POST	2	2026-02-27 10:40:49.033+05:30
275	3	2092	POST	2	2026-02-27 11:22:44.107+05:30
276	3	2092	POST	2	2026-02-27 11:22:44.12+05:30
277	3	2090	POST	2	2026-02-27 12:40:44.608+05:30
278	3	2092	POST	2	2026-02-27 12:41:22.585+05:30
279	3	2092	POST	2	2026-02-27 12:41:34.001+05:30
280	3	2092	POST	2	2026-02-27 12:41:34.014+05:30
281	6	2101	POST	2	2026-02-27 13:20:43.964+05:30
282	3	2092	POST	2	2026-02-27 13:24:51.091+05:30
283	3	2092	POST	2	2026-02-27 13:24:51.118+05:30
284	3	2092	POST	2	2026-02-27 13:24:57.051+05:30
285	3	2092	POST	2	2026-02-27 13:24:57.074+05:30
286	3	2092	POST	2	2026-02-27 13:25:22.653+05:30
287	3	2092	POST	2	2026-02-27 13:25:22.665+05:30
288	3	2092	POST	2	2026-02-27 13:25:49.905+05:30
289	6	2099	POST	2	2026-02-27 13:25:55.828+05:30
290	2	2084	POST	2	2026-02-27 13:27:50.119+05:30
291	2	2084	POST	2	2026-02-27 13:27:50.13+05:30
292	6	2099	POST	2	2026-02-27 13:28:32.712+05:30
293	7	2105	POST	2	2026-02-27 13:29:37.904+05:30
294	7	2108	POST	2	2026-02-27 13:29:47.934+05:30
295	2	2083	POST	2	2026-02-27 15:48:46.355+05:30
296	3	2089	POST	2	2026-02-27 15:49:24.284+05:30
297	3	2092	POST	2	2026-02-27 15:51:43.573+05:30
298	3	2092	POST	2	2026-02-27 15:54:20.358+05:30
299	2	2084	POST	2	2026-02-28 10:06:12.728+05:30
300	2	2081	POST	2	2026-02-28 10:06:23.116+05:30
301	7	2108	POST	2	2026-02-28 10:07:19.435+05:30
302	3	2091	POST	2	2026-02-28 10:08:24.243+05:30
303	6	2102	POST	2	2026-02-28 10:08:29.896+05:30
304	3	2082	POST	2	2026-02-28 10:15:43.441+05:30
305	6	2102	POST	2	2026-02-28 10:27:45.919+05:30
306	3	2082	POST	2	2026-02-28 10:28:17.978+05:30
307	5	2094	POST	2	2026-02-28 10:28:31.769+05:30
308	3	2090	POST	2	2026-02-28 10:33:27.694+05:30
309	3	2087	POST	2	2026-02-28 11:32:11.762+05:30
310	3	2087	POST	2	2026-02-28 11:33:56.617+05:30
311	3	2082	POST	2	2026-02-28 11:38:12.356+05:30
312	3	2082	POST	2	2026-02-28 15:12:51.53+05:30
313	7	62	POST	2	2026-02-28 15:37:56.565+05:30
314	7	62	POST	2	2026-02-28 15:37:57.65+05:30
315	3	2092	POST	2	2026-02-28 15:39:45.102+05:30
316	6	61	POST	2	2026-02-28 15:40:07.245+05:30
317	7	2108	POST	2	2026-02-28 15:47:54.263+05:30
318	2	57	POST	2	2026-02-28 15:49:54.158+05:30
319	3	2092	POST	10	2026-03-02 14:30:25.342+05:30
320	3	2092	POST	10	2026-03-02 14:30:26.893+05:30
321	2	2080	POST	2	2026-03-02 15:41:01.611+05:30
322	2	2080	POST	2	2026-03-02 15:59:00.093+05:30
323	3	2090	POST	2	2026-03-04 09:32:16.513+05:30
324	3	2082	POST	2	2026-03-04 09:35:04.104+05:30
325	5	2096	POST	2	2026-03-04 09:35:09.457+05:30
326	6	2100	POST	2	2026-03-04 09:36:00.638+05:30
327	2	2084	POST	2	2026-03-04 10:26:09.087+05:30
328	5	2094	POST	2	2026-03-04 10:45:01.195+05:30
329	3	2088	POST	2	2026-03-04 11:06:16.233+05:30
330	7	2105	POST	2	2026-03-04 11:06:19.85+05:30
331	3	2089	POST	2	2026-03-04 11:06:22.226+05:30
332	7	2104	POST	2	2026-03-04 11:06:24.889+05:30
333	5	2095	POST	2	2026-03-04 11:06:27.95+05:30
334	6	2100	POST	2	2026-03-04 11:06:31.74+05:30
335	2	2083	POST	2	2026-03-04 11:14:47.578+05:30
336	2	2080	POST	2	2026-03-04 12:52:07.982+05:30
337	1	1	POST	3900	2026-02-04 10:46:39.406+05:30
338	1	1	POST	3901	2026-02-04 10:46:39.406+05:30
339	1	1	POST	3902	2026-02-04 10:46:39.406+05:30
340	1	1	POST	3903	2026-02-04 10:46:39.406+05:30
341	1	1	POST	3904	2026-02-04 10:46:39.406+05:30
342	1	1	POST	3905	2026-02-04 10:46:39.406+05:30
343	1	1	POST	3906	2026-02-04 10:46:39.406+05:30
344	1	1	POST	3907	2026-02-04 10:46:39.406+05:30
345	1	1	POST	3908	2026-02-04 10:46:39.406+05:30
346	1	1	POST	3909	2026-02-04 10:46:39.406+05:30
347	1	1	POST	3910	2026-02-04 10:46:39.406+05:30
348	1	1	POST	3911	2026-02-04 10:46:39.406+05:30
349	1	1	POST	3912	2026-02-04 10:46:39.406+05:30
350	1	1	POST	3913	2026-02-04 10:46:39.406+05:30
351	1	1	POST	3914	2026-02-04 10:46:39.406+05:30
352	1	1	POST	3915	2026-02-04 10:46:39.406+05:30
353	1	1	POST	3916	2026-02-04 10:46:39.406+05:30
354	1	1	POST	3917	2026-02-04 10:46:39.406+05:30
355	1	1	POST	3918	2026-02-04 10:46:39.406+05:30
356	1	1	POST	3919	2026-02-04 10:46:39.406+05:30
357	1	1	POST	3920	2026-02-04 10:46:39.406+05:30
358	1	1	POST	3921	2026-02-04 10:46:39.406+05:30
359	1	1	POST	3922	2026-02-04 10:46:39.406+05:30
360	1	1	POST	3923	2026-02-04 10:46:39.406+05:30
361	1	1	POST	3924	2026-02-04 10:46:39.406+05:30
362	1	1	POST	3925	2026-02-04 10:46:39.406+05:30
363	1	1	POST	3926	2026-02-04 10:46:39.406+05:30
364	1	1	POST	3927	2026-02-04 10:46:39.406+05:30
365	1	1	POST	3928	2026-02-04 10:46:39.406+05:30
366	1	1	POST	3929	2026-02-04 10:46:39.406+05:30
367	1	1	POST	3930	2026-02-04 10:46:39.406+05:30
368	1	1	POST	3931	2026-02-04 10:46:39.406+05:30
369	1	1	POST	3932	2026-02-04 10:46:39.406+05:30
370	1	1	POST	3933	2026-02-04 10:46:39.406+05:30
371	1	1	POST	3934	2026-02-04 10:46:39.406+05:30
372	1	1	POST	3935	2026-02-04 10:46:39.406+05:30
373	1	1	POST	3936	2026-02-04 10:46:39.406+05:30
374	1	1	POST	3937	2026-02-04 10:46:39.406+05:30
375	1	1	POST	3938	2026-02-04 10:46:39.406+05:30
376	1	1	POST	3939	2026-02-04 10:46:39.406+05:30
377	1	1	POST	3940	2026-02-04 10:46:39.406+05:30
378	1	1	POST	3941	2026-02-04 10:46:39.406+05:30
379	1	1	POST	3942	2026-02-04 10:46:39.406+05:30
380	1	1	POST	3943	2026-02-04 10:46:39.406+05:30
381	1	1	POST	3944	2026-02-04 10:46:39.406+05:30
382	1	1	POST	3945	2026-02-04 10:46:39.406+05:30
383	1	1	POST	3946	2026-02-04 10:46:39.406+05:30
384	1	1	POST	3947	2026-02-04 10:46:39.406+05:30
385	1	1	POST	3948	2026-02-04 10:46:39.406+05:30
386	1	1	POST	3949	2026-02-04 10:46:39.406+05:30
387	1	1	POST	3800	2026-02-05 10:46:39.406+05:30
388	1	1	POST	3801	2026-02-05 10:46:39.406+05:30
389	1	1	POST	3802	2026-02-05 10:46:39.406+05:30
390	1	1	POST	3803	2026-02-05 10:46:39.406+05:30
391	1	1	POST	3804	2026-02-05 10:46:39.406+05:30
392	1	1	POST	3805	2026-02-05 10:46:39.406+05:30
393	1	1	POST	3806	2026-02-05 10:46:39.406+05:30
394	1	1	POST	3807	2026-02-05 10:46:39.406+05:30
395	1	1	POST	3808	2026-02-05 10:46:39.406+05:30
396	1	1	POST	3809	2026-02-05 10:46:39.406+05:30
397	1	1	POST	3810	2026-02-05 10:46:39.406+05:30
398	1	1	POST	3811	2026-02-05 10:46:39.406+05:30
399	1	1	POST	3812	2026-02-05 10:46:39.406+05:30
400	1	1	POST	3813	2026-02-05 10:46:39.406+05:30
401	1	1	POST	3814	2026-02-05 10:46:39.406+05:30
402	1	1	POST	3815	2026-02-05 10:46:39.406+05:30
403	1	1	POST	3816	2026-02-05 10:46:39.406+05:30
404	1	1	POST	3817	2026-02-05 10:46:39.406+05:30
405	1	1	POST	3818	2026-02-05 10:46:39.406+05:30
406	1	1	POST	3819	2026-02-05 10:46:39.406+05:30
407	1	1	POST	3820	2026-02-05 10:46:39.406+05:30
408	1	1	POST	3821	2026-02-05 10:46:39.406+05:30
409	1	1	POST	3822	2026-02-05 10:46:39.406+05:30
410	1	1	POST	3823	2026-02-05 10:46:39.406+05:30
411	1	1	POST	3824	2026-02-05 10:46:39.406+05:30
412	1	1	POST	3825	2026-02-05 10:46:39.406+05:30
413	1	1	POST	3826	2026-02-05 10:46:39.406+05:30
414	1	1	POST	3827	2026-02-05 10:46:39.406+05:30
415	1	1	POST	3828	2026-02-05 10:46:39.406+05:30
416	1	1	POST	3829	2026-02-05 10:46:39.406+05:30
417	1	1	POST	3830	2026-02-05 10:46:39.406+05:30
418	1	1	POST	3831	2026-02-05 10:46:39.406+05:30
419	1	1	POST	3832	2026-02-05 10:46:39.406+05:30
420	1	1	POST	3833	2026-02-05 10:46:39.406+05:30
421	1	1	POST	3834	2026-02-05 10:46:39.406+05:30
422	1	1	POST	3835	2026-02-05 10:46:39.406+05:30
423	1	1	POST	3836	2026-02-05 10:46:39.406+05:30
424	1	1	POST	3837	2026-02-05 10:46:39.406+05:30
425	1	1	POST	3838	2026-02-05 10:46:39.406+05:30
426	1	1	POST	3839	2026-02-05 10:46:39.406+05:30
427	1	1	POST	3840	2026-02-05 10:46:39.406+05:30
428	1	1	POST	3841	2026-02-05 10:46:39.406+05:30
429	1	1	POST	3842	2026-02-05 10:46:39.406+05:30
430	1	1	POST	3843	2026-02-05 10:46:39.406+05:30
431	1	1	POST	3844	2026-02-05 10:46:39.406+05:30
432	1	1	POST	3845	2026-02-05 10:46:39.406+05:30
433	1	1	POST	3846	2026-02-05 10:46:39.406+05:30
434	1	1	POST	3847	2026-02-05 10:46:39.406+05:30
435	1	1	POST	3848	2026-02-05 10:46:39.406+05:30
436	1	1	POST	3849	2026-02-05 10:46:39.406+05:30
437	1	1	POST	3700	2026-02-06 10:46:39.406+05:30
438	1	1	POST	3701	2026-02-06 10:46:39.406+05:30
439	1	1	POST	3702	2026-02-06 10:46:39.406+05:30
440	1	1	POST	3703	2026-02-06 10:46:39.406+05:30
441	1	1	POST	3704	2026-02-06 10:46:39.406+05:30
442	1	1	POST	3705	2026-02-06 10:46:39.406+05:30
443	1	1	POST	3706	2026-02-06 10:46:39.406+05:30
444	1	1	POST	3707	2026-02-06 10:46:39.406+05:30
445	1	1	POST	3708	2026-02-06 10:46:39.406+05:30
446	1	1	POST	3709	2026-02-06 10:46:39.406+05:30
447	1	1	POST	3710	2026-02-06 10:46:39.406+05:30
448	1	1	POST	3711	2026-02-06 10:46:39.406+05:30
449	1	1	POST	3712	2026-02-06 10:46:39.406+05:30
450	1	1	POST	3713	2026-02-06 10:46:39.406+05:30
451	1	1	POST	3714	2026-02-06 10:46:39.406+05:30
452	1	1	POST	3715	2026-02-06 10:46:39.406+05:30
453	1	1	POST	3716	2026-02-06 10:46:39.406+05:30
454	1	1	POST	3717	2026-02-06 10:46:39.406+05:30
455	1	1	POST	3718	2026-02-06 10:46:39.406+05:30
456	1	1	POST	3719	2026-02-06 10:46:39.406+05:30
457	1	1	POST	3720	2026-02-06 10:46:39.406+05:30
458	1	1	POST	3721	2026-02-06 10:46:39.406+05:30
459	1	1	POST	3722	2026-02-06 10:46:39.406+05:30
460	1	1	POST	3723	2026-02-06 10:46:39.406+05:30
461	1	1	POST	3724	2026-02-06 10:46:39.406+05:30
462	1	1	POST	3725	2026-02-06 10:46:39.406+05:30
463	1	1	POST	3726	2026-02-06 10:46:39.406+05:30
464	1	1	POST	3727	2026-02-06 10:46:39.406+05:30
465	1	1	POST	3728	2026-02-06 10:46:39.406+05:30
466	1	1	POST	3729	2026-02-06 10:46:39.406+05:30
467	1	1	POST	3730	2026-02-06 10:46:39.406+05:30
468	1	1	POST	3731	2026-02-06 10:46:39.406+05:30
469	1	1	POST	3732	2026-02-06 10:46:39.406+05:30
470	1	1	POST	3733	2026-02-06 10:46:39.406+05:30
471	1	1	POST	3734	2026-02-06 10:46:39.406+05:30
472	1	1	POST	3735	2026-02-06 10:46:39.406+05:30
473	1	1	POST	3736	2026-02-06 10:46:39.406+05:30
474	1	1	POST	3737	2026-02-06 10:46:39.406+05:30
475	1	1	POST	3738	2026-02-06 10:46:39.406+05:30
476	1	1	POST	3739	2026-02-06 10:46:39.406+05:30
477	1	1	POST	3740	2026-02-06 10:46:39.406+05:30
478	1	1	POST	3741	2026-02-06 10:46:39.406+05:30
479	1	1	POST	3742	2026-02-06 10:46:39.406+05:30
480	1	1	POST	3743	2026-02-06 10:46:39.406+05:30
481	1	1	POST	3744	2026-02-06 10:46:39.406+05:30
482	1	1	POST	3745	2026-02-06 10:46:39.406+05:30
483	1	1	POST	3746	2026-02-06 10:46:39.406+05:30
484	1	1	POST	3747	2026-02-06 10:46:39.406+05:30
485	1	1	POST	3748	2026-02-06 10:46:39.406+05:30
486	1	1	POST	3749	2026-02-06 10:46:39.406+05:30
487	1	1	POST	3600	2026-02-07 10:46:39.406+05:30
488	1	1	POST	3601	2026-02-07 10:46:39.406+05:30
489	1	1	POST	3602	2026-02-07 10:46:39.406+05:30
490	1	1	POST	3603	2026-02-07 10:46:39.406+05:30
491	1	1	POST	3604	2026-02-07 10:46:39.406+05:30
492	1	1	POST	3605	2026-02-07 10:46:39.406+05:30
493	1	1	POST	3606	2026-02-07 10:46:39.406+05:30
494	1	1	POST	3607	2026-02-07 10:46:39.406+05:30
495	1	1	POST	3608	2026-02-07 10:46:39.406+05:30
496	1	1	POST	3609	2026-02-07 10:46:39.406+05:30
497	1	1	POST	3610	2026-02-07 10:46:39.406+05:30
498	1	1	POST	3611	2026-02-07 10:46:39.406+05:30
499	1	1	POST	3612	2026-02-07 10:46:39.406+05:30
500	1	1	POST	3613	2026-02-07 10:46:39.406+05:30
501	1	1	POST	3614	2026-02-07 10:46:39.406+05:30
502	1	1	POST	3615	2026-02-07 10:46:39.406+05:30
503	1	1	POST	3616	2026-02-07 10:46:39.406+05:30
504	1	1	POST	3617	2026-02-07 10:46:39.406+05:30
505	1	1	POST	3618	2026-02-07 10:46:39.406+05:30
506	1	1	POST	3619	2026-02-07 10:46:39.406+05:30
507	1	1	POST	3620	2026-02-07 10:46:39.406+05:30
508	1	1	POST	3621	2026-02-07 10:46:39.406+05:30
509	1	1	POST	3622	2026-02-07 10:46:39.406+05:30
510	1	1	POST	3623	2026-02-07 10:46:39.406+05:30
511	1	1	POST	3624	2026-02-07 10:46:39.406+05:30
512	1	1	POST	3625	2026-02-07 10:46:39.406+05:30
513	1	1	POST	3626	2026-02-07 10:46:39.406+05:30
514	1	1	POST	3627	2026-02-07 10:46:39.406+05:30
515	1	1	POST	3628	2026-02-07 10:46:39.406+05:30
516	1	1	POST	3629	2026-02-07 10:46:39.406+05:30
517	1	1	POST	3630	2026-02-07 10:46:39.406+05:30
518	1	1	POST	3631	2026-02-07 10:46:39.406+05:30
519	1	1	POST	3632	2026-02-07 10:46:39.406+05:30
520	1	1	POST	3633	2026-02-07 10:46:39.406+05:30
521	1	1	POST	3634	2026-02-07 10:46:39.406+05:30
522	1	1	POST	3635	2026-02-07 10:46:39.406+05:30
523	1	1	POST	3636	2026-02-07 10:46:39.406+05:30
524	1	1	POST	3637	2026-02-07 10:46:39.406+05:30
525	1	1	POST	3638	2026-02-07 10:46:39.406+05:30
526	1	1	POST	3639	2026-02-07 10:46:39.406+05:30
527	1	1	POST	3640	2026-02-07 10:46:39.406+05:30
528	1	1	POST	3641	2026-02-07 10:46:39.406+05:30
529	1	1	POST	3642	2026-02-07 10:46:39.406+05:30
530	1	1	POST	3643	2026-02-07 10:46:39.406+05:30
531	1	1	POST	3644	2026-02-07 10:46:39.406+05:30
532	1	1	POST	3645	2026-02-07 10:46:39.406+05:30
533	1	1	POST	3646	2026-02-07 10:46:39.406+05:30
534	1	1	POST	3647	2026-02-07 10:46:39.406+05:30
535	1	1	POST	3648	2026-02-07 10:46:39.406+05:30
536	1	1	POST	3649	2026-02-07 10:46:39.406+05:30
537	1	1	POST	3500	2026-02-08 10:46:39.406+05:30
538	1	1	POST	3501	2026-02-08 10:46:39.406+05:30
539	1	1	POST	3502	2026-02-08 10:46:39.406+05:30
540	1	1	POST	3503	2026-02-08 10:46:39.406+05:30
541	1	1	POST	3504	2026-02-08 10:46:39.406+05:30
542	1	1	POST	3505	2026-02-08 10:46:39.406+05:30
543	1	1	POST	3506	2026-02-08 10:46:39.406+05:30
544	1	1	POST	3507	2026-02-08 10:46:39.406+05:30
545	1	1	POST	3508	2026-02-08 10:46:39.406+05:30
546	1	1	POST	3509	2026-02-08 10:46:39.406+05:30
547	1	1	POST	3510	2026-02-08 10:46:39.406+05:30
548	1	1	POST	3511	2026-02-08 10:46:39.406+05:30
549	1	1	POST	3512	2026-02-08 10:46:39.406+05:30
550	1	1	POST	3513	2026-02-08 10:46:39.406+05:30
551	1	1	POST	3514	2026-02-08 10:46:39.406+05:30
552	1	1	POST	3515	2026-02-08 10:46:39.406+05:30
553	1	1	POST	3516	2026-02-08 10:46:39.406+05:30
554	1	1	POST	3517	2026-02-08 10:46:39.406+05:30
555	1	1	POST	3518	2026-02-08 10:46:39.406+05:30
556	1	1	POST	3519	2026-02-08 10:46:39.406+05:30
557	1	1	POST	3520	2026-02-08 10:46:39.406+05:30
558	1	1	POST	3521	2026-02-08 10:46:39.406+05:30
559	1	1	POST	3522	2026-02-08 10:46:39.406+05:30
560	1	1	POST	3523	2026-02-08 10:46:39.406+05:30
561	1	1	POST	3524	2026-02-08 10:46:39.406+05:30
562	1	1	POST	3525	2026-02-08 10:46:39.406+05:30
563	1	1	POST	3526	2026-02-08 10:46:39.406+05:30
564	1	1	POST	3527	2026-02-08 10:46:39.406+05:30
565	1	1	POST	3528	2026-02-08 10:46:39.406+05:30
566	1	1	POST	3529	2026-02-08 10:46:39.406+05:30
567	1	1	POST	3530	2026-02-08 10:46:39.406+05:30
568	1	1	POST	3531	2026-02-08 10:46:39.406+05:30
569	1	1	POST	3532	2026-02-08 10:46:39.406+05:30
570	1	1	POST	3533	2026-02-08 10:46:39.406+05:30
571	1	1	POST	3534	2026-02-08 10:46:39.406+05:30
572	1	1	POST	3535	2026-02-08 10:46:39.406+05:30
573	1	1	POST	3536	2026-02-08 10:46:39.406+05:30
574	1	1	POST	3537	2026-02-08 10:46:39.406+05:30
575	1	1	POST	3538	2026-02-08 10:46:39.406+05:30
576	1	1	POST	3539	2026-02-08 10:46:39.406+05:30
577	1	1	POST	3540	2026-02-08 10:46:39.406+05:30
578	1	1	POST	3541	2026-02-08 10:46:39.406+05:30
579	1	1	POST	3542	2026-02-08 10:46:39.406+05:30
580	1	1	POST	3543	2026-02-08 10:46:39.406+05:30
581	1	1	POST	3544	2026-02-08 10:46:39.406+05:30
582	1	1	POST	3545	2026-02-08 10:46:39.406+05:30
583	1	1	POST	3546	2026-02-08 10:46:39.406+05:30
584	1	1	POST	3547	2026-02-08 10:46:39.406+05:30
585	1	1	POST	3548	2026-02-08 10:46:39.406+05:30
586	1	1	POST	3549	2026-02-08 10:46:39.406+05:30
587	1	1	POST	3400	2026-02-09 10:46:39.406+05:30
588	1	1	POST	3401	2026-02-09 10:46:39.406+05:30
589	1	1	POST	3402	2026-02-09 10:46:39.406+05:30
590	1	1	POST	3403	2026-02-09 10:46:39.406+05:30
591	1	1	POST	3404	2026-02-09 10:46:39.406+05:30
592	1	1	POST	3405	2026-02-09 10:46:39.406+05:30
593	1	1	POST	3406	2026-02-09 10:46:39.406+05:30
594	1	1	POST	3407	2026-02-09 10:46:39.406+05:30
595	1	1	POST	3408	2026-02-09 10:46:39.406+05:30
596	1	1	POST	3409	2026-02-09 10:46:39.406+05:30
597	1	1	POST	3410	2026-02-09 10:46:39.406+05:30
598	1	1	POST	3411	2026-02-09 10:46:39.406+05:30
599	1	1	POST	3412	2026-02-09 10:46:39.406+05:30
600	1	1	POST	3413	2026-02-09 10:46:39.406+05:30
601	1	1	POST	3414	2026-02-09 10:46:39.406+05:30
602	1	1	POST	3415	2026-02-09 10:46:39.406+05:30
603	1	1	POST	3416	2026-02-09 10:46:39.406+05:30
604	1	1	POST	3417	2026-02-09 10:46:39.406+05:30
605	1	1	POST	3418	2026-02-09 10:46:39.406+05:30
606	1	1	POST	3419	2026-02-09 10:46:39.406+05:30
607	1	1	POST	3420	2026-02-09 10:46:39.406+05:30
608	1	1	POST	3421	2026-02-09 10:46:39.406+05:30
609	1	1	POST	3422	2026-02-09 10:46:39.406+05:30
610	1	1	POST	3423	2026-02-09 10:46:39.406+05:30
611	1	1	POST	3424	2026-02-09 10:46:39.406+05:30
612	1	1	POST	3425	2026-02-09 10:46:39.406+05:30
613	1	1	POST	3426	2026-02-09 10:46:39.406+05:30
614	1	1	POST	3427	2026-02-09 10:46:39.406+05:30
615	1	1	POST	3428	2026-02-09 10:46:39.406+05:30
616	1	1	POST	3429	2026-02-09 10:46:39.406+05:30
617	1	1	POST	3430	2026-02-09 10:46:39.406+05:30
618	1	1	POST	3431	2026-02-09 10:46:39.406+05:30
619	1	1	POST	3432	2026-02-09 10:46:39.406+05:30
620	1	1	POST	3433	2026-02-09 10:46:39.406+05:30
621	1	1	POST	3434	2026-02-09 10:46:39.406+05:30
622	1	1	POST	3435	2026-02-09 10:46:39.406+05:30
623	1	1	POST	3436	2026-02-09 10:46:39.406+05:30
624	1	1	POST	3437	2026-02-09 10:46:39.406+05:30
625	1	1	POST	3438	2026-02-09 10:46:39.406+05:30
626	1	1	POST	3439	2026-02-09 10:46:39.406+05:30
627	1	1	POST	3440	2026-02-09 10:46:39.406+05:30
628	1	1	POST	3441	2026-02-09 10:46:39.406+05:30
629	1	1	POST	3442	2026-02-09 10:46:39.406+05:30
630	1	1	POST	3443	2026-02-09 10:46:39.406+05:30
631	1	1	POST	3444	2026-02-09 10:46:39.406+05:30
632	1	1	POST	3445	2026-02-09 10:46:39.406+05:30
633	1	1	POST	3446	2026-02-09 10:46:39.406+05:30
634	1	1	POST	3447	2026-02-09 10:46:39.406+05:30
635	1	1	POST	3448	2026-02-09 10:46:39.406+05:30
636	1	1	POST	3449	2026-02-09 10:46:39.406+05:30
637	1	1	POST	3300	2026-02-10 10:46:39.406+05:30
638	1	1	POST	3301	2026-02-10 10:46:39.406+05:30
639	1	1	POST	3302	2026-02-10 10:46:39.406+05:30
640	1	1	POST	3303	2026-02-10 10:46:39.406+05:30
641	1	1	POST	3304	2026-02-10 10:46:39.406+05:30
642	1	1	POST	3305	2026-02-10 10:46:39.406+05:30
643	1	1	POST	3306	2026-02-10 10:46:39.406+05:30
644	1	1	POST	3307	2026-02-10 10:46:39.406+05:30
645	1	1	POST	3308	2026-02-10 10:46:39.406+05:30
646	1	1	POST	3309	2026-02-10 10:46:39.406+05:30
647	1	1	POST	3310	2026-02-10 10:46:39.406+05:30
648	1	1	POST	3311	2026-02-10 10:46:39.406+05:30
649	1	1	POST	3312	2026-02-10 10:46:39.406+05:30
650	1	1	POST	3313	2026-02-10 10:46:39.406+05:30
651	1	1	POST	3314	2026-02-10 10:46:39.406+05:30
652	1	1	POST	3315	2026-02-10 10:46:39.406+05:30
653	1	1	POST	3316	2026-02-10 10:46:39.406+05:30
654	1	1	POST	3317	2026-02-10 10:46:39.406+05:30
655	1	1	POST	3318	2026-02-10 10:46:39.406+05:30
656	1	1	POST	3319	2026-02-10 10:46:39.406+05:30
657	1	1	POST	3320	2026-02-10 10:46:39.406+05:30
658	1	1	POST	3321	2026-02-10 10:46:39.406+05:30
659	1	1	POST	3322	2026-02-10 10:46:39.406+05:30
660	1	1	POST	3323	2026-02-10 10:46:39.406+05:30
661	1	1	POST	3324	2026-02-10 10:46:39.406+05:30
662	1	1	POST	3325	2026-02-10 10:46:39.406+05:30
663	1	1	POST	3326	2026-02-10 10:46:39.406+05:30
664	1	1	POST	3327	2026-02-10 10:46:39.406+05:30
665	1	1	POST	3328	2026-02-10 10:46:39.406+05:30
666	1	1	POST	3329	2026-02-10 10:46:39.406+05:30
667	1	1	POST	3330	2026-02-10 10:46:39.406+05:30
668	1	1	POST	3331	2026-02-10 10:46:39.406+05:30
669	1	1	POST	3332	2026-02-10 10:46:39.406+05:30
670	1	1	POST	3333	2026-02-10 10:46:39.406+05:30
671	1	1	POST	3334	2026-02-10 10:46:39.406+05:30
672	1	1	POST	3335	2026-02-10 10:46:39.406+05:30
673	1	1	POST	3336	2026-02-10 10:46:39.406+05:30
674	1	1	POST	3337	2026-02-10 10:46:39.406+05:30
675	1	1	POST	3338	2026-02-10 10:46:39.406+05:30
676	1	1	POST	3339	2026-02-10 10:46:39.406+05:30
677	1	1	POST	3340	2026-02-10 10:46:39.406+05:30
678	1	1	POST	3341	2026-02-10 10:46:39.406+05:30
679	1	1	POST	3342	2026-02-10 10:46:39.406+05:30
680	1	1	POST	3343	2026-02-10 10:46:39.406+05:30
681	1	1	POST	3344	2026-02-10 10:46:39.406+05:30
682	1	1	POST	3345	2026-02-10 10:46:39.406+05:30
683	1	1	POST	3346	2026-02-10 10:46:39.406+05:30
684	1	1	POST	3347	2026-02-10 10:46:39.406+05:30
685	1	1	POST	3348	2026-02-10 10:46:39.406+05:30
686	1	1	POST	3349	2026-02-10 10:46:39.406+05:30
687	1	1	POST	3200	2026-02-11 10:46:39.406+05:30
688	1	1	POST	3201	2026-02-11 10:46:39.406+05:30
689	1	1	POST	3202	2026-02-11 10:46:39.406+05:30
690	1	1	POST	3203	2026-02-11 10:46:39.406+05:30
691	1	1	POST	3204	2026-02-11 10:46:39.406+05:30
692	1	1	POST	3205	2026-02-11 10:46:39.406+05:30
693	1	1	POST	3206	2026-02-11 10:46:39.406+05:30
694	1	1	POST	3207	2026-02-11 10:46:39.406+05:30
695	1	1	POST	3208	2026-02-11 10:46:39.406+05:30
696	1	1	POST	3209	2026-02-11 10:46:39.406+05:30
697	1	1	POST	3210	2026-02-11 10:46:39.406+05:30
698	1	1	POST	3211	2026-02-11 10:46:39.406+05:30
699	1	1	POST	3212	2026-02-11 10:46:39.406+05:30
700	1	1	POST	3213	2026-02-11 10:46:39.406+05:30
701	1	1	POST	3214	2026-02-11 10:46:39.406+05:30
702	1	1	POST	3215	2026-02-11 10:46:39.406+05:30
703	1	1	POST	3216	2026-02-11 10:46:39.406+05:30
704	1	1	POST	3217	2026-02-11 10:46:39.406+05:30
705	1	1	POST	3218	2026-02-11 10:46:39.406+05:30
706	1	1	POST	3219	2026-02-11 10:46:39.406+05:30
707	1	1	POST	3220	2026-02-11 10:46:39.406+05:30
708	1	1	POST	3221	2026-02-11 10:46:39.406+05:30
709	1	1	POST	3222	2026-02-11 10:46:39.406+05:30
710	1	1	POST	3223	2026-02-11 10:46:39.406+05:30
711	1	1	POST	3224	2026-02-11 10:46:39.406+05:30
712	1	1	POST	3225	2026-02-11 10:46:39.406+05:30
713	1	1	POST	3226	2026-02-11 10:46:39.406+05:30
714	1	1	POST	3227	2026-02-11 10:46:39.406+05:30
715	1	1	POST	3228	2026-02-11 10:46:39.406+05:30
716	1	1	POST	3229	2026-02-11 10:46:39.406+05:30
717	1	1	POST	3230	2026-02-11 10:46:39.406+05:30
718	1	1	POST	3231	2026-02-11 10:46:39.406+05:30
719	1	1	POST	3232	2026-02-11 10:46:39.406+05:30
720	1	1	POST	3233	2026-02-11 10:46:39.406+05:30
721	1	1	POST	3234	2026-02-11 10:46:39.406+05:30
722	1	1	POST	3235	2026-02-11 10:46:39.406+05:30
723	1	1	POST	3236	2026-02-11 10:46:39.406+05:30
724	1	1	POST	3237	2026-02-11 10:46:39.406+05:30
725	1	1	POST	3238	2026-02-11 10:46:39.406+05:30
726	1	1	POST	3239	2026-02-11 10:46:39.406+05:30
727	1	1	POST	3240	2026-02-11 10:46:39.406+05:30
728	1	1	POST	3241	2026-02-11 10:46:39.406+05:30
729	1	1	POST	3242	2026-02-11 10:46:39.406+05:30
730	1	1	POST	3243	2026-02-11 10:46:39.406+05:30
731	1	1	POST	3244	2026-02-11 10:46:39.406+05:30
732	1	1	POST	3245	2026-02-11 10:46:39.406+05:30
733	1	1	POST	3246	2026-02-11 10:46:39.406+05:30
734	1	1	POST	3247	2026-02-11 10:46:39.406+05:30
735	1	1	POST	3248	2026-02-11 10:46:39.406+05:30
736	1	1	POST	3249	2026-02-11 10:46:39.406+05:30
737	1	1	POST	3100	2026-02-12 10:46:39.406+05:30
738	1	1	POST	3101	2026-02-12 10:46:39.406+05:30
739	1	1	POST	3102	2026-02-12 10:46:39.406+05:30
740	1	1	POST	3103	2026-02-12 10:46:39.406+05:30
741	1	1	POST	3104	2026-02-12 10:46:39.406+05:30
742	1	1	POST	3105	2026-02-12 10:46:39.406+05:30
743	1	1	POST	3106	2026-02-12 10:46:39.406+05:30
744	1	1	POST	3107	2026-02-12 10:46:39.406+05:30
745	1	1	POST	3108	2026-02-12 10:46:39.406+05:30
746	1	1	POST	3109	2026-02-12 10:46:39.406+05:30
747	1	1	POST	3110	2026-02-12 10:46:39.406+05:30
748	1	1	POST	3111	2026-02-12 10:46:39.406+05:30
749	1	1	POST	3112	2026-02-12 10:46:39.406+05:30
750	1	1	POST	3113	2026-02-12 10:46:39.406+05:30
751	1	1	POST	3114	2026-02-12 10:46:39.406+05:30
752	1	1	POST	3115	2026-02-12 10:46:39.406+05:30
753	1	1	POST	3116	2026-02-12 10:46:39.406+05:30
754	1	1	POST	3117	2026-02-12 10:46:39.406+05:30
755	1	1	POST	3118	2026-02-12 10:46:39.406+05:30
756	1	1	POST	3119	2026-02-12 10:46:39.406+05:30
757	1	1	POST	3120	2026-02-12 10:46:39.406+05:30
758	1	1	POST	3121	2026-02-12 10:46:39.406+05:30
759	1	1	POST	3122	2026-02-12 10:46:39.406+05:30
760	1	1	POST	3123	2026-02-12 10:46:39.406+05:30
761	1	1	POST	3124	2026-02-12 10:46:39.406+05:30
762	1	1	POST	3125	2026-02-12 10:46:39.406+05:30
763	1	1	POST	3126	2026-02-12 10:46:39.406+05:30
764	1	1	POST	3127	2026-02-12 10:46:39.406+05:30
765	1	1	POST	3128	2026-02-12 10:46:39.406+05:30
766	1	1	POST	3129	2026-02-12 10:46:39.406+05:30
767	1	1	POST	3130	2026-02-12 10:46:39.406+05:30
768	1	1	POST	3131	2026-02-12 10:46:39.406+05:30
769	1	1	POST	3132	2026-02-12 10:46:39.406+05:30
770	1	1	POST	3133	2026-02-12 10:46:39.406+05:30
771	1	1	POST	3134	2026-02-12 10:46:39.406+05:30
772	1	1	POST	3135	2026-02-12 10:46:39.406+05:30
773	1	1	POST	3136	2026-02-12 10:46:39.406+05:30
774	1	1	POST	3137	2026-02-12 10:46:39.406+05:30
775	1	1	POST	3138	2026-02-12 10:46:39.406+05:30
776	1	1	POST	3139	2026-02-12 10:46:39.406+05:30
777	1	1	POST	3140	2026-02-12 10:46:39.406+05:30
778	1	1	POST	3141	2026-02-12 10:46:39.406+05:30
779	1	1	POST	3142	2026-02-12 10:46:39.406+05:30
780	1	1	POST	3143	2026-02-12 10:46:39.406+05:30
781	1	1	POST	3144	2026-02-12 10:46:39.406+05:30
782	1	1	POST	3145	2026-02-12 10:46:39.406+05:30
783	1	1	POST	3146	2026-02-12 10:46:39.406+05:30
784	1	1	POST	3147	2026-02-12 10:46:39.406+05:30
785	1	1	POST	3148	2026-02-12 10:46:39.406+05:30
786	1	1	POST	3149	2026-02-12 10:46:39.406+05:30
787	1	1	POST	3000	2026-02-13 10:46:39.406+05:30
788	1	1	POST	3001	2026-02-13 10:46:39.406+05:30
789	1	1	POST	3002	2026-02-13 10:46:39.406+05:30
790	1	1	POST	3003	2026-02-13 10:46:39.406+05:30
791	1	1	POST	3004	2026-02-13 10:46:39.406+05:30
792	1	1	POST	3005	2026-02-13 10:46:39.406+05:30
793	1	1	POST	3006	2026-02-13 10:46:39.406+05:30
794	1	1	POST	3007	2026-02-13 10:46:39.406+05:30
795	1	1	POST	3008	2026-02-13 10:46:39.406+05:30
796	1	1	POST	3009	2026-02-13 10:46:39.406+05:30
797	1	1	POST	3010	2026-02-13 10:46:39.406+05:30
798	1	1	POST	3011	2026-02-13 10:46:39.406+05:30
799	1	1	POST	3012	2026-02-13 10:46:39.406+05:30
800	1	1	POST	3013	2026-02-13 10:46:39.406+05:30
801	1	1	POST	3014	2026-02-13 10:46:39.406+05:30
802	1	1	POST	3015	2026-02-13 10:46:39.406+05:30
803	1	1	POST	3016	2026-02-13 10:46:39.406+05:30
804	1	1	POST	3017	2026-02-13 10:46:39.406+05:30
805	1	1	POST	3018	2026-02-13 10:46:39.406+05:30
806	1	1	POST	3019	2026-02-13 10:46:39.406+05:30
807	1	1	POST	3020	2026-02-13 10:46:39.406+05:30
808	1	1	POST	3021	2026-02-13 10:46:39.406+05:30
809	1	1	POST	3022	2026-02-13 10:46:39.406+05:30
810	1	1	POST	3023	2026-02-13 10:46:39.406+05:30
811	1	1	POST	3024	2026-02-13 10:46:39.406+05:30
812	1	1	POST	3025	2026-02-13 10:46:39.406+05:30
813	1	1	POST	3026	2026-02-13 10:46:39.406+05:30
814	1	1	POST	3027	2026-02-13 10:46:39.406+05:30
815	1	1	POST	3028	2026-02-13 10:46:39.406+05:30
816	1	1	POST	3029	2026-02-13 10:46:39.406+05:30
817	1	1	POST	3030	2026-02-13 10:46:39.406+05:30
818	1	1	POST	3031	2026-02-13 10:46:39.406+05:30
819	1	1	POST	3032	2026-02-13 10:46:39.406+05:30
820	1	1	POST	3033	2026-02-13 10:46:39.406+05:30
821	1	1	POST	3034	2026-02-13 10:46:39.406+05:30
822	1	1	POST	3035	2026-02-13 10:46:39.406+05:30
823	1	1	POST	3036	2026-02-13 10:46:39.406+05:30
824	1	1	POST	3037	2026-02-13 10:46:39.406+05:30
825	1	1	POST	3038	2026-02-13 10:46:39.406+05:30
826	1	1	POST	3039	2026-02-13 10:46:39.406+05:30
827	1	1	POST	3040	2026-02-13 10:46:39.406+05:30
828	1	1	POST	3041	2026-02-13 10:46:39.406+05:30
829	1	1	POST	3042	2026-02-13 10:46:39.406+05:30
830	1	1	POST	3043	2026-02-13 10:46:39.406+05:30
831	1	1	POST	3044	2026-02-13 10:46:39.406+05:30
832	1	1	POST	3045	2026-02-13 10:46:39.406+05:30
833	1	1	POST	3046	2026-02-13 10:46:39.406+05:30
834	1	1	POST	3047	2026-02-13 10:46:39.406+05:30
835	1	1	POST	3048	2026-02-13 10:46:39.406+05:30
836	1	1	POST	3049	2026-02-13 10:46:39.406+05:30
837	1	1	POST	2900	2026-02-14 10:46:39.406+05:30
838	1	1	POST	2901	2026-02-14 10:46:39.406+05:30
839	1	1	POST	2902	2026-02-14 10:46:39.406+05:30
840	1	1	POST	2903	2026-02-14 10:46:39.406+05:30
841	1	1	POST	2904	2026-02-14 10:46:39.406+05:30
842	1	1	POST	2905	2026-02-14 10:46:39.406+05:30
843	1	1	POST	2906	2026-02-14 10:46:39.406+05:30
844	1	1	POST	2907	2026-02-14 10:46:39.406+05:30
845	1	1	POST	2908	2026-02-14 10:46:39.406+05:30
846	1	1	POST	2909	2026-02-14 10:46:39.406+05:30
847	1	1	POST	2910	2026-02-14 10:46:39.406+05:30
848	1	1	POST	2911	2026-02-14 10:46:39.406+05:30
849	1	1	POST	2912	2026-02-14 10:46:39.406+05:30
850	1	1	POST	2913	2026-02-14 10:46:39.406+05:30
851	1	1	POST	2914	2026-02-14 10:46:39.406+05:30
852	1	1	POST	2915	2026-02-14 10:46:39.406+05:30
853	1	1	POST	2916	2026-02-14 10:46:39.406+05:30
854	1	1	POST	2917	2026-02-14 10:46:39.406+05:30
855	1	1	POST	2918	2026-02-14 10:46:39.406+05:30
856	1	1	POST	2919	2026-02-14 10:46:39.406+05:30
857	1	1	POST	2920	2026-02-14 10:46:39.406+05:30
858	1	1	POST	2921	2026-02-14 10:46:39.406+05:30
859	1	1	POST	2922	2026-02-14 10:46:39.406+05:30
860	1	1	POST	2923	2026-02-14 10:46:39.406+05:30
861	1	1	POST	2924	2026-02-14 10:46:39.406+05:30
862	1	1	POST	2925	2026-02-14 10:46:39.406+05:30
863	1	1	POST	2926	2026-02-14 10:46:39.406+05:30
864	1	1	POST	2927	2026-02-14 10:46:39.406+05:30
865	1	1	POST	2928	2026-02-14 10:46:39.406+05:30
866	1	1	POST	2929	2026-02-14 10:46:39.406+05:30
867	1	1	POST	2930	2026-02-14 10:46:39.406+05:30
868	1	1	POST	2931	2026-02-14 10:46:39.406+05:30
869	1	1	POST	2932	2026-02-14 10:46:39.406+05:30
870	1	1	POST	2933	2026-02-14 10:46:39.406+05:30
871	1	1	POST	2934	2026-02-14 10:46:39.406+05:30
872	1	1	POST	2935	2026-02-14 10:46:39.406+05:30
873	1	1	POST	2936	2026-02-14 10:46:39.406+05:30
874	1	1	POST	2937	2026-02-14 10:46:39.406+05:30
875	1	1	POST	2938	2026-02-14 10:46:39.406+05:30
876	1	1	POST	2939	2026-02-14 10:46:39.406+05:30
877	1	1	POST	2940	2026-02-14 10:46:39.406+05:30
878	1	1	POST	2941	2026-02-14 10:46:39.406+05:30
879	1	1	POST	2942	2026-02-14 10:46:39.406+05:30
880	1	1	POST	2943	2026-02-14 10:46:39.406+05:30
881	1	1	POST	2944	2026-02-14 10:46:39.406+05:30
882	1	1	POST	2945	2026-02-14 10:46:39.406+05:30
883	1	1	POST	2946	2026-02-14 10:46:39.406+05:30
884	1	1	POST	2947	2026-02-14 10:46:39.406+05:30
885	1	1	POST	2948	2026-02-14 10:46:39.406+05:30
886	1	1	POST	2949	2026-02-14 10:46:39.406+05:30
887	1	1	POST	2800	2026-02-15 10:46:39.406+05:30
888	1	1	POST	2801	2026-02-15 10:46:39.406+05:30
889	1	1	POST	2802	2026-02-15 10:46:39.406+05:30
890	1	1	POST	2803	2026-02-15 10:46:39.406+05:30
891	1	1	POST	2804	2026-02-15 10:46:39.406+05:30
892	1	1	POST	2805	2026-02-15 10:46:39.406+05:30
893	1	1	POST	2806	2026-02-15 10:46:39.406+05:30
894	1	1	POST	2807	2026-02-15 10:46:39.406+05:30
895	1	1	POST	2808	2026-02-15 10:46:39.406+05:30
896	1	1	POST	2809	2026-02-15 10:46:39.406+05:30
897	1	1	POST	2810	2026-02-15 10:46:39.406+05:30
898	1	1	POST	2811	2026-02-15 10:46:39.406+05:30
899	1	1	POST	2812	2026-02-15 10:46:39.406+05:30
900	1	1	POST	2813	2026-02-15 10:46:39.406+05:30
901	1	1	POST	2814	2026-02-15 10:46:39.406+05:30
902	1	1	POST	2815	2026-02-15 10:46:39.406+05:30
903	1	1	POST	2816	2026-02-15 10:46:39.406+05:30
904	1	1	POST	2817	2026-02-15 10:46:39.406+05:30
905	1	1	POST	2818	2026-02-15 10:46:39.406+05:30
906	1	1	POST	2819	2026-02-15 10:46:39.406+05:30
907	1	1	POST	2820	2026-02-15 10:46:39.406+05:30
908	1	1	POST	2821	2026-02-15 10:46:39.406+05:30
909	1	1	POST	2822	2026-02-15 10:46:39.406+05:30
910	1	1	POST	2823	2026-02-15 10:46:39.406+05:30
911	1	1	POST	2824	2026-02-15 10:46:39.406+05:30
912	1	1	POST	2825	2026-02-15 10:46:39.406+05:30
913	1	1	POST	2826	2026-02-15 10:46:39.406+05:30
914	1	1	POST	2827	2026-02-15 10:46:39.406+05:30
915	1	1	POST	2828	2026-02-15 10:46:39.406+05:30
916	1	1	POST	2829	2026-02-15 10:46:39.406+05:30
917	1	1	POST	2830	2026-02-15 10:46:39.406+05:30
918	1	1	POST	2831	2026-02-15 10:46:39.406+05:30
919	1	1	POST	2832	2026-02-15 10:46:39.406+05:30
920	1	1	POST	2833	2026-02-15 10:46:39.406+05:30
921	1	1	POST	2834	2026-02-15 10:46:39.406+05:30
922	1	1	POST	2835	2026-02-15 10:46:39.406+05:30
923	1	1	POST	2836	2026-02-15 10:46:39.406+05:30
924	1	1	POST	2837	2026-02-15 10:46:39.406+05:30
925	1	1	POST	2838	2026-02-15 10:46:39.406+05:30
926	1	1	POST	2839	2026-02-15 10:46:39.406+05:30
927	1	1	POST	2840	2026-02-15 10:46:39.406+05:30
928	1	1	POST	2841	2026-02-15 10:46:39.406+05:30
929	1	1	POST	2842	2026-02-15 10:46:39.406+05:30
930	1	1	POST	2843	2026-02-15 10:46:39.406+05:30
931	1	1	POST	2844	2026-02-15 10:46:39.406+05:30
932	1	1	POST	2845	2026-02-15 10:46:39.406+05:30
933	1	1	POST	2846	2026-02-15 10:46:39.406+05:30
934	1	1	POST	2847	2026-02-15 10:46:39.406+05:30
935	1	1	POST	2848	2026-02-15 10:46:39.406+05:30
936	1	1	POST	2849	2026-02-15 10:46:39.406+05:30
937	1	1	POST	2700	2026-02-16 10:46:39.406+05:30
938	1	1	POST	2701	2026-02-16 10:46:39.406+05:30
939	1	1	POST	2702	2026-02-16 10:46:39.406+05:30
940	1	1	POST	2703	2026-02-16 10:46:39.406+05:30
941	1	1	POST	2704	2026-02-16 10:46:39.406+05:30
942	1	1	POST	2705	2026-02-16 10:46:39.406+05:30
943	1	1	POST	2706	2026-02-16 10:46:39.406+05:30
944	1	1	POST	2707	2026-02-16 10:46:39.406+05:30
945	1	1	POST	2708	2026-02-16 10:46:39.406+05:30
946	1	1	POST	2709	2026-02-16 10:46:39.406+05:30
947	1	1	POST	2710	2026-02-16 10:46:39.406+05:30
948	1	1	POST	2711	2026-02-16 10:46:39.406+05:30
949	1	1	POST	2712	2026-02-16 10:46:39.406+05:30
950	1	1	POST	2713	2026-02-16 10:46:39.406+05:30
951	1	1	POST	2714	2026-02-16 10:46:39.406+05:30
952	1	1	POST	2715	2026-02-16 10:46:39.406+05:30
953	1	1	POST	2716	2026-02-16 10:46:39.406+05:30
954	1	1	POST	2717	2026-02-16 10:46:39.406+05:30
955	1	1	POST	2718	2026-02-16 10:46:39.406+05:30
956	1	1	POST	2719	2026-02-16 10:46:39.406+05:30
957	1	1	POST	2720	2026-02-16 10:46:39.406+05:30
958	1	1	POST	2721	2026-02-16 10:46:39.406+05:30
959	1	1	POST	2722	2026-02-16 10:46:39.406+05:30
960	1	1	POST	2723	2026-02-16 10:46:39.406+05:30
961	1	1	POST	2724	2026-02-16 10:46:39.406+05:30
962	1	1	POST	2725	2026-02-16 10:46:39.406+05:30
963	1	1	POST	2726	2026-02-16 10:46:39.406+05:30
964	1	1	POST	2727	2026-02-16 10:46:39.406+05:30
965	1	1	POST	2728	2026-02-16 10:46:39.406+05:30
966	1	1	POST	2729	2026-02-16 10:46:39.406+05:30
967	1	1	POST	2730	2026-02-16 10:46:39.406+05:30
968	1	1	POST	2731	2026-02-16 10:46:39.406+05:30
969	1	1	POST	2732	2026-02-16 10:46:39.406+05:30
970	1	1	POST	2733	2026-02-16 10:46:39.406+05:30
971	1	1	POST	2734	2026-02-16 10:46:39.406+05:30
972	1	1	POST	2735	2026-02-16 10:46:39.406+05:30
973	1	1	POST	2736	2026-02-16 10:46:39.406+05:30
974	1	1	POST	2737	2026-02-16 10:46:39.406+05:30
975	1	1	POST	2738	2026-02-16 10:46:39.406+05:30
976	1	1	POST	2739	2026-02-16 10:46:39.406+05:30
977	1	1	POST	2740	2026-02-16 10:46:39.406+05:30
978	1	1	POST	2741	2026-02-16 10:46:39.406+05:30
979	1	1	POST	2742	2026-02-16 10:46:39.406+05:30
980	1	1	POST	2743	2026-02-16 10:46:39.406+05:30
981	1	1	POST	2744	2026-02-16 10:46:39.406+05:30
982	1	1	POST	2745	2026-02-16 10:46:39.406+05:30
983	1	1	POST	2746	2026-02-16 10:46:39.406+05:30
984	1	1	POST	2747	2026-02-16 10:46:39.406+05:30
985	1	1	POST	2748	2026-02-16 10:46:39.406+05:30
986	1	1	POST	2749	2026-02-16 10:46:39.406+05:30
987	1	1	POST	2600	2026-02-17 10:46:39.406+05:30
988	1	1	POST	2601	2026-02-17 10:46:39.406+05:30
989	1	1	POST	2602	2026-02-17 10:46:39.406+05:30
990	1	1	POST	2603	2026-02-17 10:46:39.406+05:30
991	1	1	POST	2604	2026-02-17 10:46:39.406+05:30
992	1	1	POST	2605	2026-02-17 10:46:39.406+05:30
993	1	1	POST	2606	2026-02-17 10:46:39.406+05:30
994	1	1	POST	2607	2026-02-17 10:46:39.406+05:30
995	1	1	POST	2608	2026-02-17 10:46:39.406+05:30
996	1	1	POST	2609	2026-02-17 10:46:39.406+05:30
997	1	1	POST	2610	2026-02-17 10:46:39.406+05:30
998	1	1	POST	2611	2026-02-17 10:46:39.406+05:30
999	1	1	POST	2612	2026-02-17 10:46:39.406+05:30
1000	1	1	POST	2613	2026-02-17 10:46:39.406+05:30
1001	1	1	POST	2614	2026-02-17 10:46:39.406+05:30
1002	1	1	POST	2615	2026-02-17 10:46:39.406+05:30
1003	1	1	POST	2616	2026-02-17 10:46:39.406+05:30
1004	1	1	POST	2617	2026-02-17 10:46:39.406+05:30
1005	1	1	POST	2618	2026-02-17 10:46:39.406+05:30
1006	1	1	POST	2619	2026-02-17 10:46:39.406+05:30
1007	1	1	POST	2620	2026-02-17 10:46:39.406+05:30
1008	1	1	POST	2621	2026-02-17 10:46:39.406+05:30
1009	1	1	POST	2622	2026-02-17 10:46:39.406+05:30
1010	1	1	POST	2623	2026-02-17 10:46:39.406+05:30
1011	1	1	POST	2624	2026-02-17 10:46:39.406+05:30
1012	1	1	POST	2625	2026-02-17 10:46:39.406+05:30
1013	1	1	POST	2626	2026-02-17 10:46:39.406+05:30
1014	1	1	POST	2627	2026-02-17 10:46:39.406+05:30
1015	1	1	POST	2628	2026-02-17 10:46:39.406+05:30
1016	1	1	POST	2629	2026-02-17 10:46:39.406+05:30
1017	1	1	POST	2630	2026-02-17 10:46:39.406+05:30
1018	1	1	POST	2631	2026-02-17 10:46:39.406+05:30
1019	1	1	POST	2632	2026-02-17 10:46:39.406+05:30
1020	1	1	POST	2633	2026-02-17 10:46:39.406+05:30
1021	1	1	POST	2634	2026-02-17 10:46:39.406+05:30
1022	1	1	POST	2635	2026-02-17 10:46:39.406+05:30
1023	1	1	POST	2636	2026-02-17 10:46:39.406+05:30
1024	1	1	POST	2637	2026-02-17 10:46:39.406+05:30
1025	1	1	POST	2638	2026-02-17 10:46:39.406+05:30
1026	1	1	POST	2639	2026-02-17 10:46:39.406+05:30
1027	1	1	POST	2640	2026-02-17 10:46:39.406+05:30
1028	1	1	POST	2641	2026-02-17 10:46:39.406+05:30
1029	1	1	POST	2642	2026-02-17 10:46:39.406+05:30
1030	1	1	POST	2643	2026-02-17 10:46:39.406+05:30
1031	1	1	POST	2644	2026-02-17 10:46:39.406+05:30
1032	1	1	POST	2645	2026-02-17 10:46:39.406+05:30
1033	1	1	POST	2646	2026-02-17 10:46:39.406+05:30
1034	1	1	POST	2647	2026-02-17 10:46:39.406+05:30
1035	1	1	POST	2648	2026-02-17 10:46:39.406+05:30
1036	1	1	POST	2649	2026-02-17 10:46:39.406+05:30
1037	1	1	POST	2500	2026-02-18 10:46:39.406+05:30
1038	1	1	POST	2501	2026-02-18 10:46:39.406+05:30
1039	1	1	POST	2502	2026-02-18 10:46:39.406+05:30
1040	1	1	POST	2503	2026-02-18 10:46:39.406+05:30
1041	1	1	POST	2504	2026-02-18 10:46:39.406+05:30
1042	1	1	POST	2505	2026-02-18 10:46:39.406+05:30
1043	1	1	POST	2506	2026-02-18 10:46:39.406+05:30
1044	1	1	POST	2507	2026-02-18 10:46:39.406+05:30
1045	1	1	POST	2508	2026-02-18 10:46:39.406+05:30
1046	1	1	POST	2509	2026-02-18 10:46:39.406+05:30
1047	1	1	POST	2510	2026-02-18 10:46:39.406+05:30
1048	1	1	POST	2511	2026-02-18 10:46:39.406+05:30
1049	1	1	POST	2512	2026-02-18 10:46:39.406+05:30
1050	1	1	POST	2513	2026-02-18 10:46:39.406+05:30
1051	1	1	POST	2514	2026-02-18 10:46:39.406+05:30
1052	1	1	POST	2515	2026-02-18 10:46:39.406+05:30
1053	1	1	POST	2516	2026-02-18 10:46:39.406+05:30
1054	1	1	POST	2517	2026-02-18 10:46:39.406+05:30
1055	1	1	POST	2518	2026-02-18 10:46:39.406+05:30
1056	1	1	POST	2519	2026-02-18 10:46:39.406+05:30
1057	1	1	POST	2520	2026-02-18 10:46:39.406+05:30
1058	1	1	POST	2521	2026-02-18 10:46:39.406+05:30
1059	1	1	POST	2522	2026-02-18 10:46:39.406+05:30
1060	1	1	POST	2523	2026-02-18 10:46:39.406+05:30
1061	1	1	POST	2524	2026-02-18 10:46:39.406+05:30
1062	1	1	POST	2525	2026-02-18 10:46:39.406+05:30
1063	1	1	POST	2526	2026-02-18 10:46:39.406+05:30
1064	1	1	POST	2527	2026-02-18 10:46:39.406+05:30
1065	1	1	POST	2528	2026-02-18 10:46:39.406+05:30
1066	1	1	POST	2529	2026-02-18 10:46:39.406+05:30
1067	1	1	POST	2530	2026-02-18 10:46:39.406+05:30
1068	1	1	POST	2531	2026-02-18 10:46:39.406+05:30
1069	1	1	POST	2532	2026-02-18 10:46:39.406+05:30
1070	1	1	POST	2533	2026-02-18 10:46:39.406+05:30
1071	1	1	POST	2534	2026-02-18 10:46:39.406+05:30
1072	1	1	POST	2535	2026-02-18 10:46:39.406+05:30
1073	1	1	POST	2536	2026-02-18 10:46:39.406+05:30
1074	1	1	POST	2537	2026-02-18 10:46:39.406+05:30
1075	1	1	POST	2538	2026-02-18 10:46:39.406+05:30
1076	1	1	POST	2539	2026-02-18 10:46:39.406+05:30
1077	1	1	POST	2540	2026-02-18 10:46:39.406+05:30
1078	1	1	POST	2541	2026-02-18 10:46:39.406+05:30
1079	1	1	POST	2542	2026-02-18 10:46:39.406+05:30
1080	1	1	POST	2543	2026-02-18 10:46:39.406+05:30
1081	1	1	POST	2544	2026-02-18 10:46:39.406+05:30
1082	1	1	POST	2545	2026-02-18 10:46:39.406+05:30
1083	1	1	POST	2546	2026-02-18 10:46:39.406+05:30
1084	1	1	POST	2547	2026-02-18 10:46:39.406+05:30
1085	1	1	POST	2548	2026-02-18 10:46:39.406+05:30
1086	1	1	POST	2549	2026-02-18 10:46:39.406+05:30
1087	1	1	POST	2400	2026-02-19 10:46:39.406+05:30
1088	1	1	POST	2401	2026-02-19 10:46:39.406+05:30
1089	1	1	POST	2402	2026-02-19 10:46:39.406+05:30
1090	1	1	POST	2403	2026-02-19 10:46:39.406+05:30
1091	1	1	POST	2404	2026-02-19 10:46:39.406+05:30
1092	1	1	POST	2405	2026-02-19 10:46:39.406+05:30
1093	1	1	POST	2406	2026-02-19 10:46:39.406+05:30
1094	1	1	POST	2407	2026-02-19 10:46:39.406+05:30
1095	1	1	POST	2408	2026-02-19 10:46:39.406+05:30
1096	1	1	POST	2409	2026-02-19 10:46:39.406+05:30
1097	1	1	POST	2410	2026-02-19 10:46:39.406+05:30
1098	1	1	POST	2411	2026-02-19 10:46:39.406+05:30
1099	1	1	POST	2412	2026-02-19 10:46:39.406+05:30
1100	1	1	POST	2413	2026-02-19 10:46:39.406+05:30
1101	1	1	POST	2414	2026-02-19 10:46:39.406+05:30
1102	1	1	POST	2415	2026-02-19 10:46:39.406+05:30
1103	1	1	POST	2416	2026-02-19 10:46:39.406+05:30
1104	1	1	POST	2417	2026-02-19 10:46:39.406+05:30
1105	1	1	POST	2418	2026-02-19 10:46:39.406+05:30
1106	1	1	POST	2419	2026-02-19 10:46:39.406+05:30
1107	1	1	POST	2420	2026-02-19 10:46:39.406+05:30
1108	1	1	POST	2421	2026-02-19 10:46:39.406+05:30
1109	1	1	POST	2422	2026-02-19 10:46:39.406+05:30
1110	1	1	POST	2423	2026-02-19 10:46:39.406+05:30
1111	1	1	POST	2424	2026-02-19 10:46:39.406+05:30
1112	1	1	POST	2425	2026-02-19 10:46:39.406+05:30
1113	1	1	POST	2426	2026-02-19 10:46:39.406+05:30
1114	1	1	POST	2427	2026-02-19 10:46:39.406+05:30
1115	1	1	POST	2428	2026-02-19 10:46:39.406+05:30
1116	1	1	POST	2429	2026-02-19 10:46:39.406+05:30
1117	1	1	POST	2430	2026-02-19 10:46:39.406+05:30
1118	1	1	POST	2431	2026-02-19 10:46:39.406+05:30
1119	1	1	POST	2432	2026-02-19 10:46:39.406+05:30
1120	1	1	POST	2433	2026-02-19 10:46:39.406+05:30
1121	1	1	POST	2434	2026-02-19 10:46:39.406+05:30
1122	1	1	POST	2435	2026-02-19 10:46:39.406+05:30
1123	1	1	POST	2436	2026-02-19 10:46:39.406+05:30
1124	1	1	POST	2437	2026-02-19 10:46:39.406+05:30
1125	1	1	POST	2438	2026-02-19 10:46:39.406+05:30
1126	1	1	POST	2439	2026-02-19 10:46:39.406+05:30
1127	1	1	POST	2440	2026-02-19 10:46:39.406+05:30
1128	1	1	POST	2441	2026-02-19 10:46:39.406+05:30
1129	1	1	POST	2442	2026-02-19 10:46:39.406+05:30
1130	1	1	POST	2443	2026-02-19 10:46:39.406+05:30
1131	1	1	POST	2444	2026-02-19 10:46:39.406+05:30
1132	1	1	POST	2445	2026-02-19 10:46:39.406+05:30
1133	1	1	POST	2446	2026-02-19 10:46:39.406+05:30
1134	1	1	POST	2447	2026-02-19 10:46:39.406+05:30
1135	1	1	POST	2448	2026-02-19 10:46:39.406+05:30
1136	1	1	POST	2449	2026-02-19 10:46:39.406+05:30
1137	1	1	POST	2300	2026-02-20 10:46:39.406+05:30
1138	1	1	POST	2301	2026-02-20 10:46:39.406+05:30
1139	1	1	POST	2302	2026-02-20 10:46:39.406+05:30
1140	1	1	POST	2303	2026-02-20 10:46:39.406+05:30
1141	1	1	POST	2304	2026-02-20 10:46:39.406+05:30
1142	1	1	POST	2305	2026-02-20 10:46:39.406+05:30
1143	1	1	POST	2306	2026-02-20 10:46:39.406+05:30
1144	1	1	POST	2307	2026-02-20 10:46:39.406+05:30
1145	1	1	POST	2308	2026-02-20 10:46:39.406+05:30
1146	1	1	POST	2309	2026-02-20 10:46:39.406+05:30
1147	1	1	POST	2310	2026-02-20 10:46:39.406+05:30
1148	1	1	POST	2311	2026-02-20 10:46:39.406+05:30
1149	1	1	POST	2312	2026-02-20 10:46:39.406+05:30
1150	1	1	POST	2313	2026-02-20 10:46:39.406+05:30
1151	1	1	POST	2314	2026-02-20 10:46:39.406+05:30
1152	1	1	POST	2315	2026-02-20 10:46:39.406+05:30
1153	1	1	POST	2316	2026-02-20 10:46:39.406+05:30
1154	1	1	POST	2317	2026-02-20 10:46:39.406+05:30
1155	1	1	POST	2318	2026-02-20 10:46:39.406+05:30
1156	1	1	POST	2319	2026-02-20 10:46:39.406+05:30
1157	1	1	POST	2320	2026-02-20 10:46:39.406+05:30
1158	1	1	POST	2321	2026-02-20 10:46:39.406+05:30
1159	1	1	POST	2322	2026-02-20 10:46:39.406+05:30
1160	1	1	POST	2323	2026-02-20 10:46:39.406+05:30
1161	1	1	POST	2324	2026-02-20 10:46:39.406+05:30
1162	1	1	POST	2325	2026-02-20 10:46:39.406+05:30
1163	1	1	POST	2326	2026-02-20 10:46:39.406+05:30
1164	1	1	POST	2327	2026-02-20 10:46:39.406+05:30
1165	1	1	POST	2328	2026-02-20 10:46:39.406+05:30
1166	1	1	POST	2329	2026-02-20 10:46:39.406+05:30
1167	1	1	POST	2330	2026-02-20 10:46:39.406+05:30
1168	1	1	POST	2331	2026-02-20 10:46:39.406+05:30
1169	1	1	POST	2332	2026-02-20 10:46:39.406+05:30
1170	1	1	POST	2333	2026-02-20 10:46:39.406+05:30
1171	1	1	POST	2334	2026-02-20 10:46:39.406+05:30
1172	1	1	POST	2335	2026-02-20 10:46:39.406+05:30
1173	1	1	POST	2336	2026-02-20 10:46:39.406+05:30
1174	1	1	POST	2337	2026-02-20 10:46:39.406+05:30
1175	1	1	POST	2338	2026-02-20 10:46:39.406+05:30
1176	1	1	POST	2339	2026-02-20 10:46:39.406+05:30
1177	1	1	POST	2340	2026-02-20 10:46:39.406+05:30
1178	1	1	POST	2341	2026-02-20 10:46:39.406+05:30
1179	1	1	POST	2342	2026-02-20 10:46:39.406+05:30
1180	1	1	POST	2343	2026-02-20 10:46:39.406+05:30
1181	1	1	POST	2344	2026-02-20 10:46:39.406+05:30
1182	1	1	POST	2345	2026-02-20 10:46:39.406+05:30
1183	1	1	POST	2346	2026-02-20 10:46:39.406+05:30
1184	1	1	POST	2347	2026-02-20 10:46:39.406+05:30
1185	1	1	POST	2348	2026-02-20 10:46:39.406+05:30
1186	1	1	POST	2349	2026-02-20 10:46:39.406+05:30
1187	1	1	POST	2200	2026-02-21 10:46:39.406+05:30
1188	1	1	POST	2201	2026-02-21 10:46:39.406+05:30
1189	1	1	POST	2202	2026-02-21 10:46:39.406+05:30
1190	1	1	POST	2203	2026-02-21 10:46:39.406+05:30
1191	1	1	POST	2204	2026-02-21 10:46:39.406+05:30
1192	1	1	POST	2205	2026-02-21 10:46:39.406+05:30
1193	1	1	POST	2206	2026-02-21 10:46:39.406+05:30
1194	1	1	POST	2207	2026-02-21 10:46:39.406+05:30
1195	1	1	POST	2208	2026-02-21 10:46:39.406+05:30
1196	1	1	POST	2209	2026-02-21 10:46:39.406+05:30
1197	1	1	POST	2210	2026-02-21 10:46:39.406+05:30
1198	1	1	POST	2211	2026-02-21 10:46:39.406+05:30
1199	1	1	POST	2212	2026-02-21 10:46:39.406+05:30
1200	1	1	POST	2213	2026-02-21 10:46:39.406+05:30
1201	1	1	POST	2214	2026-02-21 10:46:39.406+05:30
1202	1	1	POST	2215	2026-02-21 10:46:39.406+05:30
1203	1	1	POST	2216	2026-02-21 10:46:39.406+05:30
1204	1	1	POST	2217	2026-02-21 10:46:39.406+05:30
1205	1	1	POST	2218	2026-02-21 10:46:39.406+05:30
1206	1	1	POST	2219	2026-02-21 10:46:39.406+05:30
1207	1	1	POST	2220	2026-02-21 10:46:39.406+05:30
1208	1	1	POST	2221	2026-02-21 10:46:39.406+05:30
1209	1	1	POST	2222	2026-02-21 10:46:39.406+05:30
1210	1	1	POST	2223	2026-02-21 10:46:39.406+05:30
1211	1	1	POST	2224	2026-02-21 10:46:39.406+05:30
1212	1	1	POST	2225	2026-02-21 10:46:39.406+05:30
1213	1	1	POST	2226	2026-02-21 10:46:39.406+05:30
1214	1	1	POST	2227	2026-02-21 10:46:39.406+05:30
1215	1	1	POST	2228	2026-02-21 10:46:39.406+05:30
1216	1	1	POST	2229	2026-02-21 10:46:39.406+05:30
1217	1	1	POST	2230	2026-02-21 10:46:39.406+05:30
1218	1	1	POST	2231	2026-02-21 10:46:39.406+05:30
1219	1	1	POST	2232	2026-02-21 10:46:39.406+05:30
1220	1	1	POST	2233	2026-02-21 10:46:39.406+05:30
1221	1	1	POST	2234	2026-02-21 10:46:39.406+05:30
1222	1	1	POST	2235	2026-02-21 10:46:39.406+05:30
1223	1	1	POST	2236	2026-02-21 10:46:39.406+05:30
1224	1	1	POST	2237	2026-02-21 10:46:39.406+05:30
1225	1	1	POST	2238	2026-02-21 10:46:39.406+05:30
1226	1	1	POST	2239	2026-02-21 10:46:39.406+05:30
1227	1	1	POST	2240	2026-02-21 10:46:39.406+05:30
1228	1	1	POST	2241	2026-02-21 10:46:39.406+05:30
1229	1	1	POST	2242	2026-02-21 10:46:39.406+05:30
1230	1	1	POST	2243	2026-02-21 10:46:39.406+05:30
1231	1	1	POST	2244	2026-02-21 10:46:39.406+05:30
1232	1	1	POST	2245	2026-02-21 10:46:39.406+05:30
1233	1	1	POST	2246	2026-02-21 10:46:39.406+05:30
1234	1	1	POST	2247	2026-02-21 10:46:39.406+05:30
1235	1	1	POST	2248	2026-02-21 10:46:39.406+05:30
1236	1	1	POST	2249	2026-02-21 10:46:39.406+05:30
1237	1	1	POST	2100	2026-02-22 10:46:39.406+05:30
1238	1	1	POST	2101	2026-02-22 10:46:39.406+05:30
1239	1	1	POST	2102	2026-02-22 10:46:39.406+05:30
1240	1	1	POST	2103	2026-02-22 10:46:39.406+05:30
1241	1	1	POST	2104	2026-02-22 10:46:39.406+05:30
1242	1	1	POST	2105	2026-02-22 10:46:39.406+05:30
1243	1	1	POST	2106	2026-02-22 10:46:39.406+05:30
1244	1	1	POST	2107	2026-02-22 10:46:39.406+05:30
1245	1	1	POST	2108	2026-02-22 10:46:39.406+05:30
1246	1	1	POST	2109	2026-02-22 10:46:39.406+05:30
1247	1	1	POST	2110	2026-02-22 10:46:39.406+05:30
1248	1	1	POST	2111	2026-02-22 10:46:39.406+05:30
1249	1	1	POST	2112	2026-02-22 10:46:39.406+05:30
1250	1	1	POST	2113	2026-02-22 10:46:39.406+05:30
1251	1	1	POST	2114	2026-02-22 10:46:39.406+05:30
1252	1	1	POST	2115	2026-02-22 10:46:39.406+05:30
1253	1	1	POST	2116	2026-02-22 10:46:39.406+05:30
1254	1	1	POST	2117	2026-02-22 10:46:39.406+05:30
1255	1	1	POST	2118	2026-02-22 10:46:39.406+05:30
1256	1	1	POST	2119	2026-02-22 10:46:39.406+05:30
1257	1	1	POST	2120	2026-02-22 10:46:39.406+05:30
1258	1	1	POST	2121	2026-02-22 10:46:39.406+05:30
1259	1	1	POST	2122	2026-02-22 10:46:39.406+05:30
1260	1	1	POST	2123	2026-02-22 10:46:39.406+05:30
1261	1	1	POST	2124	2026-02-22 10:46:39.406+05:30
1262	1	1	POST	2125	2026-02-22 10:46:39.406+05:30
1263	1	1	POST	2126	2026-02-22 10:46:39.406+05:30
1264	1	1	POST	2127	2026-02-22 10:46:39.406+05:30
1265	1	1	POST	2128	2026-02-22 10:46:39.406+05:30
1266	1	1	POST	2129	2026-02-22 10:46:39.406+05:30
1267	1	1	POST	2130	2026-02-22 10:46:39.406+05:30
1268	1	1	POST	2131	2026-02-22 10:46:39.406+05:30
1269	1	1	POST	2132	2026-02-22 10:46:39.406+05:30
1270	1	1	POST	2133	2026-02-22 10:46:39.406+05:30
1271	1	1	POST	2134	2026-02-22 10:46:39.406+05:30
1272	1	1	POST	2135	2026-02-22 10:46:39.406+05:30
1273	1	1	POST	2136	2026-02-22 10:46:39.406+05:30
1274	1	1	POST	2137	2026-02-22 10:46:39.406+05:30
1275	1	1	POST	2138	2026-02-22 10:46:39.406+05:30
1276	1	1	POST	2139	2026-02-22 10:46:39.406+05:30
1277	1	1	POST	2140	2026-02-22 10:46:39.406+05:30
1278	1	1	POST	2141	2026-02-22 10:46:39.406+05:30
1279	1	1	POST	2142	2026-02-22 10:46:39.406+05:30
1280	1	1	POST	2143	2026-02-22 10:46:39.406+05:30
1281	1	1	POST	2144	2026-02-22 10:46:39.406+05:30
1282	1	1	POST	2145	2026-02-22 10:46:39.406+05:30
1283	1	1	POST	2146	2026-02-22 10:46:39.406+05:30
1284	1	1	POST	2147	2026-02-22 10:46:39.406+05:30
1285	1	1	POST	2148	2026-02-22 10:46:39.406+05:30
1286	1	1	POST	2149	2026-02-22 10:46:39.406+05:30
1287	1	1	POST	2000	2026-02-23 10:46:39.406+05:30
1288	1	1	POST	2001	2026-02-23 10:46:39.406+05:30
1289	1	1	POST	2002	2026-02-23 10:46:39.406+05:30
1290	1	1	POST	2003	2026-02-23 10:46:39.406+05:30
1291	1	1	POST	2004	2026-02-23 10:46:39.406+05:30
1292	1	1	POST	2005	2026-02-23 10:46:39.406+05:30
1293	1	1	POST	2006	2026-02-23 10:46:39.406+05:30
1294	1	1	POST	2007	2026-02-23 10:46:39.406+05:30
1295	1	1	POST	2008	2026-02-23 10:46:39.406+05:30
1296	1	1	POST	2009	2026-02-23 10:46:39.406+05:30
1297	1	1	POST	2010	2026-02-23 10:46:39.406+05:30
1298	1	1	POST	2011	2026-02-23 10:46:39.406+05:30
1299	1	1	POST	2012	2026-02-23 10:46:39.406+05:30
1300	1	1	POST	2013	2026-02-23 10:46:39.406+05:30
1301	1	1	POST	2014	2026-02-23 10:46:39.406+05:30
1302	1	1	POST	2015	2026-02-23 10:46:39.406+05:30
1303	1	1	POST	2016	2026-02-23 10:46:39.406+05:30
1304	1	1	POST	2017	2026-02-23 10:46:39.406+05:30
1305	1	1	POST	2018	2026-02-23 10:46:39.406+05:30
1306	1	1	POST	2019	2026-02-23 10:46:39.406+05:30
1307	1	1	POST	2020	2026-02-23 10:46:39.406+05:30
1308	1	1	POST	2021	2026-02-23 10:46:39.406+05:30
1309	1	1	POST	2022	2026-02-23 10:46:39.406+05:30
1310	1	1	POST	2023	2026-02-23 10:46:39.406+05:30
1311	1	1	POST	2024	2026-02-23 10:46:39.406+05:30
1312	1	1	POST	2025	2026-02-23 10:46:39.406+05:30
1313	1	1	POST	2026	2026-02-23 10:46:39.406+05:30
1314	1	1	POST	2027	2026-02-23 10:46:39.406+05:30
1315	1	1	POST	2028	2026-02-23 10:46:39.406+05:30
1316	1	1	POST	2029	2026-02-23 10:46:39.406+05:30
1317	1	1	POST	2030	2026-02-23 10:46:39.406+05:30
1318	1	1	POST	2031	2026-02-23 10:46:39.406+05:30
1319	1	1	POST	2032	2026-02-23 10:46:39.406+05:30
1320	1	1	POST	2033	2026-02-23 10:46:39.406+05:30
1321	1	1	POST	2034	2026-02-23 10:46:39.406+05:30
1322	1	1	POST	2035	2026-02-23 10:46:39.406+05:30
1323	1	1	POST	2036	2026-02-23 10:46:39.406+05:30
1324	1	1	POST	2037	2026-02-23 10:46:39.406+05:30
1325	1	1	POST	2038	2026-02-23 10:46:39.406+05:30
1326	1	1	POST	2039	2026-02-23 10:46:39.406+05:30
1327	1	1	POST	2040	2026-02-23 10:46:39.406+05:30
1328	1	1	POST	2041	2026-02-23 10:46:39.406+05:30
1329	1	1	POST	2042	2026-02-23 10:46:39.406+05:30
1330	1	1	POST	2043	2026-02-23 10:46:39.406+05:30
1331	1	1	POST	2044	2026-02-23 10:46:39.406+05:30
1332	1	1	POST	2045	2026-02-23 10:46:39.406+05:30
1333	1	1	POST	2046	2026-02-23 10:46:39.406+05:30
1334	1	1	POST	2047	2026-02-23 10:46:39.406+05:30
1335	1	1	POST	2048	2026-02-23 10:46:39.406+05:30
1336	1	1	POST	2049	2026-02-23 10:46:39.406+05:30
1337	1	1	POST	1900	2026-02-24 10:46:39.406+05:30
1338	1	1	POST	1901	2026-02-24 10:46:39.406+05:30
1339	1	1	POST	1902	2026-02-24 10:46:39.406+05:30
1340	1	1	POST	1903	2026-02-24 10:46:39.406+05:30
1341	1	1	POST	1904	2026-02-24 10:46:39.406+05:30
1342	1	1	POST	1905	2026-02-24 10:46:39.406+05:30
1343	1	1	POST	1906	2026-02-24 10:46:39.406+05:30
1344	1	1	POST	1907	2026-02-24 10:46:39.406+05:30
1345	1	1	POST	1908	2026-02-24 10:46:39.406+05:30
1346	1	1	POST	1909	2026-02-24 10:46:39.406+05:30
1347	1	1	POST	1910	2026-02-24 10:46:39.406+05:30
1348	1	1	POST	1911	2026-02-24 10:46:39.406+05:30
1349	1	1	POST	1912	2026-02-24 10:46:39.406+05:30
1350	1	1	POST	1913	2026-02-24 10:46:39.406+05:30
1351	1	1	POST	1914	2026-02-24 10:46:39.406+05:30
1352	1	1	POST	1915	2026-02-24 10:46:39.406+05:30
1353	1	1	POST	1916	2026-02-24 10:46:39.406+05:30
1354	1	1	POST	1917	2026-02-24 10:46:39.406+05:30
1355	1	1	POST	1918	2026-02-24 10:46:39.406+05:30
1356	1	1	POST	1919	2026-02-24 10:46:39.406+05:30
1357	1	1	POST	1920	2026-02-24 10:46:39.406+05:30
1358	1	1	POST	1921	2026-02-24 10:46:39.406+05:30
1359	1	1	POST	1922	2026-02-24 10:46:39.406+05:30
1360	1	1	POST	1923	2026-02-24 10:46:39.406+05:30
1361	1	1	POST	1924	2026-02-24 10:46:39.406+05:30
1362	1	1	POST	1925	2026-02-24 10:46:39.406+05:30
1363	1	1	POST	1926	2026-02-24 10:46:39.406+05:30
1364	1	1	POST	1927	2026-02-24 10:46:39.406+05:30
1365	1	1	POST	1928	2026-02-24 10:46:39.406+05:30
1366	1	1	POST	1929	2026-02-24 10:46:39.406+05:30
1367	1	1	POST	1930	2026-02-24 10:46:39.406+05:30
1368	1	1	POST	1931	2026-02-24 10:46:39.406+05:30
1369	1	1	POST	1932	2026-02-24 10:46:39.406+05:30
1370	1	1	POST	1933	2026-02-24 10:46:39.406+05:30
1371	1	1	POST	1934	2026-02-24 10:46:39.406+05:30
1372	1	1	POST	1935	2026-02-24 10:46:39.406+05:30
1373	1	1	POST	1936	2026-02-24 10:46:39.406+05:30
1374	1	1	POST	1937	2026-02-24 10:46:39.406+05:30
1375	1	1	POST	1938	2026-02-24 10:46:39.406+05:30
1376	1	1	POST	1939	2026-02-24 10:46:39.406+05:30
1377	1	1	POST	1940	2026-02-24 10:46:39.406+05:30
1378	1	1	POST	1941	2026-02-24 10:46:39.406+05:30
1379	1	1	POST	1942	2026-02-24 10:46:39.406+05:30
1380	1	1	POST	1943	2026-02-24 10:46:39.406+05:30
1381	1	1	POST	1944	2026-02-24 10:46:39.406+05:30
1382	1	1	POST	1945	2026-02-24 10:46:39.406+05:30
1383	1	1	POST	1946	2026-02-24 10:46:39.406+05:30
1384	1	1	POST	1947	2026-02-24 10:46:39.406+05:30
1385	1	1	POST	1948	2026-02-24 10:46:39.406+05:30
1386	1	1	POST	1949	2026-02-24 10:46:39.406+05:30
1387	1	1	POST	1800	2026-02-25 10:46:39.406+05:30
1388	1	1	POST	1801	2026-02-25 10:46:39.406+05:30
1389	1	1	POST	1802	2026-02-25 10:46:39.406+05:30
1390	1	1	POST	1803	2026-02-25 10:46:39.406+05:30
1391	1	1	POST	1804	2026-02-25 10:46:39.406+05:30
1392	1	1	POST	1805	2026-02-25 10:46:39.406+05:30
1393	1	1	POST	1806	2026-02-25 10:46:39.406+05:30
1394	1	1	POST	1807	2026-02-25 10:46:39.406+05:30
1395	1	1	POST	1808	2026-02-25 10:46:39.406+05:30
1396	1	1	POST	1809	2026-02-25 10:46:39.406+05:30
1397	1	1	POST	1810	2026-02-25 10:46:39.406+05:30
1398	1	1	POST	1811	2026-02-25 10:46:39.406+05:30
1399	1	1	POST	1812	2026-02-25 10:46:39.406+05:30
1400	1	1	POST	1813	2026-02-25 10:46:39.406+05:30
1401	1	1	POST	1814	2026-02-25 10:46:39.406+05:30
1402	1	1	POST	1815	2026-02-25 10:46:39.406+05:30
1403	1	1	POST	1816	2026-02-25 10:46:39.406+05:30
1404	1	1	POST	1817	2026-02-25 10:46:39.406+05:30
1405	1	1	POST	1818	2026-02-25 10:46:39.406+05:30
1406	1	1	POST	1819	2026-02-25 10:46:39.406+05:30
1407	1	1	POST	1820	2026-02-25 10:46:39.406+05:30
1408	1	1	POST	1821	2026-02-25 10:46:39.406+05:30
1409	1	1	POST	1822	2026-02-25 10:46:39.406+05:30
1410	1	1	POST	1823	2026-02-25 10:46:39.406+05:30
1411	1	1	POST	1824	2026-02-25 10:46:39.406+05:30
1412	1	1	POST	1825	2026-02-25 10:46:39.406+05:30
1413	1	1	POST	1826	2026-02-25 10:46:39.406+05:30
1414	1	1	POST	1827	2026-02-25 10:46:39.406+05:30
1415	1	1	POST	1828	2026-02-25 10:46:39.406+05:30
1416	1	1	POST	1829	2026-02-25 10:46:39.406+05:30
1417	1	1	POST	1830	2026-02-25 10:46:39.406+05:30
1418	1	1	POST	1831	2026-02-25 10:46:39.406+05:30
1419	1	1	POST	1832	2026-02-25 10:46:39.406+05:30
1420	1	1	POST	1833	2026-02-25 10:46:39.406+05:30
1421	1	1	POST	1834	2026-02-25 10:46:39.406+05:30
1422	1	1	POST	1835	2026-02-25 10:46:39.406+05:30
1423	1	1	POST	1836	2026-02-25 10:46:39.406+05:30
1424	1	1	POST	1837	2026-02-25 10:46:39.406+05:30
1425	1	1	POST	1838	2026-02-25 10:46:39.406+05:30
1426	1	1	POST	1839	2026-02-25 10:46:39.406+05:30
1427	1	1	POST	1840	2026-02-25 10:46:39.406+05:30
1428	1	1	POST	1841	2026-02-25 10:46:39.406+05:30
1429	1	1	POST	1842	2026-02-25 10:46:39.406+05:30
1430	1	1	POST	1843	2026-02-25 10:46:39.406+05:30
1431	1	1	POST	1844	2026-02-25 10:46:39.406+05:30
1432	1	1	POST	1845	2026-02-25 10:46:39.406+05:30
1433	1	1	POST	1846	2026-02-25 10:46:39.406+05:30
1434	1	1	POST	1847	2026-02-25 10:46:39.406+05:30
1435	1	1	POST	1848	2026-02-25 10:46:39.406+05:30
1436	1	1	POST	1849	2026-02-25 10:46:39.406+05:30
1437	1	1	POST	1700	2026-02-26 10:46:39.406+05:30
1438	1	1	POST	1701	2026-02-26 10:46:39.406+05:30
1439	1	1	POST	1702	2026-02-26 10:46:39.406+05:30
1440	1	1	POST	1703	2026-02-26 10:46:39.406+05:30
1441	1	1	POST	1704	2026-02-26 10:46:39.406+05:30
1442	1	1	POST	1705	2026-02-26 10:46:39.406+05:30
1443	1	1	POST	1706	2026-02-26 10:46:39.406+05:30
1444	1	1	POST	1707	2026-02-26 10:46:39.406+05:30
1445	1	1	POST	1708	2026-02-26 10:46:39.406+05:30
1446	1	1	POST	1709	2026-02-26 10:46:39.406+05:30
1447	1	1	POST	1710	2026-02-26 10:46:39.406+05:30
1448	1	1	POST	1711	2026-02-26 10:46:39.406+05:30
1449	1	1	POST	1712	2026-02-26 10:46:39.406+05:30
1450	1	1	POST	1713	2026-02-26 10:46:39.406+05:30
1451	1	1	POST	1714	2026-02-26 10:46:39.406+05:30
1452	1	1	POST	1715	2026-02-26 10:46:39.406+05:30
1453	1	1	POST	1716	2026-02-26 10:46:39.406+05:30
1454	1	1	POST	1717	2026-02-26 10:46:39.406+05:30
1455	1	1	POST	1718	2026-02-26 10:46:39.406+05:30
1456	1	1	POST	1719	2026-02-26 10:46:39.406+05:30
1457	1	1	POST	1720	2026-02-26 10:46:39.406+05:30
1458	1	1	POST	1721	2026-02-26 10:46:39.406+05:30
1459	1	1	POST	1722	2026-02-26 10:46:39.406+05:30
1460	1	1	POST	1723	2026-02-26 10:46:39.406+05:30
1461	1	1	POST	1724	2026-02-26 10:46:39.406+05:30
1462	1	1	POST	1725	2026-02-26 10:46:39.406+05:30
1463	1	1	POST	1726	2026-02-26 10:46:39.406+05:30
1464	1	1	POST	1727	2026-02-26 10:46:39.406+05:30
1465	1	1	POST	1728	2026-02-26 10:46:39.406+05:30
1466	1	1	POST	1729	2026-02-26 10:46:39.406+05:30
1467	1	1	POST	1730	2026-02-26 10:46:39.406+05:30
1468	1	1	POST	1731	2026-02-26 10:46:39.406+05:30
1469	1	1	POST	1732	2026-02-26 10:46:39.406+05:30
1470	1	1	POST	1733	2026-02-26 10:46:39.406+05:30
1471	1	1	POST	1734	2026-02-26 10:46:39.406+05:30
1472	1	1	POST	1735	2026-02-26 10:46:39.406+05:30
1473	1	1	POST	1736	2026-02-26 10:46:39.406+05:30
1474	1	1	POST	1737	2026-02-26 10:46:39.406+05:30
1475	1	1	POST	1738	2026-02-26 10:46:39.406+05:30
1476	1	1	POST	1739	2026-02-26 10:46:39.406+05:30
1477	1	1	POST	1740	2026-02-26 10:46:39.406+05:30
1478	1	1	POST	1741	2026-02-26 10:46:39.406+05:30
1479	1	1	POST	1742	2026-02-26 10:46:39.406+05:30
1480	1	1	POST	1743	2026-02-26 10:46:39.406+05:30
1481	1	1	POST	1744	2026-02-26 10:46:39.406+05:30
1482	1	1	POST	1745	2026-02-26 10:46:39.406+05:30
1483	1	1	POST	1746	2026-02-26 10:46:39.406+05:30
1484	1	1	POST	1747	2026-02-26 10:46:39.406+05:30
1485	1	1	POST	1748	2026-02-26 10:46:39.406+05:30
1486	1	1	POST	1749	2026-02-26 10:46:39.406+05:30
1487	1	1	POST	1600	2026-02-27 10:46:39.406+05:30
1488	1	1	POST	1601	2026-02-27 10:46:39.406+05:30
1489	1	1	POST	1602	2026-02-27 10:46:39.406+05:30
1490	1	1	POST	1603	2026-02-27 10:46:39.406+05:30
1491	1	1	POST	1604	2026-02-27 10:46:39.406+05:30
1492	1	1	POST	1605	2026-02-27 10:46:39.406+05:30
1493	1	1	POST	1606	2026-02-27 10:46:39.406+05:30
1494	1	1	POST	1607	2026-02-27 10:46:39.406+05:30
1495	1	1	POST	1608	2026-02-27 10:46:39.406+05:30
1496	1	1	POST	1609	2026-02-27 10:46:39.406+05:30
1497	1	1	POST	1610	2026-02-27 10:46:39.406+05:30
1498	1	1	POST	1611	2026-02-27 10:46:39.406+05:30
1499	1	1	POST	1612	2026-02-27 10:46:39.406+05:30
1500	1	1	POST	1613	2026-02-27 10:46:39.406+05:30
1501	1	1	POST	1614	2026-02-27 10:46:39.406+05:30
1502	1	1	POST	1615	2026-02-27 10:46:39.406+05:30
1503	1	1	POST	1616	2026-02-27 10:46:39.406+05:30
1504	1	1	POST	1617	2026-02-27 10:46:39.406+05:30
1505	1	1	POST	1618	2026-02-27 10:46:39.406+05:30
1506	1	1	POST	1619	2026-02-27 10:46:39.406+05:30
1507	1	1	POST	1620	2026-02-27 10:46:39.406+05:30
1508	1	1	POST	1621	2026-02-27 10:46:39.406+05:30
1509	1	1	POST	1622	2026-02-27 10:46:39.406+05:30
1510	1	1	POST	1623	2026-02-27 10:46:39.406+05:30
1511	1	1	POST	1624	2026-02-27 10:46:39.406+05:30
1512	1	1	POST	1625	2026-02-27 10:46:39.406+05:30
1513	1	1	POST	1626	2026-02-27 10:46:39.406+05:30
1514	1	1	POST	1627	2026-02-27 10:46:39.406+05:30
1515	1	1	POST	1628	2026-02-27 10:46:39.406+05:30
1516	1	1	POST	1629	2026-02-27 10:46:39.406+05:30
1517	1	1	POST	1630	2026-02-27 10:46:39.406+05:30
1518	1	1	POST	1631	2026-02-27 10:46:39.406+05:30
1519	1	1	POST	1632	2026-02-27 10:46:39.406+05:30
1520	1	1	POST	1633	2026-02-27 10:46:39.406+05:30
1521	1	1	POST	1634	2026-02-27 10:46:39.406+05:30
1522	1	1	POST	1635	2026-02-27 10:46:39.406+05:30
1523	1	1	POST	1636	2026-02-27 10:46:39.406+05:30
1524	1	1	POST	1637	2026-02-27 10:46:39.406+05:30
1525	1	1	POST	1638	2026-02-27 10:46:39.406+05:30
1526	1	1	POST	1639	2026-02-27 10:46:39.406+05:30
1527	1	1	POST	1640	2026-02-27 10:46:39.406+05:30
1528	1	1	POST	1641	2026-02-27 10:46:39.406+05:30
1529	1	1	POST	1642	2026-02-27 10:46:39.406+05:30
1530	1	1	POST	1643	2026-02-27 10:46:39.406+05:30
1531	1	1	POST	1644	2026-02-27 10:46:39.406+05:30
1532	1	1	POST	1645	2026-02-27 10:46:39.406+05:30
1533	1	1	POST	1646	2026-02-27 10:46:39.406+05:30
1534	1	1	POST	1647	2026-02-27 10:46:39.406+05:30
1535	1	1	POST	1648	2026-02-27 10:46:39.406+05:30
1536	1	1	POST	1649	2026-02-27 10:46:39.406+05:30
1537	1	1	POST	1500	2026-02-28 10:46:39.406+05:30
1538	1	1	POST	1501	2026-02-28 10:46:39.406+05:30
1539	1	1	POST	1502	2026-02-28 10:46:39.406+05:30
1540	1	1	POST	1503	2026-02-28 10:46:39.406+05:30
1541	1	1	POST	1504	2026-02-28 10:46:39.406+05:30
1542	1	1	POST	1505	2026-02-28 10:46:39.406+05:30
1543	1	1	POST	1506	2026-02-28 10:46:39.406+05:30
1544	1	1	POST	1507	2026-02-28 10:46:39.406+05:30
1545	1	1	POST	1508	2026-02-28 10:46:39.406+05:30
1546	1	1	POST	1509	2026-02-28 10:46:39.406+05:30
1547	1	1	POST	1510	2026-02-28 10:46:39.406+05:30
1548	1	1	POST	1511	2026-02-28 10:46:39.406+05:30
1549	1	1	POST	1512	2026-02-28 10:46:39.406+05:30
1550	1	1	POST	1513	2026-02-28 10:46:39.406+05:30
1551	1	1	POST	1514	2026-02-28 10:46:39.406+05:30
1552	1	1	POST	1515	2026-02-28 10:46:39.406+05:30
1553	1	1	POST	1516	2026-02-28 10:46:39.406+05:30
1554	1	1	POST	1517	2026-02-28 10:46:39.406+05:30
1555	1	1	POST	1518	2026-02-28 10:46:39.406+05:30
1556	1	1	POST	1519	2026-02-28 10:46:39.406+05:30
1557	1	1	POST	1520	2026-02-28 10:46:39.406+05:30
1558	1	1	POST	1521	2026-02-28 10:46:39.406+05:30
1559	1	1	POST	1522	2026-02-28 10:46:39.406+05:30
1560	1	1	POST	1523	2026-02-28 10:46:39.406+05:30
1561	1	1	POST	1524	2026-02-28 10:46:39.406+05:30
1562	1	1	POST	1525	2026-02-28 10:46:39.406+05:30
1563	1	1	POST	1526	2026-02-28 10:46:39.406+05:30
1564	1	1	POST	1527	2026-02-28 10:46:39.406+05:30
1565	1	1	POST	1528	2026-02-28 10:46:39.406+05:30
1566	1	1	POST	1529	2026-02-28 10:46:39.406+05:30
1567	1	1	POST	1530	2026-02-28 10:46:39.406+05:30
1568	1	1	POST	1531	2026-02-28 10:46:39.406+05:30
1569	1	1	POST	1532	2026-02-28 10:46:39.406+05:30
1570	1	1	POST	1533	2026-02-28 10:46:39.406+05:30
1571	1	1	POST	1534	2026-02-28 10:46:39.406+05:30
1572	1	1	POST	1535	2026-02-28 10:46:39.406+05:30
1573	1	1	POST	1536	2026-02-28 10:46:39.406+05:30
1574	1	1	POST	1537	2026-02-28 10:46:39.406+05:30
1575	1	1	POST	1538	2026-02-28 10:46:39.406+05:30
1576	1	1	POST	1539	2026-02-28 10:46:39.406+05:30
1577	1	1	POST	1540	2026-02-28 10:46:39.406+05:30
1578	1	1	POST	1541	2026-02-28 10:46:39.406+05:30
1579	1	1	POST	1542	2026-02-28 10:46:39.406+05:30
1580	1	1	POST	1543	2026-02-28 10:46:39.406+05:30
1581	1	1	POST	1544	2026-02-28 10:46:39.406+05:30
1582	1	1	POST	1545	2026-02-28 10:46:39.406+05:30
1583	1	1	POST	1546	2026-02-28 10:46:39.406+05:30
1584	1	1	POST	1547	2026-02-28 10:46:39.406+05:30
1585	1	1	POST	1548	2026-02-28 10:46:39.406+05:30
1586	1	1	POST	1549	2026-02-28 10:46:39.406+05:30
1587	1	1	POST	1400	2026-03-01 10:46:39.406+05:30
1588	1	1	POST	1401	2026-03-01 10:46:39.406+05:30
1589	1	1	POST	1402	2026-03-01 10:46:39.406+05:30
1590	1	1	POST	1403	2026-03-01 10:46:39.406+05:30
1591	1	1	POST	1404	2026-03-01 10:46:39.406+05:30
1592	1	1	POST	1405	2026-03-01 10:46:39.406+05:30
1593	1	1	POST	1406	2026-03-01 10:46:39.406+05:30
1594	1	1	POST	1407	2026-03-01 10:46:39.406+05:30
1595	1	1	POST	1408	2026-03-01 10:46:39.406+05:30
1596	1	1	POST	1409	2026-03-01 10:46:39.406+05:30
1597	1	1	POST	1410	2026-03-01 10:46:39.406+05:30
1598	1	1	POST	1411	2026-03-01 10:46:39.406+05:30
1599	1	1	POST	1412	2026-03-01 10:46:39.406+05:30
1600	1	1	POST	1413	2026-03-01 10:46:39.406+05:30
1601	1	1	POST	1414	2026-03-01 10:46:39.406+05:30
1602	1	1	POST	1415	2026-03-01 10:46:39.406+05:30
1603	1	1	POST	1416	2026-03-01 10:46:39.406+05:30
1604	1	1	POST	1417	2026-03-01 10:46:39.406+05:30
1605	1	1	POST	1418	2026-03-01 10:46:39.406+05:30
1606	1	1	POST	1419	2026-03-01 10:46:39.406+05:30
1607	1	1	POST	1420	2026-03-01 10:46:39.406+05:30
1608	1	1	POST	1421	2026-03-01 10:46:39.406+05:30
1609	1	1	POST	1422	2026-03-01 10:46:39.406+05:30
1610	1	1	POST	1423	2026-03-01 10:46:39.406+05:30
1611	1	1	POST	1424	2026-03-01 10:46:39.406+05:30
1612	1	1	POST	1425	2026-03-01 10:46:39.406+05:30
1613	1	1	POST	1426	2026-03-01 10:46:39.406+05:30
1614	1	1	POST	1427	2026-03-01 10:46:39.406+05:30
1615	1	1	POST	1428	2026-03-01 10:46:39.406+05:30
1616	1	1	POST	1429	2026-03-01 10:46:39.406+05:30
1617	1	1	POST	1430	2026-03-01 10:46:39.406+05:30
1618	1	1	POST	1431	2026-03-01 10:46:39.406+05:30
1619	1	1	POST	1432	2026-03-01 10:46:39.406+05:30
1620	1	1	POST	1433	2026-03-01 10:46:39.406+05:30
1621	1	1	POST	1434	2026-03-01 10:46:39.406+05:30
1622	1	1	POST	1435	2026-03-01 10:46:39.406+05:30
1623	1	1	POST	1436	2026-03-01 10:46:39.406+05:30
1624	1	1	POST	1437	2026-03-01 10:46:39.406+05:30
1625	1	1	POST	1438	2026-03-01 10:46:39.406+05:30
1626	1	1	POST	1439	2026-03-01 10:46:39.406+05:30
1627	1	1	POST	1440	2026-03-01 10:46:39.406+05:30
1628	1	1	POST	1441	2026-03-01 10:46:39.406+05:30
1629	1	1	POST	1442	2026-03-01 10:46:39.406+05:30
1630	1	1	POST	1443	2026-03-01 10:46:39.406+05:30
1631	1	1	POST	1444	2026-03-01 10:46:39.406+05:30
1632	1	1	POST	1445	2026-03-01 10:46:39.406+05:30
1633	1	1	POST	1446	2026-03-01 10:46:39.406+05:30
1634	1	1	POST	1447	2026-03-01 10:46:39.406+05:30
1635	1	1	POST	1448	2026-03-01 10:46:39.406+05:30
1636	1	1	POST	1449	2026-03-01 10:46:39.406+05:30
1637	1	1	POST	1300	2026-03-02 10:46:39.406+05:30
1638	1	1	POST	1301	2026-03-02 10:46:39.406+05:30
1639	1	1	POST	1302	2026-03-02 10:46:39.406+05:30
1640	1	1	POST	1303	2026-03-02 10:46:39.406+05:30
1641	1	1	POST	1304	2026-03-02 10:46:39.406+05:30
1642	1	1	POST	1305	2026-03-02 10:46:39.406+05:30
1643	1	1	POST	1306	2026-03-02 10:46:39.406+05:30
1644	1	1	POST	1307	2026-03-02 10:46:39.406+05:30
1645	1	1	POST	1308	2026-03-02 10:46:39.406+05:30
1646	1	1	POST	1309	2026-03-02 10:46:39.406+05:30
1647	1	1	POST	1310	2026-03-02 10:46:39.406+05:30
1648	1	1	POST	1311	2026-03-02 10:46:39.406+05:30
1649	1	1	POST	1312	2026-03-02 10:46:39.406+05:30
1650	1	1	POST	1313	2026-03-02 10:46:39.406+05:30
1651	1	1	POST	1314	2026-03-02 10:46:39.406+05:30
1652	1	1	POST	1315	2026-03-02 10:46:39.406+05:30
1653	1	1	POST	1316	2026-03-02 10:46:39.406+05:30
1654	1	1	POST	1317	2026-03-02 10:46:39.406+05:30
1655	1	1	POST	1318	2026-03-02 10:46:39.406+05:30
1656	1	1	POST	1319	2026-03-02 10:46:39.406+05:30
1657	1	1	POST	1320	2026-03-02 10:46:39.406+05:30
1658	1	1	POST	1321	2026-03-02 10:46:39.406+05:30
1659	1	1	POST	1322	2026-03-02 10:46:39.406+05:30
1660	1	1	POST	1323	2026-03-02 10:46:39.406+05:30
1661	1	1	POST	1324	2026-03-02 10:46:39.406+05:30
1662	1	1	POST	1325	2026-03-02 10:46:39.406+05:30
1663	1	1	POST	1326	2026-03-02 10:46:39.406+05:30
1664	1	1	POST	1327	2026-03-02 10:46:39.406+05:30
1665	1	1	POST	1328	2026-03-02 10:46:39.406+05:30
1666	1	1	POST	1329	2026-03-02 10:46:39.406+05:30
1667	1	1	POST	1330	2026-03-02 10:46:39.406+05:30
1668	1	1	POST	1331	2026-03-02 10:46:39.406+05:30
1669	1	1	POST	1332	2026-03-02 10:46:39.406+05:30
1670	1	1	POST	1333	2026-03-02 10:46:39.406+05:30
1671	1	1	POST	1334	2026-03-02 10:46:39.406+05:30
1672	1	1	POST	1335	2026-03-02 10:46:39.406+05:30
1673	1	1	POST	1336	2026-03-02 10:46:39.406+05:30
1674	1	1	POST	1337	2026-03-02 10:46:39.406+05:30
1675	1	1	POST	1338	2026-03-02 10:46:39.406+05:30
1676	1	1	POST	1339	2026-03-02 10:46:39.406+05:30
1677	1	1	POST	1340	2026-03-02 10:46:39.406+05:30
1678	1	1	POST	1341	2026-03-02 10:46:39.406+05:30
1679	1	1	POST	1342	2026-03-02 10:46:39.406+05:30
1680	1	1	POST	1343	2026-03-02 10:46:39.406+05:30
1681	1	1	POST	1344	2026-03-02 10:46:39.406+05:30
1682	1	1	POST	1345	2026-03-02 10:46:39.406+05:30
1683	1	1	POST	1346	2026-03-02 10:46:39.406+05:30
1684	1	1	POST	1347	2026-03-02 10:46:39.406+05:30
1685	1	1	POST	1348	2026-03-02 10:46:39.406+05:30
1686	1	1	POST	1349	2026-03-02 10:46:39.406+05:30
1687	1	1	POST	1200	2026-03-03 10:46:39.406+05:30
1688	1	1	POST	1201	2026-03-03 10:46:39.406+05:30
1689	1	1	POST	1202	2026-03-03 10:46:39.406+05:30
1690	1	1	POST	1203	2026-03-03 10:46:39.406+05:30
1691	1	1	POST	1204	2026-03-03 10:46:39.406+05:30
1692	1	1	POST	1205	2026-03-03 10:46:39.406+05:30
1693	1	1	POST	1206	2026-03-03 10:46:39.406+05:30
1694	1	1	POST	1207	2026-03-03 10:46:39.406+05:30
1695	1	1	POST	1208	2026-03-03 10:46:39.406+05:30
1696	1	1	POST	1209	2026-03-03 10:46:39.406+05:30
1697	1	1	POST	1210	2026-03-03 10:46:39.406+05:30
1698	1	1	POST	1211	2026-03-03 10:46:39.406+05:30
1699	1	1	POST	1212	2026-03-03 10:46:39.406+05:30
1700	1	1	POST	1213	2026-03-03 10:46:39.406+05:30
1701	1	1	POST	1214	2026-03-03 10:46:39.406+05:30
1702	1	1	POST	1215	2026-03-03 10:46:39.406+05:30
1703	1	1	POST	1216	2026-03-03 10:46:39.406+05:30
1704	1	1	POST	1217	2026-03-03 10:46:39.406+05:30
1705	1	1	POST	1218	2026-03-03 10:46:39.406+05:30
1706	1	1	POST	1219	2026-03-03 10:46:39.406+05:30
1707	1	1	POST	1220	2026-03-03 10:46:39.406+05:30
1708	1	1	POST	1221	2026-03-03 10:46:39.406+05:30
1709	1	1	POST	1222	2026-03-03 10:46:39.406+05:30
1710	1	1	POST	1223	2026-03-03 10:46:39.406+05:30
1711	1	1	POST	1224	2026-03-03 10:46:39.406+05:30
1712	1	1	POST	1225	2026-03-03 10:46:39.406+05:30
1713	1	1	POST	1226	2026-03-03 10:46:39.406+05:30
1714	1	1	POST	1227	2026-03-03 10:46:39.406+05:30
1715	1	1	POST	1228	2026-03-03 10:46:39.406+05:30
1716	1	1	POST	1229	2026-03-03 10:46:39.406+05:30
1717	1	1	POST	1230	2026-03-03 10:46:39.406+05:30
1718	1	1	POST	1231	2026-03-03 10:46:39.406+05:30
1719	1	1	POST	1232	2026-03-03 10:46:39.406+05:30
1720	1	1	POST	1233	2026-03-03 10:46:39.406+05:30
1721	1	1	POST	1234	2026-03-03 10:46:39.406+05:30
1722	1	1	POST	1235	2026-03-03 10:46:39.406+05:30
1723	1	1	POST	1236	2026-03-03 10:46:39.406+05:30
1724	1	1	POST	1237	2026-03-03 10:46:39.406+05:30
1725	1	1	POST	1238	2026-03-03 10:46:39.406+05:30
1726	1	1	POST	1239	2026-03-03 10:46:39.406+05:30
1727	1	1	POST	1240	2026-03-03 10:46:39.406+05:30
1728	1	1	POST	1241	2026-03-03 10:46:39.406+05:30
1729	1	1	POST	1242	2026-03-03 10:46:39.406+05:30
1730	1	1	POST	1243	2026-03-03 10:46:39.406+05:30
1731	1	1	POST	1244	2026-03-03 10:46:39.406+05:30
1732	1	1	POST	1245	2026-03-03 10:46:39.406+05:30
1733	1	1	POST	1246	2026-03-03 10:46:39.406+05:30
1734	1	1	POST	1247	2026-03-03 10:46:39.406+05:30
1735	1	1	POST	1248	2026-03-03 10:46:39.406+05:30
1736	1	1	POST	1249	2026-03-03 10:46:39.406+05:30
1737	1	1	POST	1100	2026-03-04 10:46:39.406+05:30
1738	1	1	POST	1101	2026-03-04 10:46:39.406+05:30
1739	1	1	POST	1102	2026-03-04 10:46:39.406+05:30
1740	1	1	POST	1103	2026-03-04 10:46:39.406+05:30
1741	1	1	POST	1104	2026-03-04 10:46:39.406+05:30
1742	1	1	POST	1105	2026-03-04 10:46:39.406+05:30
1743	1	1	POST	1106	2026-03-04 10:46:39.406+05:30
1744	1	1	POST	1107	2026-03-04 10:46:39.406+05:30
1745	1	1	POST	1108	2026-03-04 10:46:39.406+05:30
1746	1	1	POST	1109	2026-03-04 10:46:39.406+05:30
1747	1	1	POST	1110	2026-03-04 10:46:39.406+05:30
1748	1	1	POST	1111	2026-03-04 10:46:39.406+05:30
1749	1	1	POST	1112	2026-03-04 10:46:39.406+05:30
1750	1	1	POST	1113	2026-03-04 10:46:39.406+05:30
1751	1	1	POST	1114	2026-03-04 10:46:39.406+05:30
1752	1	1	POST	1115	2026-03-04 10:46:39.406+05:30
1753	1	1	POST	1116	2026-03-04 10:46:39.406+05:30
1754	1	1	POST	1117	2026-03-04 10:46:39.406+05:30
1755	1	1	POST	1118	2026-03-04 10:46:39.406+05:30
1756	1	1	POST	1119	2026-03-04 10:46:39.406+05:30
1757	1	1	POST	1120	2026-03-04 10:46:39.406+05:30
1758	1	1	POST	1121	2026-03-04 10:46:39.406+05:30
1759	1	1	POST	1122	2026-03-04 10:46:39.406+05:30
1760	1	1	POST	1123	2026-03-04 10:46:39.406+05:30
1761	1	1	POST	1124	2026-03-04 10:46:39.406+05:30
1762	1	1	POST	1125	2026-03-04 10:46:39.406+05:30
1763	1	1	POST	1126	2026-03-04 10:46:39.406+05:30
1764	1	1	POST	1127	2026-03-04 10:46:39.406+05:30
1765	1	1	POST	1128	2026-03-04 10:46:39.406+05:30
1766	1	1	POST	1129	2026-03-04 10:46:39.406+05:30
1767	1	1	POST	1130	2026-03-04 10:46:39.406+05:30
1768	1	1	POST	1131	2026-03-04 10:46:39.406+05:30
1769	1	1	POST	1132	2026-03-04 10:46:39.406+05:30
1770	1	1	POST	1133	2026-03-04 10:46:39.406+05:30
1771	1	1	POST	1134	2026-03-04 10:46:39.406+05:30
1772	1	1	POST	1135	2026-03-04 10:46:39.406+05:30
1773	1	1	POST	1136	2026-03-04 10:46:39.406+05:30
1774	1	1	POST	1137	2026-03-04 10:46:39.406+05:30
1775	1	1	POST	1138	2026-03-04 10:46:39.406+05:30
1776	1	1	POST	1139	2026-03-04 10:46:39.406+05:30
1777	1	1	POST	1140	2026-03-04 10:46:39.406+05:30
1778	1	1	POST	1141	2026-03-04 10:46:39.406+05:30
1779	1	1	POST	1142	2026-03-04 10:46:39.406+05:30
1780	1	1	POST	1143	2026-03-04 10:46:39.406+05:30
1781	1	1	POST	1144	2026-03-04 10:46:39.406+05:30
1782	1	1	POST	1145	2026-03-04 10:46:39.406+05:30
1783	1	1	POST	1146	2026-03-04 10:46:39.406+05:30
1784	1	1	POST	1147	2026-03-04 10:46:39.406+05:30
1785	1	1	POST	1148	2026-03-04 10:46:39.406+05:30
1786	1	1	POST	1149	2026-03-04 10:46:39.406+05:30
1787	1	1	POST	1000	2026-03-05 10:46:39.406+05:30
1788	1	1	POST	1001	2026-03-05 10:46:39.406+05:30
1789	1	1	POST	1002	2026-03-05 10:46:39.406+05:30
1790	1	1	POST	1003	2026-03-05 10:46:39.406+05:30
1791	1	1	POST	1004	2026-03-05 10:46:39.406+05:30
1792	1	1	POST	1005	2026-03-05 10:46:39.406+05:30
1793	1	1	POST	1006	2026-03-05 10:46:39.406+05:30
1794	1	1	POST	1007	2026-03-05 10:46:39.406+05:30
1795	1	1	POST	1008	2026-03-05 10:46:39.406+05:30
1796	1	1	POST	1009	2026-03-05 10:46:39.406+05:30
1797	1	1	POST	1010	2026-03-05 10:46:39.406+05:30
1798	1	1	POST	1011	2026-03-05 10:46:39.406+05:30
1799	1	1	POST	1012	2026-03-05 10:46:39.406+05:30
1800	1	1	POST	1013	2026-03-05 10:46:39.406+05:30
1801	1	1	POST	1014	2026-03-05 10:46:39.406+05:30
1802	1	1	POST	1015	2026-03-05 10:46:39.406+05:30
1803	1	1	POST	1016	2026-03-05 10:46:39.406+05:30
1804	1	1	POST	1017	2026-03-05 10:46:39.406+05:30
1805	1	1	POST	1018	2026-03-05 10:46:39.406+05:30
1806	1	1	POST	1019	2026-03-05 10:46:39.406+05:30
1807	1	1	POST	1020	2026-03-05 10:46:39.406+05:30
1808	1	1	POST	1021	2026-03-05 10:46:39.406+05:30
1809	1	1	POST	1022	2026-03-05 10:46:39.406+05:30
1810	1	1	POST	1023	2026-03-05 10:46:39.406+05:30
1811	1	1	POST	1024	2026-03-05 10:46:39.406+05:30
1812	1	1	POST	1025	2026-03-05 10:46:39.406+05:30
1813	1	1	POST	1026	2026-03-05 10:46:39.406+05:30
1814	1	1	POST	1027	2026-03-05 10:46:39.406+05:30
1815	1	1	POST	1028	2026-03-05 10:46:39.406+05:30
1816	1	1	POST	1029	2026-03-05 10:46:39.406+05:30
1817	1	1	POST	1030	2026-03-05 10:46:39.406+05:30
1818	1	1	POST	1031	2026-03-05 10:46:39.406+05:30
1819	1	1	POST	1032	2026-03-05 10:46:39.406+05:30
1820	1	1	POST	1033	2026-03-05 10:46:39.406+05:30
1821	1	1	POST	1034	2026-03-05 10:46:39.406+05:30
1822	1	1	POST	1035	2026-03-05 10:46:39.406+05:30
1823	1	1	POST	1036	2026-03-05 10:46:39.406+05:30
1824	1	1	POST	1037	2026-03-05 10:46:39.406+05:30
1825	1	1	POST	1038	2026-03-05 10:46:39.406+05:30
1826	1	1	POST	1039	2026-03-05 10:46:39.406+05:30
1827	1	1	POST	1040	2026-03-05 10:46:39.406+05:30
1828	1	1	POST	1041	2026-03-05 10:46:39.406+05:30
1829	1	1	POST	1042	2026-03-05 10:46:39.406+05:30
1830	1	1	POST	1043	2026-03-05 10:46:39.406+05:30
1831	1	1	POST	1044	2026-03-05 10:46:39.406+05:30
1832	1	1	POST	1045	2026-03-05 10:46:39.406+05:30
1833	1	1	POST	1046	2026-03-05 10:46:39.406+05:30
1834	1	1	POST	1047	2026-03-05 10:46:39.406+05:30
1835	1	1	POST	1048	2026-03-05 10:46:39.406+05:30
1836	1	1	POST	1049	2026-03-05 10:46:39.406+05:30
1837	6	2103	POST	2	2026-03-05 14:44:28.01+05:30
1838	2	2083	POST	2	2026-03-05 14:56:46.553+05:30
1839	2	2083	POST	2	2026-03-05 14:57:18.145+05:30
1840	2	2083	POST	2	2026-03-05 15:00:45.851+05:30
1841	2	2084	POST	19	2026-03-06 12:24:25.946+05:30
1842	2	2084	POST	2	2026-03-06 12:25:02.778+05:30
1843	3	2092	POST	3	2026-03-06 12:58:49.226+05:30
1844	3	2092	POST	3	2026-03-06 12:58:49.235+05:30
1845	3	2111	POST	3	2026-03-06 16:07:58.915+05:30
1846	3	2111	POST	3	2026-03-06 16:07:58.924+05:30
1847	3	2111	POST	3	2026-03-06 16:08:22.346+05:30
1848	3	2111	POST	3	2026-03-06 16:08:22.355+05:30
\.


--
-- Data for Name: interactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interactions (id, "userId", "contentId", "contentType", "actorId", type, "timestamp") FROM stdin;
1	104	2069	POST	51	LIKE	2026-02-23 15:35:25.716+05:30
2	51	58	POST	51	COMMENT	2026-02-24 11:30:07.448+05:30
3	55	2074	POST	112	LIKE	2026-02-24 13:01:29.923+05:30
4	104	2095	POST	112	LIKE	2026-02-25 09:35:02.17+05:30
5	55	2093	POST	112	LIKE	2026-02-25 10:18:53.546+05:30
6	105	2103	POST	148	LIKE	2026-02-25 10:24:09.043+05:30
7	105	2102	POST	148	LIKE	2026-02-25 10:26:30.074+05:30
8	105	2101	POST	148	LIKE	2026-02-25 10:26:35.852+05:30
9	163	2104	POST	51	LIKE	2026-02-25 11:29:56.723+05:30
10	51	2104	POST	51	COMMENT	2026-02-25 11:30:06.329+05:30
11	163	2104	POST	163	LIKE	2026-02-25 11:40:19.465+05:30
12	163	2104	POST	163	LIKE	2026-02-25 11:40:32.277+05:30
13	105	2099	POST	163	LIKE	2026-02-25 11:51:14.414+05:30
14	163	2104	POST	163	LIKE	2026-02-25 14:34:30.914+05:30
15	163	2104	POST	163	LIKE	2026-02-25 14:41:05.009+05:30
16	163	2104	POST	163	LIKE	2026-02-25 14:41:13.993+05:30
17	105	2103	POST	163	LIKE	2026-02-25 15:53:52.564+05:30
18	163	64	POST	163	COMMENT	2026-02-25 15:54:43.066+05:30
19	2	2084	POST	2	LIKE	2026-02-26 11:16:29.054+05:30
20	2	2080	POST	2	LIKE	2026-02-26 14:58:06.549+05:30
21	7	2109	POST	3	LIKE	2026-02-27 09:09:32.379+05:30
22	7	2108	POST	3	LIKE	2026-02-27 09:09:34.851+05:30
23	3	2092	POST	2	LIKE	2026-02-27 10:40:37.3+05:30
24	2	2083	POST	2	LIKE	2026-02-27 10:40:50.104+05:30
25	2	2092	POST	2	COMMENT	2026-02-27 11:30:49.39+05:30
26	3	2092	POST	2	LIKE	2026-02-27 11:59:56.319+05:30
27	3	2092	POST	2	LIKE	2026-02-27 12:38:51.034+05:30
28	3	2092	POST	2	LIKE	2026-02-27 12:41:30.045+05:30
29	3	2092	POST	10	LIKE	2026-03-02 14:44:55.71+05:30
30	7	2109	POST	2	LIKE	2026-03-05 10:23:14.446+05:30
31	1	1	POST	4900	LIKE	2026-02-04 10:46:39.406+05:30
32	1	1	POST	4901	LIKE	2026-02-04 10:46:39.406+05:30
33	1	1	POST	4902	LIKE	2026-02-04 10:46:39.406+05:30
34	1	1	POST	4903	LIKE	2026-02-04 10:46:39.406+05:30
35	1	1	POST	4904	LIKE	2026-02-04 10:46:39.406+05:30
36	1	1	POST	4905	LIKE	2026-02-04 10:46:39.406+05:30
37	1	1	POST	4906	LIKE	2026-02-04 10:46:39.406+05:30
38	1	1	POST	4907	LIKE	2026-02-04 10:46:39.406+05:30
39	1	1	POST	4908	LIKE	2026-02-04 10:46:39.406+05:30
40	1	1	POST	4909	LIKE	2026-02-04 10:46:39.406+05:30
41	1	1	POST	4910	LIKE	2026-02-04 10:46:39.406+05:30
42	1	1	POST	4911	LIKE	2026-02-04 10:46:39.406+05:30
43	1	1	POST	4912	LIKE	2026-02-04 10:46:39.406+05:30
44	1	1	POST	4913	LIKE	2026-02-04 10:46:39.406+05:30
45	1	1	POST	4914	LIKE	2026-02-04 10:46:39.406+05:30
46	1	1	POST	4915	LIKE	2026-02-04 10:46:39.406+05:30
47	1	1	POST	4916	LIKE	2026-02-04 10:46:39.406+05:30
48	1	1	POST	4917	LIKE	2026-02-04 10:46:39.406+05:30
49	1	1	POST	4918	LIKE	2026-02-04 10:46:39.406+05:30
50	1	1	POST	4919	LIKE	2026-02-04 10:46:39.406+05:30
51	1	1	POST	4800	LIKE	2026-02-05 10:46:39.406+05:30
52	1	1	POST	4801	LIKE	2026-02-05 10:46:39.406+05:30
53	1	1	POST	4802	LIKE	2026-02-05 10:46:39.406+05:30
54	1	1	POST	4803	LIKE	2026-02-05 10:46:39.406+05:30
55	1	1	POST	4804	LIKE	2026-02-05 10:46:39.406+05:30
56	1	1	POST	4805	LIKE	2026-02-05 10:46:39.406+05:30
57	1	1	POST	4806	LIKE	2026-02-05 10:46:39.406+05:30
58	1	1	POST	4807	LIKE	2026-02-05 10:46:39.406+05:30
59	1	1	POST	4808	LIKE	2026-02-05 10:46:39.406+05:30
60	1	1	POST	4809	LIKE	2026-02-05 10:46:39.406+05:30
61	1	1	POST	4810	LIKE	2026-02-05 10:46:39.406+05:30
62	1	1	POST	4811	LIKE	2026-02-05 10:46:39.406+05:30
63	1	1	POST	4812	LIKE	2026-02-05 10:46:39.406+05:30
64	1	1	POST	4813	LIKE	2026-02-05 10:46:39.406+05:30
65	1	1	POST	4814	LIKE	2026-02-05 10:46:39.406+05:30
66	1	1	POST	4815	LIKE	2026-02-05 10:46:39.406+05:30
67	1	1	POST	4816	LIKE	2026-02-05 10:46:39.406+05:30
68	1	1	POST	4817	LIKE	2026-02-05 10:46:39.406+05:30
69	1	1	POST	4818	LIKE	2026-02-05 10:46:39.406+05:30
70	1	1	POST	4819	LIKE	2026-02-05 10:46:39.406+05:30
71	1	1	POST	4700	LIKE	2026-02-06 10:46:39.406+05:30
72	1	1	POST	4701	LIKE	2026-02-06 10:46:39.406+05:30
73	1	1	POST	4702	LIKE	2026-02-06 10:46:39.406+05:30
74	1	1	POST	4703	LIKE	2026-02-06 10:46:39.406+05:30
75	1	1	POST	4704	LIKE	2026-02-06 10:46:39.406+05:30
76	1	1	POST	4705	LIKE	2026-02-06 10:46:39.406+05:30
77	1	1	POST	4706	LIKE	2026-02-06 10:46:39.406+05:30
78	1	1	POST	4707	LIKE	2026-02-06 10:46:39.406+05:30
79	1	1	POST	4708	LIKE	2026-02-06 10:46:39.406+05:30
80	1	1	POST	4709	LIKE	2026-02-06 10:46:39.406+05:30
81	1	1	POST	4710	LIKE	2026-02-06 10:46:39.406+05:30
82	1	1	POST	4711	LIKE	2026-02-06 10:46:39.406+05:30
83	1	1	POST	4712	LIKE	2026-02-06 10:46:39.406+05:30
84	1	1	POST	4713	LIKE	2026-02-06 10:46:39.406+05:30
85	1	1	POST	4714	LIKE	2026-02-06 10:46:39.406+05:30
86	1	1	POST	4715	LIKE	2026-02-06 10:46:39.406+05:30
87	1	1	POST	4716	LIKE	2026-02-06 10:46:39.406+05:30
88	1	1	POST	4717	LIKE	2026-02-06 10:46:39.406+05:30
89	1	1	POST	4718	LIKE	2026-02-06 10:46:39.406+05:30
90	1	1	POST	4719	LIKE	2026-02-06 10:46:39.406+05:30
91	1	1	POST	4600	LIKE	2026-02-07 10:46:39.406+05:30
92	1	1	POST	4601	LIKE	2026-02-07 10:46:39.406+05:30
93	1	1	POST	4602	LIKE	2026-02-07 10:46:39.406+05:30
94	1	1	POST	4603	LIKE	2026-02-07 10:46:39.406+05:30
95	1	1	POST	4604	LIKE	2026-02-07 10:46:39.406+05:30
96	1	1	POST	4605	LIKE	2026-02-07 10:46:39.406+05:30
97	1	1	POST	4606	LIKE	2026-02-07 10:46:39.406+05:30
98	1	1	POST	4607	LIKE	2026-02-07 10:46:39.406+05:30
99	1	1	POST	4608	LIKE	2026-02-07 10:46:39.406+05:30
100	1	1	POST	4609	LIKE	2026-02-07 10:46:39.406+05:30
101	1	1	POST	4610	LIKE	2026-02-07 10:46:39.406+05:30
102	1	1	POST	4611	LIKE	2026-02-07 10:46:39.406+05:30
103	1	1	POST	4612	LIKE	2026-02-07 10:46:39.406+05:30
104	1	1	POST	4613	LIKE	2026-02-07 10:46:39.406+05:30
105	1	1	POST	4614	LIKE	2026-02-07 10:46:39.406+05:30
106	1	1	POST	4615	LIKE	2026-02-07 10:46:39.406+05:30
107	1	1	POST	4616	LIKE	2026-02-07 10:46:39.406+05:30
108	1	1	POST	4617	LIKE	2026-02-07 10:46:39.406+05:30
109	1	1	POST	4618	LIKE	2026-02-07 10:46:39.406+05:30
110	1	1	POST	4619	LIKE	2026-02-07 10:46:39.406+05:30
111	1	1	POST	4500	LIKE	2026-02-08 10:46:39.406+05:30
112	1	1	POST	4501	LIKE	2026-02-08 10:46:39.406+05:30
113	1	1	POST	4502	LIKE	2026-02-08 10:46:39.406+05:30
114	1	1	POST	4503	LIKE	2026-02-08 10:46:39.406+05:30
115	1	1	POST	4504	LIKE	2026-02-08 10:46:39.406+05:30
116	1	1	POST	4505	LIKE	2026-02-08 10:46:39.406+05:30
117	1	1	POST	4506	LIKE	2026-02-08 10:46:39.406+05:30
118	1	1	POST	4507	LIKE	2026-02-08 10:46:39.406+05:30
119	1	1	POST	4508	LIKE	2026-02-08 10:46:39.406+05:30
120	1	1	POST	4509	LIKE	2026-02-08 10:46:39.406+05:30
121	1	1	POST	4510	LIKE	2026-02-08 10:46:39.406+05:30
122	1	1	POST	4511	LIKE	2026-02-08 10:46:39.406+05:30
123	1	1	POST	4512	LIKE	2026-02-08 10:46:39.406+05:30
124	1	1	POST	4513	LIKE	2026-02-08 10:46:39.406+05:30
125	1	1	POST	4514	LIKE	2026-02-08 10:46:39.406+05:30
126	1	1	POST	4515	LIKE	2026-02-08 10:46:39.406+05:30
127	1	1	POST	4516	LIKE	2026-02-08 10:46:39.406+05:30
128	1	1	POST	4517	LIKE	2026-02-08 10:46:39.406+05:30
129	1	1	POST	4518	LIKE	2026-02-08 10:46:39.406+05:30
130	1	1	POST	4519	LIKE	2026-02-08 10:46:39.406+05:30
131	1	1	POST	4400	LIKE	2026-02-09 10:46:39.406+05:30
132	1	1	POST	4401	LIKE	2026-02-09 10:46:39.406+05:30
133	1	1	POST	4402	LIKE	2026-02-09 10:46:39.406+05:30
134	1	1	POST	4403	LIKE	2026-02-09 10:46:39.406+05:30
135	1	1	POST	4404	LIKE	2026-02-09 10:46:39.406+05:30
136	1	1	POST	4405	LIKE	2026-02-09 10:46:39.406+05:30
137	1	1	POST	4406	LIKE	2026-02-09 10:46:39.406+05:30
138	1	1	POST	4407	LIKE	2026-02-09 10:46:39.406+05:30
139	1	1	POST	4408	LIKE	2026-02-09 10:46:39.406+05:30
140	1	1	POST	4409	LIKE	2026-02-09 10:46:39.406+05:30
141	1	1	POST	4410	LIKE	2026-02-09 10:46:39.406+05:30
142	1	1	POST	4411	LIKE	2026-02-09 10:46:39.406+05:30
143	1	1	POST	4412	LIKE	2026-02-09 10:46:39.406+05:30
144	1	1	POST	4413	LIKE	2026-02-09 10:46:39.406+05:30
145	1	1	POST	4414	LIKE	2026-02-09 10:46:39.406+05:30
146	1	1	POST	4415	LIKE	2026-02-09 10:46:39.406+05:30
147	1	1	POST	4416	LIKE	2026-02-09 10:46:39.406+05:30
148	1	1	POST	4417	LIKE	2026-02-09 10:46:39.406+05:30
149	1	1	POST	4418	LIKE	2026-02-09 10:46:39.406+05:30
150	1	1	POST	4419	LIKE	2026-02-09 10:46:39.406+05:30
151	1	1	POST	4300	LIKE	2026-02-10 10:46:39.406+05:30
152	1	1	POST	4301	LIKE	2026-02-10 10:46:39.406+05:30
153	1	1	POST	4302	LIKE	2026-02-10 10:46:39.406+05:30
154	1	1	POST	4303	LIKE	2026-02-10 10:46:39.406+05:30
155	1	1	POST	4304	LIKE	2026-02-10 10:46:39.406+05:30
156	1	1	POST	4305	LIKE	2026-02-10 10:46:39.406+05:30
157	1	1	POST	4306	LIKE	2026-02-10 10:46:39.406+05:30
158	1	1	POST	4307	LIKE	2026-02-10 10:46:39.406+05:30
159	1	1	POST	4308	LIKE	2026-02-10 10:46:39.406+05:30
160	1	1	POST	4309	LIKE	2026-02-10 10:46:39.406+05:30
161	1	1	POST	4310	LIKE	2026-02-10 10:46:39.406+05:30
162	1	1	POST	4311	LIKE	2026-02-10 10:46:39.406+05:30
163	1	1	POST	4312	LIKE	2026-02-10 10:46:39.406+05:30
164	1	1	POST	4313	LIKE	2026-02-10 10:46:39.406+05:30
165	1	1	POST	4314	LIKE	2026-02-10 10:46:39.406+05:30
166	1	1	POST	4315	LIKE	2026-02-10 10:46:39.406+05:30
167	1	1	POST	4316	LIKE	2026-02-10 10:46:39.406+05:30
168	1	1	POST	4317	LIKE	2026-02-10 10:46:39.406+05:30
169	1	1	POST	4318	LIKE	2026-02-10 10:46:39.406+05:30
170	1	1	POST	4319	LIKE	2026-02-10 10:46:39.406+05:30
171	1	1	POST	4200	LIKE	2026-02-11 10:46:39.406+05:30
172	1	1	POST	4201	LIKE	2026-02-11 10:46:39.406+05:30
173	1	1	POST	4202	LIKE	2026-02-11 10:46:39.406+05:30
174	1	1	POST	4203	LIKE	2026-02-11 10:46:39.406+05:30
175	1	1	POST	4204	LIKE	2026-02-11 10:46:39.406+05:30
176	1	1	POST	4205	LIKE	2026-02-11 10:46:39.406+05:30
177	1	1	POST	4206	LIKE	2026-02-11 10:46:39.406+05:30
178	1	1	POST	4207	LIKE	2026-02-11 10:46:39.406+05:30
179	1	1	POST	4208	LIKE	2026-02-11 10:46:39.406+05:30
180	1	1	POST	4209	LIKE	2026-02-11 10:46:39.406+05:30
181	1	1	POST	4210	LIKE	2026-02-11 10:46:39.406+05:30
182	1	1	POST	4211	LIKE	2026-02-11 10:46:39.406+05:30
183	1	1	POST	4212	LIKE	2026-02-11 10:46:39.406+05:30
184	1	1	POST	4213	LIKE	2026-02-11 10:46:39.406+05:30
185	1	1	POST	4214	LIKE	2026-02-11 10:46:39.406+05:30
186	1	1	POST	4215	LIKE	2026-02-11 10:46:39.406+05:30
187	1	1	POST	4216	LIKE	2026-02-11 10:46:39.406+05:30
188	1	1	POST	4217	LIKE	2026-02-11 10:46:39.406+05:30
189	1	1	POST	4218	LIKE	2026-02-11 10:46:39.406+05:30
190	1	1	POST	4219	LIKE	2026-02-11 10:46:39.406+05:30
191	1	1	POST	4100	LIKE	2026-02-12 10:46:39.406+05:30
192	1	1	POST	4101	LIKE	2026-02-12 10:46:39.406+05:30
193	1	1	POST	4102	LIKE	2026-02-12 10:46:39.406+05:30
194	1	1	POST	4103	LIKE	2026-02-12 10:46:39.406+05:30
195	1	1	POST	4104	LIKE	2026-02-12 10:46:39.406+05:30
196	1	1	POST	4105	LIKE	2026-02-12 10:46:39.406+05:30
197	1	1	POST	4106	LIKE	2026-02-12 10:46:39.406+05:30
198	1	1	POST	4107	LIKE	2026-02-12 10:46:39.406+05:30
199	1	1	POST	4108	LIKE	2026-02-12 10:46:39.406+05:30
200	1	1	POST	4109	LIKE	2026-02-12 10:46:39.406+05:30
201	1	1	POST	4110	LIKE	2026-02-12 10:46:39.406+05:30
202	1	1	POST	4111	LIKE	2026-02-12 10:46:39.406+05:30
203	1	1	POST	4112	LIKE	2026-02-12 10:46:39.406+05:30
204	1	1	POST	4113	LIKE	2026-02-12 10:46:39.406+05:30
205	1	1	POST	4114	LIKE	2026-02-12 10:46:39.406+05:30
206	1	1	POST	4115	LIKE	2026-02-12 10:46:39.406+05:30
207	1	1	POST	4116	LIKE	2026-02-12 10:46:39.406+05:30
208	1	1	POST	4117	LIKE	2026-02-12 10:46:39.406+05:30
209	1	1	POST	4118	LIKE	2026-02-12 10:46:39.406+05:30
210	1	1	POST	4119	LIKE	2026-02-12 10:46:39.406+05:30
211	1	1	POST	4000	LIKE	2026-02-13 10:46:39.406+05:30
212	1	1	POST	4001	LIKE	2026-02-13 10:46:39.406+05:30
213	1	1	POST	4002	LIKE	2026-02-13 10:46:39.406+05:30
214	1	1	POST	4003	LIKE	2026-02-13 10:46:39.406+05:30
215	1	1	POST	4004	LIKE	2026-02-13 10:46:39.406+05:30
216	1	1	POST	4005	LIKE	2026-02-13 10:46:39.406+05:30
217	1	1	POST	4006	LIKE	2026-02-13 10:46:39.406+05:30
218	1	1	POST	4007	LIKE	2026-02-13 10:46:39.406+05:30
219	1	1	POST	4008	LIKE	2026-02-13 10:46:39.406+05:30
220	1	1	POST	4009	LIKE	2026-02-13 10:46:39.406+05:30
221	1	1	POST	4010	LIKE	2026-02-13 10:46:39.406+05:30
222	1	1	POST	4011	LIKE	2026-02-13 10:46:39.406+05:30
223	1	1	POST	4012	LIKE	2026-02-13 10:46:39.406+05:30
224	1	1	POST	4013	LIKE	2026-02-13 10:46:39.406+05:30
225	1	1	POST	4014	LIKE	2026-02-13 10:46:39.406+05:30
226	1	1	POST	4015	LIKE	2026-02-13 10:46:39.406+05:30
227	1	1	POST	4016	LIKE	2026-02-13 10:46:39.406+05:30
228	1	1	POST	4017	LIKE	2026-02-13 10:46:39.406+05:30
229	1	1	POST	4018	LIKE	2026-02-13 10:46:39.406+05:30
230	1	1	POST	4019	LIKE	2026-02-13 10:46:39.406+05:30
231	1	1	POST	3900	LIKE	2026-02-14 10:46:39.406+05:30
232	1	1	POST	3901	LIKE	2026-02-14 10:46:39.406+05:30
233	1	1	POST	3902	LIKE	2026-02-14 10:46:39.406+05:30
234	1	1	POST	3903	LIKE	2026-02-14 10:46:39.406+05:30
235	1	1	POST	3904	LIKE	2026-02-14 10:46:39.406+05:30
236	1	1	POST	3905	LIKE	2026-02-14 10:46:39.406+05:30
237	1	1	POST	3906	LIKE	2026-02-14 10:46:39.406+05:30
238	1	1	POST	3907	LIKE	2026-02-14 10:46:39.406+05:30
239	1	1	POST	3908	LIKE	2026-02-14 10:46:39.406+05:30
240	1	1	POST	3909	LIKE	2026-02-14 10:46:39.406+05:30
241	1	1	POST	3910	LIKE	2026-02-14 10:46:39.406+05:30
242	1	1	POST	3911	LIKE	2026-02-14 10:46:39.406+05:30
243	1	1	POST	3912	LIKE	2026-02-14 10:46:39.406+05:30
244	1	1	POST	3913	LIKE	2026-02-14 10:46:39.406+05:30
245	1	1	POST	3914	LIKE	2026-02-14 10:46:39.406+05:30
246	1	1	POST	3915	LIKE	2026-02-14 10:46:39.406+05:30
247	1	1	POST	3916	LIKE	2026-02-14 10:46:39.406+05:30
248	1	1	POST	3917	LIKE	2026-02-14 10:46:39.406+05:30
249	1	1	POST	3918	LIKE	2026-02-14 10:46:39.406+05:30
250	1	1	POST	3919	LIKE	2026-02-14 10:46:39.406+05:30
251	1	1	POST	3800	LIKE	2026-02-15 10:46:39.406+05:30
252	1	1	POST	3801	LIKE	2026-02-15 10:46:39.406+05:30
253	1	1	POST	3802	LIKE	2026-02-15 10:46:39.406+05:30
254	1	1	POST	3803	LIKE	2026-02-15 10:46:39.406+05:30
255	1	1	POST	3804	LIKE	2026-02-15 10:46:39.406+05:30
256	1	1	POST	3805	LIKE	2026-02-15 10:46:39.406+05:30
257	1	1	POST	3806	LIKE	2026-02-15 10:46:39.406+05:30
258	1	1	POST	3807	LIKE	2026-02-15 10:46:39.406+05:30
259	1	1	POST	3808	LIKE	2026-02-15 10:46:39.406+05:30
260	1	1	POST	3809	LIKE	2026-02-15 10:46:39.406+05:30
261	1	1	POST	3810	LIKE	2026-02-15 10:46:39.406+05:30
262	1	1	POST	3811	LIKE	2026-02-15 10:46:39.406+05:30
263	1	1	POST	3812	LIKE	2026-02-15 10:46:39.406+05:30
264	1	1	POST	3813	LIKE	2026-02-15 10:46:39.406+05:30
265	1	1	POST	3814	LIKE	2026-02-15 10:46:39.406+05:30
266	1	1	POST	3815	LIKE	2026-02-15 10:46:39.406+05:30
267	1	1	POST	3816	LIKE	2026-02-15 10:46:39.406+05:30
268	1	1	POST	3817	LIKE	2026-02-15 10:46:39.406+05:30
269	1	1	POST	3818	LIKE	2026-02-15 10:46:39.406+05:30
270	1	1	POST	3819	LIKE	2026-02-15 10:46:39.406+05:30
271	1	1	POST	3700	LIKE	2026-02-16 10:46:39.406+05:30
272	1	1	POST	3701	LIKE	2026-02-16 10:46:39.406+05:30
273	1	1	POST	3702	LIKE	2026-02-16 10:46:39.406+05:30
274	1	1	POST	3703	LIKE	2026-02-16 10:46:39.406+05:30
275	1	1	POST	3704	LIKE	2026-02-16 10:46:39.406+05:30
276	1	1	POST	3705	LIKE	2026-02-16 10:46:39.406+05:30
277	1	1	POST	3706	LIKE	2026-02-16 10:46:39.406+05:30
278	1	1	POST	3707	LIKE	2026-02-16 10:46:39.406+05:30
279	1	1	POST	3708	LIKE	2026-02-16 10:46:39.406+05:30
280	1	1	POST	3709	LIKE	2026-02-16 10:46:39.406+05:30
281	1	1	POST	3710	LIKE	2026-02-16 10:46:39.406+05:30
282	1	1	POST	3711	LIKE	2026-02-16 10:46:39.406+05:30
283	1	1	POST	3712	LIKE	2026-02-16 10:46:39.406+05:30
284	1	1	POST	3713	LIKE	2026-02-16 10:46:39.406+05:30
285	1	1	POST	3714	LIKE	2026-02-16 10:46:39.406+05:30
286	1	1	POST	3715	LIKE	2026-02-16 10:46:39.406+05:30
287	1	1	POST	3716	LIKE	2026-02-16 10:46:39.406+05:30
288	1	1	POST	3717	LIKE	2026-02-16 10:46:39.406+05:30
289	1	1	POST	3718	LIKE	2026-02-16 10:46:39.406+05:30
290	1	1	POST	3719	LIKE	2026-02-16 10:46:39.406+05:30
291	1	1	POST	3600	LIKE	2026-02-17 10:46:39.406+05:30
292	1	1	POST	3601	LIKE	2026-02-17 10:46:39.406+05:30
293	1	1	POST	3602	LIKE	2026-02-17 10:46:39.406+05:30
294	1	1	POST	3603	LIKE	2026-02-17 10:46:39.406+05:30
295	1	1	POST	3604	LIKE	2026-02-17 10:46:39.406+05:30
296	1	1	POST	3605	LIKE	2026-02-17 10:46:39.406+05:30
297	1	1	POST	3606	LIKE	2026-02-17 10:46:39.406+05:30
298	1	1	POST	3607	LIKE	2026-02-17 10:46:39.406+05:30
299	1	1	POST	3608	LIKE	2026-02-17 10:46:39.406+05:30
300	1	1	POST	3609	LIKE	2026-02-17 10:46:39.406+05:30
301	1	1	POST	3610	LIKE	2026-02-17 10:46:39.406+05:30
302	1	1	POST	3611	LIKE	2026-02-17 10:46:39.406+05:30
303	1	1	POST	3612	LIKE	2026-02-17 10:46:39.406+05:30
304	1	1	POST	3613	LIKE	2026-02-17 10:46:39.406+05:30
305	1	1	POST	3614	LIKE	2026-02-17 10:46:39.406+05:30
306	1	1	POST	3615	LIKE	2026-02-17 10:46:39.406+05:30
307	1	1	POST	3616	LIKE	2026-02-17 10:46:39.406+05:30
308	1	1	POST	3617	LIKE	2026-02-17 10:46:39.406+05:30
309	1	1	POST	3618	LIKE	2026-02-17 10:46:39.406+05:30
310	1	1	POST	3619	LIKE	2026-02-17 10:46:39.406+05:30
311	1	1	POST	3500	LIKE	2026-02-18 10:46:39.406+05:30
312	1	1	POST	3501	LIKE	2026-02-18 10:46:39.406+05:30
313	1	1	POST	3502	LIKE	2026-02-18 10:46:39.406+05:30
314	1	1	POST	3503	LIKE	2026-02-18 10:46:39.406+05:30
315	1	1	POST	3504	LIKE	2026-02-18 10:46:39.406+05:30
316	1	1	POST	3505	LIKE	2026-02-18 10:46:39.406+05:30
317	1	1	POST	3506	LIKE	2026-02-18 10:46:39.406+05:30
318	1	1	POST	3507	LIKE	2026-02-18 10:46:39.406+05:30
319	1	1	POST	3508	LIKE	2026-02-18 10:46:39.406+05:30
320	1	1	POST	3509	LIKE	2026-02-18 10:46:39.406+05:30
321	1	1	POST	3510	LIKE	2026-02-18 10:46:39.406+05:30
322	1	1	POST	3511	LIKE	2026-02-18 10:46:39.406+05:30
323	1	1	POST	3512	LIKE	2026-02-18 10:46:39.406+05:30
324	1	1	POST	3513	LIKE	2026-02-18 10:46:39.406+05:30
325	1	1	POST	3514	LIKE	2026-02-18 10:46:39.406+05:30
326	1	1	POST	3515	LIKE	2026-02-18 10:46:39.406+05:30
327	1	1	POST	3516	LIKE	2026-02-18 10:46:39.406+05:30
328	1	1	POST	3517	LIKE	2026-02-18 10:46:39.406+05:30
329	1	1	POST	3518	LIKE	2026-02-18 10:46:39.406+05:30
330	1	1	POST	3519	LIKE	2026-02-18 10:46:39.406+05:30
331	1	1	POST	3400	LIKE	2026-02-19 10:46:39.406+05:30
332	1	1	POST	3401	LIKE	2026-02-19 10:46:39.406+05:30
333	1	1	POST	3402	LIKE	2026-02-19 10:46:39.406+05:30
334	1	1	POST	3403	LIKE	2026-02-19 10:46:39.406+05:30
335	1	1	POST	3404	LIKE	2026-02-19 10:46:39.406+05:30
336	1	1	POST	3405	LIKE	2026-02-19 10:46:39.406+05:30
337	1	1	POST	3406	LIKE	2026-02-19 10:46:39.406+05:30
338	1	1	POST	3407	LIKE	2026-02-19 10:46:39.406+05:30
339	1	1	POST	3408	LIKE	2026-02-19 10:46:39.406+05:30
340	1	1	POST	3409	LIKE	2026-02-19 10:46:39.406+05:30
341	1	1	POST	3410	LIKE	2026-02-19 10:46:39.406+05:30
342	1	1	POST	3411	LIKE	2026-02-19 10:46:39.406+05:30
343	1	1	POST	3412	LIKE	2026-02-19 10:46:39.406+05:30
344	1	1	POST	3413	LIKE	2026-02-19 10:46:39.406+05:30
345	1	1	POST	3414	LIKE	2026-02-19 10:46:39.406+05:30
346	1	1	POST	3415	LIKE	2026-02-19 10:46:39.406+05:30
347	1	1	POST	3416	LIKE	2026-02-19 10:46:39.406+05:30
348	1	1	POST	3417	LIKE	2026-02-19 10:46:39.406+05:30
349	1	1	POST	3418	LIKE	2026-02-19 10:46:39.406+05:30
350	1	1	POST	3419	LIKE	2026-02-19 10:46:39.406+05:30
351	1	1	POST	3300	LIKE	2026-02-20 10:46:39.406+05:30
352	1	1	POST	3301	LIKE	2026-02-20 10:46:39.406+05:30
353	1	1	POST	3302	LIKE	2026-02-20 10:46:39.406+05:30
354	1	1	POST	3303	LIKE	2026-02-20 10:46:39.406+05:30
355	1	1	POST	3304	LIKE	2026-02-20 10:46:39.406+05:30
356	1	1	POST	3305	LIKE	2026-02-20 10:46:39.406+05:30
357	1	1	POST	3306	LIKE	2026-02-20 10:46:39.406+05:30
358	1	1	POST	3307	LIKE	2026-02-20 10:46:39.406+05:30
359	1	1	POST	3308	LIKE	2026-02-20 10:46:39.406+05:30
360	1	1	POST	3309	LIKE	2026-02-20 10:46:39.406+05:30
361	1	1	POST	3310	LIKE	2026-02-20 10:46:39.406+05:30
362	1	1	POST	3311	LIKE	2026-02-20 10:46:39.406+05:30
363	1	1	POST	3312	LIKE	2026-02-20 10:46:39.406+05:30
364	1	1	POST	3313	LIKE	2026-02-20 10:46:39.406+05:30
365	1	1	POST	3314	LIKE	2026-02-20 10:46:39.406+05:30
366	1	1	POST	3315	LIKE	2026-02-20 10:46:39.406+05:30
367	1	1	POST	3316	LIKE	2026-02-20 10:46:39.406+05:30
368	1	1	POST	3317	LIKE	2026-02-20 10:46:39.406+05:30
369	1	1	POST	3318	LIKE	2026-02-20 10:46:39.406+05:30
370	1	1	POST	3319	LIKE	2026-02-20 10:46:39.406+05:30
371	1	1	POST	3200	LIKE	2026-02-21 10:46:39.406+05:30
372	1	1	POST	3201	LIKE	2026-02-21 10:46:39.406+05:30
373	1	1	POST	3202	LIKE	2026-02-21 10:46:39.406+05:30
374	1	1	POST	3203	LIKE	2026-02-21 10:46:39.406+05:30
375	1	1	POST	3204	LIKE	2026-02-21 10:46:39.406+05:30
376	1	1	POST	3205	LIKE	2026-02-21 10:46:39.406+05:30
377	1	1	POST	3206	LIKE	2026-02-21 10:46:39.406+05:30
378	1	1	POST	3207	LIKE	2026-02-21 10:46:39.406+05:30
379	1	1	POST	3208	LIKE	2026-02-21 10:46:39.406+05:30
380	1	1	POST	3209	LIKE	2026-02-21 10:46:39.406+05:30
381	1	1	POST	3210	LIKE	2026-02-21 10:46:39.406+05:30
382	1	1	POST	3211	LIKE	2026-02-21 10:46:39.406+05:30
383	1	1	POST	3212	LIKE	2026-02-21 10:46:39.406+05:30
384	1	1	POST	3213	LIKE	2026-02-21 10:46:39.406+05:30
385	1	1	POST	3214	LIKE	2026-02-21 10:46:39.406+05:30
386	1	1	POST	3215	LIKE	2026-02-21 10:46:39.406+05:30
387	1	1	POST	3216	LIKE	2026-02-21 10:46:39.406+05:30
388	1	1	POST	3217	LIKE	2026-02-21 10:46:39.406+05:30
389	1	1	POST	3218	LIKE	2026-02-21 10:46:39.406+05:30
390	1	1	POST	3219	LIKE	2026-02-21 10:46:39.406+05:30
391	1	1	POST	3100	LIKE	2026-02-22 10:46:39.406+05:30
392	1	1	POST	3101	LIKE	2026-02-22 10:46:39.406+05:30
393	1	1	POST	3102	LIKE	2026-02-22 10:46:39.406+05:30
394	1	1	POST	3103	LIKE	2026-02-22 10:46:39.406+05:30
395	1	1	POST	3104	LIKE	2026-02-22 10:46:39.406+05:30
396	1	1	POST	3105	LIKE	2026-02-22 10:46:39.406+05:30
397	1	1	POST	3106	LIKE	2026-02-22 10:46:39.406+05:30
398	1	1	POST	3107	LIKE	2026-02-22 10:46:39.406+05:30
399	1	1	POST	3108	LIKE	2026-02-22 10:46:39.406+05:30
400	1	1	POST	3109	LIKE	2026-02-22 10:46:39.406+05:30
401	1	1	POST	3110	LIKE	2026-02-22 10:46:39.406+05:30
402	1	1	POST	3111	LIKE	2026-02-22 10:46:39.406+05:30
403	1	1	POST	3112	LIKE	2026-02-22 10:46:39.406+05:30
404	1	1	POST	3113	LIKE	2026-02-22 10:46:39.406+05:30
405	1	1	POST	3114	LIKE	2026-02-22 10:46:39.406+05:30
406	1	1	POST	3115	LIKE	2026-02-22 10:46:39.406+05:30
407	1	1	POST	3116	LIKE	2026-02-22 10:46:39.406+05:30
408	1	1	POST	3117	LIKE	2026-02-22 10:46:39.406+05:30
409	1	1	POST	3118	LIKE	2026-02-22 10:46:39.406+05:30
410	1	1	POST	3119	LIKE	2026-02-22 10:46:39.406+05:30
411	1	1	POST	3000	LIKE	2026-02-23 10:46:39.406+05:30
412	1	1	POST	3001	LIKE	2026-02-23 10:46:39.406+05:30
413	1	1	POST	3002	LIKE	2026-02-23 10:46:39.406+05:30
414	1	1	POST	3003	LIKE	2026-02-23 10:46:39.406+05:30
415	1	1	POST	3004	LIKE	2026-02-23 10:46:39.406+05:30
416	1	1	POST	3005	LIKE	2026-02-23 10:46:39.406+05:30
417	1	1	POST	3006	LIKE	2026-02-23 10:46:39.406+05:30
418	1	1	POST	3007	LIKE	2026-02-23 10:46:39.406+05:30
419	1	1	POST	3008	LIKE	2026-02-23 10:46:39.406+05:30
420	1	1	POST	3009	LIKE	2026-02-23 10:46:39.406+05:30
421	1	1	POST	3010	LIKE	2026-02-23 10:46:39.406+05:30
422	1	1	POST	3011	LIKE	2026-02-23 10:46:39.406+05:30
423	1	1	POST	3012	LIKE	2026-02-23 10:46:39.406+05:30
424	1	1	POST	3013	LIKE	2026-02-23 10:46:39.406+05:30
425	1	1	POST	3014	LIKE	2026-02-23 10:46:39.406+05:30
426	1	1	POST	3015	LIKE	2026-02-23 10:46:39.406+05:30
427	1	1	POST	3016	LIKE	2026-02-23 10:46:39.406+05:30
428	1	1	POST	3017	LIKE	2026-02-23 10:46:39.406+05:30
429	1	1	POST	3018	LIKE	2026-02-23 10:46:39.406+05:30
430	1	1	POST	3019	LIKE	2026-02-23 10:46:39.406+05:30
431	1	1	POST	2900	LIKE	2026-02-24 10:46:39.406+05:30
432	1	1	POST	2901	LIKE	2026-02-24 10:46:39.406+05:30
433	1	1	POST	2902	LIKE	2026-02-24 10:46:39.406+05:30
434	1	1	POST	2903	LIKE	2026-02-24 10:46:39.406+05:30
435	1	1	POST	2904	LIKE	2026-02-24 10:46:39.406+05:30
436	1	1	POST	2905	LIKE	2026-02-24 10:46:39.406+05:30
437	1	1	POST	2906	LIKE	2026-02-24 10:46:39.406+05:30
438	1	1	POST	2907	LIKE	2026-02-24 10:46:39.406+05:30
439	1	1	POST	2908	LIKE	2026-02-24 10:46:39.406+05:30
440	1	1	POST	2909	LIKE	2026-02-24 10:46:39.406+05:30
441	1	1	POST	2910	LIKE	2026-02-24 10:46:39.406+05:30
442	1	1	POST	2911	LIKE	2026-02-24 10:46:39.406+05:30
443	1	1	POST	2912	LIKE	2026-02-24 10:46:39.406+05:30
444	1	1	POST	2913	LIKE	2026-02-24 10:46:39.406+05:30
445	1	1	POST	2914	LIKE	2026-02-24 10:46:39.406+05:30
446	1	1	POST	2915	LIKE	2026-02-24 10:46:39.406+05:30
447	1	1	POST	2916	LIKE	2026-02-24 10:46:39.406+05:30
448	1	1	POST	2917	LIKE	2026-02-24 10:46:39.406+05:30
449	1	1	POST	2918	LIKE	2026-02-24 10:46:39.406+05:30
450	1	1	POST	2919	LIKE	2026-02-24 10:46:39.406+05:30
451	1	1	POST	2800	LIKE	2026-02-25 10:46:39.406+05:30
452	1	1	POST	2801	LIKE	2026-02-25 10:46:39.406+05:30
453	1	1	POST	2802	LIKE	2026-02-25 10:46:39.406+05:30
454	1	1	POST	2803	LIKE	2026-02-25 10:46:39.406+05:30
455	1	1	POST	2804	LIKE	2026-02-25 10:46:39.406+05:30
456	1	1	POST	2805	LIKE	2026-02-25 10:46:39.406+05:30
457	1	1	POST	2806	LIKE	2026-02-25 10:46:39.406+05:30
458	1	1	POST	2807	LIKE	2026-02-25 10:46:39.406+05:30
459	1	1	POST	2808	LIKE	2026-02-25 10:46:39.406+05:30
460	1	1	POST	2809	LIKE	2026-02-25 10:46:39.406+05:30
461	1	1	POST	2810	LIKE	2026-02-25 10:46:39.406+05:30
462	1	1	POST	2811	LIKE	2026-02-25 10:46:39.406+05:30
463	1	1	POST	2812	LIKE	2026-02-25 10:46:39.406+05:30
464	1	1	POST	2813	LIKE	2026-02-25 10:46:39.406+05:30
465	1	1	POST	2814	LIKE	2026-02-25 10:46:39.406+05:30
466	1	1	POST	2815	LIKE	2026-02-25 10:46:39.406+05:30
467	1	1	POST	2816	LIKE	2026-02-25 10:46:39.406+05:30
468	1	1	POST	2817	LIKE	2026-02-25 10:46:39.406+05:30
469	1	1	POST	2818	LIKE	2026-02-25 10:46:39.406+05:30
470	1	1	POST	2819	LIKE	2026-02-25 10:46:39.406+05:30
471	1	1	POST	2700	LIKE	2026-02-26 10:46:39.406+05:30
472	1	1	POST	2701	LIKE	2026-02-26 10:46:39.406+05:30
473	1	1	POST	2702	LIKE	2026-02-26 10:46:39.406+05:30
474	1	1	POST	2703	LIKE	2026-02-26 10:46:39.406+05:30
475	1	1	POST	2704	LIKE	2026-02-26 10:46:39.406+05:30
476	1	1	POST	2705	LIKE	2026-02-26 10:46:39.406+05:30
477	1	1	POST	2706	LIKE	2026-02-26 10:46:39.406+05:30
478	1	1	POST	2707	LIKE	2026-02-26 10:46:39.406+05:30
479	1	1	POST	2708	LIKE	2026-02-26 10:46:39.406+05:30
480	1	1	POST	2709	LIKE	2026-02-26 10:46:39.406+05:30
481	1	1	POST	2710	LIKE	2026-02-26 10:46:39.406+05:30
482	1	1	POST	2711	LIKE	2026-02-26 10:46:39.406+05:30
483	1	1	POST	2712	LIKE	2026-02-26 10:46:39.406+05:30
484	1	1	POST	2713	LIKE	2026-02-26 10:46:39.406+05:30
485	1	1	POST	2714	LIKE	2026-02-26 10:46:39.406+05:30
486	1	1	POST	2715	LIKE	2026-02-26 10:46:39.406+05:30
487	1	1	POST	2716	LIKE	2026-02-26 10:46:39.406+05:30
488	1	1	POST	2717	LIKE	2026-02-26 10:46:39.406+05:30
489	1	1	POST	2718	LIKE	2026-02-26 10:46:39.406+05:30
490	1	1	POST	2719	LIKE	2026-02-26 10:46:39.406+05:30
491	1	1	POST	2600	LIKE	2026-02-27 10:46:39.406+05:30
492	1	1	POST	2601	LIKE	2026-02-27 10:46:39.406+05:30
493	1	1	POST	2602	LIKE	2026-02-27 10:46:39.406+05:30
494	1	1	POST	2603	LIKE	2026-02-27 10:46:39.406+05:30
495	1	1	POST	2604	LIKE	2026-02-27 10:46:39.406+05:30
496	1	1	POST	2605	LIKE	2026-02-27 10:46:39.406+05:30
497	1	1	POST	2606	LIKE	2026-02-27 10:46:39.406+05:30
498	1	1	POST	2607	LIKE	2026-02-27 10:46:39.406+05:30
499	1	1	POST	2608	LIKE	2026-02-27 10:46:39.406+05:30
500	1	1	POST	2609	LIKE	2026-02-27 10:46:39.406+05:30
501	1	1	POST	2610	LIKE	2026-02-27 10:46:39.406+05:30
502	1	1	POST	2611	LIKE	2026-02-27 10:46:39.406+05:30
503	1	1	POST	2612	LIKE	2026-02-27 10:46:39.406+05:30
504	1	1	POST	2613	LIKE	2026-02-27 10:46:39.406+05:30
505	1	1	POST	2614	LIKE	2026-02-27 10:46:39.406+05:30
506	1	1	POST	2615	LIKE	2026-02-27 10:46:39.406+05:30
507	1	1	POST	2616	LIKE	2026-02-27 10:46:39.406+05:30
508	1	1	POST	2617	LIKE	2026-02-27 10:46:39.406+05:30
509	1	1	POST	2618	LIKE	2026-02-27 10:46:39.406+05:30
510	1	1	POST	2619	LIKE	2026-02-27 10:46:39.406+05:30
511	1	1	POST	2500	LIKE	2026-02-28 10:46:39.406+05:30
512	1	1	POST	2501	LIKE	2026-02-28 10:46:39.406+05:30
513	1	1	POST	2502	LIKE	2026-02-28 10:46:39.406+05:30
514	1	1	POST	2503	LIKE	2026-02-28 10:46:39.406+05:30
515	1	1	POST	2504	LIKE	2026-02-28 10:46:39.406+05:30
516	1	1	POST	2505	LIKE	2026-02-28 10:46:39.406+05:30
517	1	1	POST	2506	LIKE	2026-02-28 10:46:39.406+05:30
518	1	1	POST	2507	LIKE	2026-02-28 10:46:39.406+05:30
519	1	1	POST	2508	LIKE	2026-02-28 10:46:39.406+05:30
520	1	1	POST	2509	LIKE	2026-02-28 10:46:39.406+05:30
521	1	1	POST	2510	LIKE	2026-02-28 10:46:39.406+05:30
522	1	1	POST	2511	LIKE	2026-02-28 10:46:39.406+05:30
523	1	1	POST	2512	LIKE	2026-02-28 10:46:39.406+05:30
524	1	1	POST	2513	LIKE	2026-02-28 10:46:39.406+05:30
525	1	1	POST	2514	LIKE	2026-02-28 10:46:39.406+05:30
526	1	1	POST	2515	LIKE	2026-02-28 10:46:39.406+05:30
527	1	1	POST	2516	LIKE	2026-02-28 10:46:39.406+05:30
528	1	1	POST	2517	LIKE	2026-02-28 10:46:39.406+05:30
529	1	1	POST	2518	LIKE	2026-02-28 10:46:39.406+05:30
530	1	1	POST	2519	LIKE	2026-02-28 10:46:39.406+05:30
531	1	1	POST	2400	LIKE	2026-03-01 10:46:39.406+05:30
532	1	1	POST	2401	LIKE	2026-03-01 10:46:39.406+05:30
533	1	1	POST	2402	LIKE	2026-03-01 10:46:39.406+05:30
534	1	1	POST	2403	LIKE	2026-03-01 10:46:39.406+05:30
535	1	1	POST	2404	LIKE	2026-03-01 10:46:39.406+05:30
536	1	1	POST	2405	LIKE	2026-03-01 10:46:39.406+05:30
537	1	1	POST	2406	LIKE	2026-03-01 10:46:39.406+05:30
538	1	1	POST	2407	LIKE	2026-03-01 10:46:39.406+05:30
539	1	1	POST	2408	LIKE	2026-03-01 10:46:39.406+05:30
540	1	1	POST	2409	LIKE	2026-03-01 10:46:39.406+05:30
541	1	1	POST	2410	LIKE	2026-03-01 10:46:39.406+05:30
542	1	1	POST	2411	LIKE	2026-03-01 10:46:39.406+05:30
543	1	1	POST	2412	LIKE	2026-03-01 10:46:39.406+05:30
544	1	1	POST	2413	LIKE	2026-03-01 10:46:39.406+05:30
545	1	1	POST	2414	LIKE	2026-03-01 10:46:39.406+05:30
546	1	1	POST	2415	LIKE	2026-03-01 10:46:39.406+05:30
547	1	1	POST	2416	LIKE	2026-03-01 10:46:39.406+05:30
548	1	1	POST	2417	LIKE	2026-03-01 10:46:39.406+05:30
549	1	1	POST	2418	LIKE	2026-03-01 10:46:39.406+05:30
550	1	1	POST	2419	LIKE	2026-03-01 10:46:39.406+05:30
551	1	1	POST	2300	LIKE	2026-03-02 10:46:39.406+05:30
552	1	1	POST	2301	LIKE	2026-03-02 10:46:39.406+05:30
553	1	1	POST	2302	LIKE	2026-03-02 10:46:39.406+05:30
554	1	1	POST	2303	LIKE	2026-03-02 10:46:39.406+05:30
555	1	1	POST	2304	LIKE	2026-03-02 10:46:39.406+05:30
556	1	1	POST	2305	LIKE	2026-03-02 10:46:39.406+05:30
557	1	1	POST	2306	LIKE	2026-03-02 10:46:39.406+05:30
558	1	1	POST	2307	LIKE	2026-03-02 10:46:39.406+05:30
559	1	1	POST	2308	LIKE	2026-03-02 10:46:39.406+05:30
560	1	1	POST	2309	LIKE	2026-03-02 10:46:39.406+05:30
561	1	1	POST	2310	LIKE	2026-03-02 10:46:39.406+05:30
562	1	1	POST	2311	LIKE	2026-03-02 10:46:39.406+05:30
563	1	1	POST	2312	LIKE	2026-03-02 10:46:39.406+05:30
564	1	1	POST	2313	LIKE	2026-03-02 10:46:39.406+05:30
565	1	1	POST	2314	LIKE	2026-03-02 10:46:39.406+05:30
566	1	1	POST	2315	LIKE	2026-03-02 10:46:39.406+05:30
567	1	1	POST	2316	LIKE	2026-03-02 10:46:39.406+05:30
568	1	1	POST	2317	LIKE	2026-03-02 10:46:39.406+05:30
569	1	1	POST	2318	LIKE	2026-03-02 10:46:39.406+05:30
570	1	1	POST	2319	LIKE	2026-03-02 10:46:39.406+05:30
571	1	1	POST	2200	LIKE	2026-03-03 10:46:39.406+05:30
572	1	1	POST	2201	LIKE	2026-03-03 10:46:39.406+05:30
573	1	1	POST	2202	LIKE	2026-03-03 10:46:39.406+05:30
574	1	1	POST	2203	LIKE	2026-03-03 10:46:39.406+05:30
575	1	1	POST	2204	LIKE	2026-03-03 10:46:39.406+05:30
576	1	1	POST	2205	LIKE	2026-03-03 10:46:39.406+05:30
577	1	1	POST	2206	LIKE	2026-03-03 10:46:39.406+05:30
578	1	1	POST	2207	LIKE	2026-03-03 10:46:39.406+05:30
579	1	1	POST	2208	LIKE	2026-03-03 10:46:39.406+05:30
580	1	1	POST	2209	LIKE	2026-03-03 10:46:39.406+05:30
581	1	1	POST	2210	LIKE	2026-03-03 10:46:39.406+05:30
582	1	1	POST	2211	LIKE	2026-03-03 10:46:39.406+05:30
583	1	1	POST	2212	LIKE	2026-03-03 10:46:39.406+05:30
584	1	1	POST	2213	LIKE	2026-03-03 10:46:39.406+05:30
585	1	1	POST	2214	LIKE	2026-03-03 10:46:39.406+05:30
586	1	1	POST	2215	LIKE	2026-03-03 10:46:39.406+05:30
587	1	1	POST	2216	LIKE	2026-03-03 10:46:39.406+05:30
588	1	1	POST	2217	LIKE	2026-03-03 10:46:39.406+05:30
589	1	1	POST	2218	LIKE	2026-03-03 10:46:39.406+05:30
590	1	1	POST	2219	LIKE	2026-03-03 10:46:39.406+05:30
591	1	1	POST	2100	LIKE	2026-03-04 10:46:39.406+05:30
592	1	1	POST	2101	LIKE	2026-03-04 10:46:39.406+05:30
593	1	1	POST	2102	LIKE	2026-03-04 10:46:39.406+05:30
594	1	1	POST	2103	LIKE	2026-03-04 10:46:39.406+05:30
595	1	1	POST	2104	LIKE	2026-03-04 10:46:39.406+05:30
596	1	1	POST	2105	LIKE	2026-03-04 10:46:39.406+05:30
597	1	1	POST	2106	LIKE	2026-03-04 10:46:39.406+05:30
598	1	1	POST	2107	LIKE	2026-03-04 10:46:39.406+05:30
599	1	1	POST	2108	LIKE	2026-03-04 10:46:39.406+05:30
600	1	1	POST	2109	LIKE	2026-03-04 10:46:39.406+05:30
601	1	1	POST	2110	LIKE	2026-03-04 10:46:39.406+05:30
602	1	1	POST	2111	LIKE	2026-03-04 10:46:39.406+05:30
603	1	1	POST	2112	LIKE	2026-03-04 10:46:39.406+05:30
604	1	1	POST	2113	LIKE	2026-03-04 10:46:39.406+05:30
605	1	1	POST	2114	LIKE	2026-03-04 10:46:39.406+05:30
606	1	1	POST	2115	LIKE	2026-03-04 10:46:39.406+05:30
607	1	1	POST	2116	LIKE	2026-03-04 10:46:39.406+05:30
608	1	1	POST	2117	LIKE	2026-03-04 10:46:39.406+05:30
609	1	1	POST	2118	LIKE	2026-03-04 10:46:39.406+05:30
610	1	1	POST	2119	LIKE	2026-03-04 10:46:39.406+05:30
611	1	1	POST	2000	LIKE	2026-03-05 10:46:39.406+05:30
612	1	1	POST	2001	LIKE	2026-03-05 10:46:39.406+05:30
613	1	1	POST	2002	LIKE	2026-03-05 10:46:39.406+05:30
614	1	1	POST	2003	LIKE	2026-03-05 10:46:39.406+05:30
615	1	1	POST	2004	LIKE	2026-03-05 10:46:39.406+05:30
616	1	1	POST	2005	LIKE	2026-03-05 10:46:39.406+05:30
617	1	1	POST	2006	LIKE	2026-03-05 10:46:39.406+05:30
618	1	1	POST	2007	LIKE	2026-03-05 10:46:39.406+05:30
619	1	1	POST	2008	LIKE	2026-03-05 10:46:39.406+05:30
620	1	1	POST	2009	LIKE	2026-03-05 10:46:39.406+05:30
621	1	1	POST	2010	LIKE	2026-03-05 10:46:39.406+05:30
622	1	1	POST	2011	LIKE	2026-03-05 10:46:39.406+05:30
623	1	1	POST	2012	LIKE	2026-03-05 10:46:39.406+05:30
624	1	1	POST	2013	LIKE	2026-03-05 10:46:39.406+05:30
625	1	1	POST	2014	LIKE	2026-03-05 10:46:39.406+05:30
626	1	1	POST	2015	LIKE	2026-03-05 10:46:39.406+05:30
627	1	1	POST	2016	LIKE	2026-03-05 10:46:39.406+05:30
628	1	1	POST	2017	LIKE	2026-03-05 10:46:39.406+05:30
629	1	1	POST	2018	LIKE	2026-03-05 10:46:39.406+05:30
630	1	1	POST	2019	LIKE	2026-03-05 10:46:39.406+05:30
631	19	2084	POST	19	COMMENT	2026-03-06 12:24:33.228+05:30
\.


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.languages (id, name, code, "flagCode", "isActive", "isDefault", created_at, updated_at) FROM stdin;
1	English	EN	US	t	t	2026-02-23 10:16:24.891+05:30	2026-02-23 10:16:24.891+05:30
2	Spanish	ES	ES	t	f	2026-02-23 10:16:24.891+05:30	2026-02-23 10:16:24.891+05:30
3	French	FR	FR	t	f	2026-02-23 10:16:24.891+05:30	2026-02-23 10:16:24.891+05:30
4	Hindi	HI	IN	t	f	2026-02-23 10:16:24.891+05:30	2026-02-23 10:16:24.891+05:30
5	Chinese	ZH	CN	f	f	2026-02-23 10:16:24.891+05:30	2026-02-23 10:16:24.891+05:30
\.


--
-- Data for Name: like_share_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.like_share_settings (user_id, hide_like_share_counts, created_at) FROM stdin;
18	f	2026-03-05 14:31:50.242+05:30
2	f	2026-02-26 14:48:18.735+05:30
\.


--
-- Data for Name: live_blocked_keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_blocked_keywords (id, "streamId", keyword, "createdAt", "updatedAt") FROM stdin;
7e2c8dc6-07c9-4584-8a1f-2c5b6e8966c7	c740dfbe-d33f-4c25-989d-7ef253e62932	shit	2026-03-04 08:46:46.198+05:30	2026-03-04 08:46:46.198+05:30
\.


--
-- Data for Name: live_blocked_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_blocked_users (id, "streamId", "userId", username, "createdAt", "updatedAt") FROM stdin;
466a9ae9-821f-4b6c-86b0-d13f55b46075	782bb235-3076-401f-89c6-b4aa53769777	5	farhan	2026-03-04 09:04:15.504+05:30	2026-03-04 09:04:15.504+05:30
f1572f60-0c6a-4a2f-bd46-a4aff8b22793	782bb235-3076-401f-89c6-b4aa53769777	5	farhan	2026-03-04 09:04:39.984+05:30	2026-03-04 09:04:39.984+05:30
\.


--
-- Data for Name: live_chat_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_chat_messages (id, "streamId", "userId", username, "profilePic", message, "isModerator", "isSystem", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: live_donations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_donations (id, stream_id, user_id, username, amount, message, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: live_guest_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_guest_requests (id, stream_id, user_id, username, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: live_moderators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_moderators (id, "streamId", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: live_muted_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_muted_users (id, "streamId", "userId", username, muted_until, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: live_poll_votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_poll_votes (id, poll_id, user_id, option_index, created_at, updated_at) FROM stdin;
45bb7eb5-5368-4169-8caa-68a61dbac5c6	61dd5e0e-fb58-460d-8b5c-2fd5a533e585	3	0	2026-02-28 15:23:29.922+05:30	2026-02-28 15:23:29.922+05:30
8d213c94-3a3b-4ab9-9d47-6559396572d3	32e4a81d-00ee-4b3d-bef3-ba3784620a0b	3	0	2026-02-28 15:59:06.502+05:30	2026-02-28 15:59:06.502+05:30
\.


--
-- Data for Name: live_polls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_polls (id, stream_id, question, options, duration, is_active, ended_at, created_at, updated_at) FROM stdin;
61dd5e0e-fb58-460d-8b5c-2fd5a533e585	4604563d-6bb7-49e8-88c4-0b2db46ef661	fee	[{"text": "y"}, {"text": "n"}]	60	t	\N	2026-02-28 15:23:28.407+05:30	2026-02-28 15:23:28.407+05:30
f857422f-a2e3-4d40-b0dc-b55496152699	69b55866-9745-4c7e-b840-5ed9c0b370a3	tgt	[{"text": "t"}, {"text": "s"}]	60	t	\N	2026-02-28 15:49:35.992+05:30	2026-02-28 15:49:35.992+05:30
32e4a81d-00ee-4b3d-bef3-ba3784620a0b	39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	trt	[{"text": "4"}, {"text": "r"}]	60	t	\N	2026-02-28 15:59:03.662+05:30	2026-02-28 15:59:03.662+05:30
\.


--
-- Data for Name: live_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_products (id, stream_id, product_id, featured, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: live_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_questions (id, stream_id, user_id, username, content, is_approved, is_highlighted, is_answered, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: live_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_settings (id, "streamId", comments_enabled, filter_spam, filter_abuse, filter_flagged, "createdAt", "updatedAt") FROM stdin;
a435a17f-d2b6-4a5b-8d0a-87b0bc7ab31b	2f3e99a0-d271-4e03-9698-242c7246d16b	t	f	f	f	2026-03-02 10:31:13.834+05:30	2026-03-02 10:31:13.834+05:30
26af6c28-a5cc-4460-ab05-c42ca4e09739	e5dfdc46-ec1a-413f-80bf-3a3e84abf987	t	f	f	f	2026-03-02 10:48:28.471+05:30	2026-03-02 10:48:28.471+05:30
0bf948f1-bf1a-42dd-872f-17d02d8a3587	a2647e1a-bb59-478c-b176-b2c770070629	t	f	f	f	2026-03-02 10:49:05.973+05:30	2026-03-02 10:49:05.973+05:30
3c275ef1-8633-441d-82a9-2fb11fd4b685	d6554a01-65f9-49db-a0b7-f348c43b7f38	t	f	f	f	2026-03-02 11:00:32.626+05:30	2026-03-02 11:00:32.626+05:30
a26b9f40-1f0c-4f61-b12c-c02e5254b8aa	46556f12-bc99-4fe2-b17d-3e66cc0b8969	t	f	f	f	2026-03-02 11:17:38.017+05:30	2026-03-02 11:17:38.017+05:30
badcfbcd-c93b-41f6-8aaf-b4a4e53d0638	8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	t	f	f	f	2026-03-02 12:03:21.098+05:30	2026-03-02 12:03:21.098+05:30
419eb636-fe3e-4516-a832-f2d3bc9c9c6f	ad1b781c-76e0-4f95-a2cf-f17f35874781	t	f	f	f	2026-03-02 12:11:16.002+05:30	2026-03-02 12:11:16.002+05:30
8c22c24a-d594-41f9-812f-7206dad77ea1	304af157-29e0-4bc0-a5f2-dcf51a51fe25	t	f	f	f	2026-03-02 12:14:28.009+05:30	2026-03-02 12:14:28.009+05:30
8ae302e8-f740-427c-a3eb-2384a8f34e57	ec9b82a6-87c9-454c-8206-0a50a547c06c	t	f	f	f	2026-03-02 12:19:59.419+05:30	2026-03-02 12:19:59.419+05:30
59fc92d6-5994-4403-b4af-a7dfd9a39e86	fd34f243-9d48-404c-a282-c961be3e55f5	t	f	f	f	2026-03-02 12:25:19.367+05:30	2026-03-02 12:25:19.367+05:30
c9d81a4f-c6e2-49eb-9638-a1afba149999	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	t	f	f	f	2026-03-02 12:45:44.186+05:30	2026-03-02 12:45:44.186+05:30
9fad1b1d-f6bb-4166-8a87-b89cc2f001a2	757a4b7c-81b6-4613-9dfb-de900dae6823	t	f	f	f	2026-03-02 13:52:06.592+05:30	2026-03-02 13:52:06.592+05:30
1ab8b703-57ed-4c89-9b07-588ee440b1c5	1f265282-3cf6-4e10-a004-bc8080e227d3	t	f	f	f	2026-03-02 14:24:39.549+05:30	2026-03-02 14:24:39.549+05:30
41bdddcc-f646-4058-871d-57266039040f	e3ddf773-9ac6-4a3d-92b9-b0beef4de80d	t	f	f	f	2026-03-02 15:34:03.562+05:30	2026-03-02 15:34:03.562+05:30
94863f08-2544-46c5-bf73-afb7e021d6c4	c740dfbe-d33f-4c25-989d-7ef253e62932	t	f	f	f	2026-03-04 08:44:14.372+05:30	2026-03-04 08:46:01.58+05:30
a4f1931a-fb59-4b89-a467-6793633dfd12	782bb235-3076-401f-89c6-b4aa53769777	t	f	f	f	2026-03-04 09:02:50.528+05:30	2026-03-04 09:02:50.528+05:30
ed310474-b65b-46c6-9b39-9107bb0c41ff	1d3aa0bb-0c23-4521-ab6b-355f87b57f93	t	f	f	f	2026-03-07 10:35:39.924+05:30	2026-03-07 10:35:39.924+05:30
3aeb8a7d-4fc6-4ffa-9749-e329c64fc8ff	5c6e28e0-4a2f-484f-98d5-48af755098b6	t	f	f	f	2026-03-07 12:17:01.013+05:30	2026-03-07 12:17:01.013+05:30
\.


--
-- Data for Name: live_stream_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_stream_messages (id, stream_id, user_id, message, created_at) FROM stdin;
d0c83f09-5a2f-43d6-ad32-54dab26d6c57	bce33b1b-8630-41be-8e91-ca623f09cc86	3	hello	2026-02-27 10:25:55.564+05:30
35e4ab2a-c3e2-4935-8e5a-5d0d6cb5fc98	70ca5ce1-0098-4147-bc50-faa7964109b2	3	hello	2026-02-27 10:29:00.895+05:30
5b8215ed-97e3-49ce-a840-b7e88dca8b41	3c70b32b-030a-4d77-a9b3-8f1999a06cf2	3	hello	2026-02-27 10:42:41.038+05:30
10dbc0dd-5378-4bd8-87ae-12774cf0420d	6aa224d3-0d98-40da-b28e-294aaecb6155	3	f	2026-02-27 10:55:11.301+05:30
2d76e617-7568-4c4d-927a-70095f2c18c2	a318736a-dcf4-4494-8d31-2d7ceeec420d	2	db	2026-02-27 11:34:18.492+05:30
66d14f12-2325-4f6b-8581-6e5db6dde322	a318736a-dcf4-4494-8d31-2d7ceeec420d	2	sethgersth	2026-02-27 11:34:26.181+05:30
acca1b80-46fa-4457-ba8e-e50269e12c93	fac877e6-236c-46a4-8f41-0f3706219352	5	hello akbar	2026-02-27 15:20:20.899+05:30
84895d60-0fe2-4ab4-b25d-f0af4db707cc	fac877e6-236c-46a4-8f41-0f3706219352	3	hii farhan	2026-02-27 15:22:08.119+05:30
9fc56d19-a782-4d00-a7c0-70351f6c471b	fac877e6-236c-46a4-8f41-0f3706219352	2	hiii	2026-02-27 15:25:28.888+05:30
c37e4b8d-4789-41ca-894f-16deb3d9c7b6	fac877e6-236c-46a4-8f41-0f3706219352	2	fsn	2026-02-27 16:06:39.086+05:30
2b02c351-f75f-4dde-a310-3ed89f4163f5	64dae23e-fbe6-4937-8c99-378e7850b495	5	hii	2026-02-28 10:24:12.785+05:30
fe34e303-efc0-4213-89e0-0b88276596d0	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	2	mai karu ab mera kam ???	2026-02-28 10:44:04.204+05:30
a5fddffa-d063-4a62-b236-51ceff4b1ade	a5f756d4-ce57-420e-8505-24609cc60549	2	baju mai koi aaya hai ya nahi???	2026-02-28 11:19:10.382+05:30
6591816b-d0ca-4524-a552-80949baccc05	a5f756d4-ce57-420e-8505-24609cc60549	2	ha aaye hai	2026-02-28 11:20:36.995+05:30
3bbb4687-8b6d-40ea-a4a1-de8e5e37b10d	6743adab-fef4-4420-928d-6f996afb3cf2	3	hi	2026-02-28 12:23:28.864+05:30
7a25b6f1-4b7f-426a-8f8d-19422e336e8c	7e8ad122-5027-4a31-bffe-f1e7099ec9cf	3	ff	2026-02-28 15:44:10.4+05:30
1df167b3-dd16-4882-87d8-8d06fbe20167	39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	3	gttt	2026-02-28 15:59:16.492+05:30
c8b54e60-f36b-41b7-ac1d-bff89ed9c291	ad1b781c-76e0-4f95-a2cf-f17f35874781	10	ehfeieofqk	2026-03-02 12:12:12.794+05:30
bb72a3f2-9039-47c7-80c9-04382dddca77	ad1b781c-76e0-4f95-a2cf-f17f35874781	9	ganja	2026-03-02 12:12:21.49+05:30
9ce1e830-cee0-4e12-bf4a-7004c9cccb21	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	3	bhh	2026-03-02 13:29:34.526+05:30
4f8bbd16-8d88-4980-9c95-d9a217b36a90	757a4b7c-81b6-4613-9dfb-de900dae6823	9	😉😉	2026-03-02 13:52:42.46+05:30
a3ca553c-8af2-4a1a-a276-3415ce8f0917	757a4b7c-81b6-4613-9dfb-de900dae6823	3	😁😆	2026-03-02 13:52:53.808+05:30
3986d7e4-db99-4298-99f0-eeca6d9477bf	757a4b7c-81b6-4613-9dfb-de900dae6823	9	😇	2026-03-02 13:52:55.067+05:30
b7723b1e-3b6f-4f43-9086-5c272aece57f	757a4b7c-81b6-4613-9dfb-de900dae6823	3	🙃😆😆	2026-03-02 13:53:12.927+05:30
b8fcea7e-85b1-4ef7-82af-574e05b9c784	757a4b7c-81b6-4613-9dfb-de900dae6823	3	🙃	2026-03-02 13:54:32.615+05:30
352e7393-f5e6-428a-b1fe-77419df229ad	757a4b7c-81b6-4613-9dfb-de900dae6823	3	hello 😄😄	2026-03-02 13:59:31.884+05:30
82e45ceb-b69b-4fac-be87-42e26ffab7f4	1f265282-3cf6-4e10-a004-bc8080e227d3	3	😄😄😄	2026-03-02 14:45:37.963+05:30
87fdf0ef-b263-4b55-a64b-14c4da5ea2bf	1f265282-3cf6-4e10-a004-bc8080e227d3	3	😄😄😄😄😄	2026-03-02 14:45:56.948+05:30
617c8436-7d8e-446a-a5f7-e9131be5778e	1f265282-3cf6-4e10-a004-bc8080e227d3	3	😄😁😁😆	2026-03-02 15:00:41.76+05:30
60f9713c-38c5-41f6-994a-c472aad10e8d	1f265282-3cf6-4e10-a004-bc8080e227d3	3	😀😀😀	2026-03-02 15:01:14.822+05:30
606943c7-ae44-40c8-9b7c-ab77c5cc8412	c740dfbe-d33f-4c25-989d-7ef253e62932	3	shit	2026-03-04 08:47:13.207+05:30
23fa5566-994f-4f56-b217-09774b395bcf	782bb235-3076-401f-89c6-b4aa53769777	5	hello	2026-03-04 09:05:06.86+05:30
ea44281e-fefa-4367-94ba-de50092471ad	5c6e28e0-4a2f-484f-98d5-48af755098b6	5	helllo	2026-03-07 12:56:53.535+05:30
a28f60b7-a4f1-4810-99e3-587f331e061a	5c6e28e0-4a2f-484f-98d5-48af755098b6	5	🫠🫠🫠	2026-03-07 12:57:03.634+05:30
\.


--
-- Data for Name: live_stream_viewers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_stream_viewers (id, stream_id, user_id, joined_at, left_at, watch_duration_seconds, created_at, updated_at) FROM stdin;
57a50bb3-9441-44c2-9d40-a1636aa43eec	437b03b0-9855-471d-8dd2-356a4b100d86	2	2026-02-27 13:14:15.189+05:30	\N	0	2026-02-27 13:14:15.189+05:30	2026-02-27 13:14:15.189+05:30
fa88055a-bf71-4d71-8acf-a6f72db78aa3	437b03b0-9855-471d-8dd2-356a4b100d86	2	2026-02-27 13:14:15.19+05:30	\N	0	2026-02-27 13:14:15.19+05:30	2026-02-27 13:14:15.19+05:30
df667aa2-89d8-4e52-a981-27048a48bc86	437b03b0-9855-471d-8dd2-356a4b100d86	2	2026-02-27 13:19:11.73+05:30	\N	0	2026-02-27 13:19:11.73+05:30	2026-02-27 13:19:11.73+05:30
db1303ef-74f3-4843-8bb4-b4f3e64dc7e9	437b03b0-9855-471d-8dd2-356a4b100d86	2	2026-02-27 13:19:11.73+05:30	\N	0	2026-02-27 13:19:11.73+05:30	2026-02-27 13:19:11.73+05:30
9fcd265a-3b28-4063-bf6a-3aba58570819	da027ee4-730b-4e10-b726-d740bb55b6a8	2	2026-02-27 13:21:02.876+05:30	\N	0	2026-02-27 13:21:02.876+05:30	2026-02-27 13:21:02.876+05:30
cd009e59-9301-4b65-8501-e11e0cfa6c97	da027ee4-730b-4e10-b726-d740bb55b6a8	2	2026-02-27 13:21:02.877+05:30	\N	0	2026-02-27 13:21:02.877+05:30	2026-02-27 13:21:02.877+05:30
df850e01-e6ca-4a36-8982-1bb207a2c20a	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 13:28:49.798+05:30	\N	0	2026-02-27 13:28:49.798+05:30	2026-02-27 13:28:49.798+05:30
09a25652-7624-4a47-a1e5-92f495a5e6bf	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 13:28:49.799+05:30	\N	0	2026-02-27 13:28:49.799+05:30	2026-02-27 13:28:49.799+05:30
974f2d65-f3c8-47f0-8e0c-5273f36f9a3d	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 13:29:12.84+05:30	\N	0	2026-02-27 13:29:12.84+05:30	2026-02-27 13:29:12.84+05:30
b8fcc396-7311-49b6-871a-08469943c622	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 13:29:12.841+05:30	\N	0	2026-02-27 13:29:12.841+05:30	2026-02-27 13:29:12.841+05:30
cb6da0ab-4dd9-4fe4-9e9e-a3176506152f	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:02.302+05:30	\N	0	2026-02-27 15:05:02.302+05:30	2026-02-27 15:05:02.302+05:30
33895583-1689-48b7-bf78-a4bcd700861e	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:02.32+05:30	\N	0	2026-02-27 15:05:02.32+05:30	2026-02-27 15:05:02.32+05:30
2126440e-bb2f-4d83-8f1b-a9a745e10b4c	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:02.334+05:30	\N	0	2026-02-27 15:05:02.334+05:30	2026-02-27 15:05:02.334+05:30
799f7a85-9e14-4915-b8a2-1cc11adf08b5	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:02.37+05:30	\N	0	2026-02-27 15:05:02.37+05:30	2026-02-27 15:05:02.37+05:30
bb15b8ad-6f16-4e55-9381-a10510beaaae	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:12.446+05:30	\N	0	2026-02-27 15:05:12.446+05:30	2026-02-27 15:05:12.446+05:30
c90661c2-3c8c-41ec-9260-749f8caef2d0	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:12.461+05:30	\N	0	2026-02-27 15:05:12.461+05:30	2026-02-27 15:05:12.461+05:30
83cb9694-22ac-4203-ae4c-844a7ad2d979	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:15.995+05:30	\N	0	2026-02-27 15:05:15.995+05:30	2026-02-27 15:05:15.995+05:30
77617a8e-8587-4b06-adc6-f17a9e244da3	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:16.007+05:30	\N	0	2026-02-27 15:05:16.007+05:30	2026-02-27 15:05:16.007+05:30
eb1b5591-0f64-43f0-a1df-91614c38844c	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:16.037+05:30	\N	0	2026-02-27 15:05:16.037+05:30	2026-02-27 15:05:16.037+05:30
a5d0c3f9-3ee9-4008-94b3-07fc3bf7b212	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:25.697+05:30	\N	0	2026-02-27 15:05:25.697+05:30	2026-02-27 15:05:25.697+05:30
f966356e-8bb4-433f-ad19-f8b778004236	437b03b0-9855-471d-8dd2-356a4b100d86	3	2026-02-27 15:05:25.711+05:30	\N	0	2026-02-27 15:05:25.712+05:30	2026-02-27 15:05:25.712+05:30
b7d83c36-9b44-462f-bf46-05ee22266323	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:20:05.267+05:30	\N	0	2026-02-27 15:20:05.268+05:30	2026-02-27 15:20:05.268+05:30
e3df3b9b-a726-4850-a8f3-53b1f52ad51f	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:20:05.276+05:30	\N	0	2026-02-27 15:20:05.276+05:30	2026-02-27 15:20:05.276+05:30
1d3aafbd-193b-4f7a-918d-e06537969703	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:20:05.317+05:30	\N	0	2026-02-27 15:20:05.317+05:30	2026-02-27 15:20:05.317+05:30
5e12b52f-576f-4461-a801-389c6b90624a	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:20:05.318+05:30	\N	0	2026-02-27 15:20:05.318+05:30	2026-02-27 15:20:05.318+05:30
bde9ae1c-fa3e-4de8-a23c-c6f70133659e	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:23:09.924+05:30	\N	0	2026-02-27 15:23:09.924+05:30	2026-02-27 15:23:09.924+05:30
3d70323e-88cf-495b-97bb-8d968e438f86	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:23:09.938+05:30	\N	0	2026-02-27 15:23:09.938+05:30	2026-02-27 15:23:09.938+05:30
6c1a6b03-4434-4896-85db-14e0764b50fd	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:24:30.68+05:30	\N	0	2026-02-27 15:24:30.68+05:30	2026-02-27 15:24:30.68+05:30
d1619dfc-0c25-4bb7-9f86-8f989cd89d39	fac877e6-236c-46a4-8f41-0f3706219352	5	2026-02-27 15:24:30.698+05:30	\N	0	2026-02-27 15:24:30.698+05:30	2026-02-27 15:24:30.698+05:30
072b76cf-01b3-4732-b10c-0758e7dce199	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:24.857+05:30	\N	0	2026-02-27 15:25:24.857+05:30	2026-02-27 15:25:24.857+05:30
da11a971-de06-4c43-9940-f023afa81e01	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:24.87+05:30	\N	0	2026-02-27 15:25:24.87+05:30	2026-02-27 15:25:24.87+05:30
d298119f-eeb6-4fe3-b390-7b178c518973	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:24.89+05:30	\N	0	2026-02-27 15:25:24.89+05:30	2026-02-27 15:25:24.89+05:30
9a4566a9-a4f9-4909-8976-74b312248b4d	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:24.982+05:30	\N	0	2026-02-27 15:25:24.982+05:30	2026-02-27 15:25:24.982+05:30
527795e7-8aef-4910-a7ae-40c3ff9a7634	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:40.178+05:30	\N	0	2026-02-27 15:25:40.178+05:30	2026-02-27 15:25:40.178+05:30
76d8cee4-e8ae-4d51-b32f-89edeb012345	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:40.211+05:30	\N	0	2026-02-27 15:25:40.211+05:30	2026-02-27 15:25:40.211+05:30
51f6d993-1e9a-4508-a7ac-e0e3560fd400	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:43.431+05:30	\N	0	2026-02-27 15:25:43.432+05:30	2026-02-27 15:25:43.432+05:30
ede66fd9-258b-49c2-9493-d0cd4c447c9e	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:43.482+05:30	\N	0	2026-02-27 15:25:43.482+05:30	2026-02-27 15:25:43.482+05:30
91305ad1-63ed-4f7e-ad70-ae4fe55e7640	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:47.21+05:30	\N	0	2026-02-27 15:25:47.21+05:30	2026-02-27 15:25:47.21+05:30
1fe7edc3-0d59-4576-a353-c2f5e8f2103a	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:47.227+05:30	\N	0	2026-02-27 15:25:47.227+05:30	2026-02-27 15:25:47.227+05:30
5d6a9df6-750b-495b-a9cf-805a3e686e12	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:49.615+05:30	\N	0	2026-02-27 15:25:49.615+05:30	2026-02-27 15:25:49.615+05:30
64c1d03e-e626-48b8-b721-306797b960ea	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:25:49.638+05:30	\N	0	2026-02-27 15:25:49.638+05:30	2026-02-27 15:25:49.638+05:30
238c7a3a-39f4-4f54-9a9e-6f1dc83be3ea	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:29:00.49+05:30	\N	0	2026-02-27 15:29:00.49+05:30	2026-02-27 15:29:00.49+05:30
53bcce8a-e7b7-425c-9f09-e793cc51b857	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 15:29:00.552+05:30	\N	0	2026-02-27 15:29:00.552+05:30	2026-02-27 15:29:00.552+05:30
9c9cbbc4-3808-49df-8d8c-d4b0b1ec7329	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:43:39.443+05:30	\N	0	2026-02-27 15:43:39.444+05:30	2026-02-27 15:43:39.444+05:30
97e662a0-7378-4a28-8c4d-a25ff95ecc95	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:43:39.466+05:30	\N	0	2026-02-27 15:43:39.466+05:30	2026-02-27 15:43:39.466+05:30
96556d32-c2f7-4450-a323-c3e81533862e	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:43:39.497+05:30	\N	0	2026-02-27 15:43:39.497+05:30	2026-02-27 15:43:39.497+05:30
3d20eb29-690b-4db0-a245-7bfe8fb8df31	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:43:39.528+05:30	\N	0	2026-02-27 15:43:39.528+05:30	2026-02-27 15:43:39.528+05:30
c7e32d48-298b-41a6-942f-13323b522ec5	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:43:40.882+05:30	\N	0	2026-02-27 15:43:40.882+05:30	2026-02-27 15:43:40.882+05:30
ea14ab5c-1d65-4425-97f6-6d47e2c7926d	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:43:44.906+05:30	\N	0	2026-02-27 15:43:44.906+05:30	2026-02-27 15:43:44.906+05:30
72f0b953-dc0a-4b5f-a6d1-db160de7343c	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:45:05.543+05:30	\N	0	2026-02-27 15:45:05.543+05:30	2026-02-27 15:45:05.543+05:30
c2e54164-b67e-4031-ae64-21028fb08067	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:45:05.544+05:30	\N	0	2026-02-27 15:45:05.544+05:30	2026-02-27 15:45:05.544+05:30
a4581482-c7be-4edc-a272-fb3b2cd76ee9	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:45:05.567+05:30	\N	0	2026-02-27 15:45:05.567+05:30	2026-02-27 15:45:05.567+05:30
979e7d18-a1c6-43be-8d95-96e1506159d1	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:45:10.712+05:30	\N	0	2026-02-27 15:45:10.712+05:30	2026-02-27 15:45:10.712+05:30
415cbedd-a530-4830-a6eb-23b615ecb958	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:00.41+05:30	\N	0	2026-02-27 15:54:00.41+05:30	2026-02-27 15:54:00.41+05:30
3f81a117-7687-4ba5-a2a8-d4a706208a25	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:00.43+05:30	\N	0	2026-02-27 15:54:00.43+05:30	2026-02-27 15:54:00.43+05:30
c9a8aea4-abb2-4ccc-8bb0-17f9076ca376	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:38.575+05:30	\N	0	2026-02-27 15:54:38.575+05:30	2026-02-27 15:54:38.575+05:30
355e08ae-beb3-461a-a423-f75794a92ddb	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:38.584+05:30	\N	0	2026-02-27 15:54:38.584+05:30	2026-02-27 15:54:38.584+05:30
3169f497-0e78-4b1c-b74d-4721130ef67a	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:38.593+05:30	\N	0	2026-02-27 15:54:38.593+05:30	2026-02-27 15:54:38.593+05:30
bbcb3ddf-1c08-4fe6-9d4a-c466d97554a2	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:38.614+05:30	\N	0	2026-02-27 15:54:38.614+05:30	2026-02-27 15:54:38.614+05:30
44b3f246-e7e1-4be7-b327-31a2f80fe1f0	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:53.483+05:30	\N	0	2026-02-27 15:54:53.483+05:30	2026-02-27 15:54:53.483+05:30
872484c3-8e6e-44c3-849b-9754796ed61b	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:53.49+05:30	\N	0	2026-02-27 15:54:53.49+05:30	2026-02-27 15:54:53.49+05:30
c514b827-c877-4fc6-ac54-a74fd425ef0e	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:53.51+05:30	\N	0	2026-02-27 15:54:53.51+05:30	2026-02-27 15:54:53.51+05:30
c6f8b418-7baa-436d-af23-8384458463e9	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:54:53.517+05:30	\N	0	2026-02-27 15:54:53.517+05:30	2026-02-27 15:54:53.517+05:30
37c1bce2-c3f3-41d4-b85a-412dd129c8aa	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:55:03.422+05:30	\N	0	2026-02-27 15:55:03.422+05:30	2026-02-27 15:55:03.422+05:30
59659590-a1b1-494b-a604-b8a735bf730e	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:55:03.443+05:30	\N	0	2026-02-27 15:55:03.443+05:30	2026-02-27 15:55:03.443+05:30
e2c2c8f2-be79-4848-93c6-d327a40c2c10	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:55:03.454+05:30	\N	0	2026-02-27 15:55:03.454+05:30	2026-02-27 15:55:03.454+05:30
27581223-bf5d-4391-b012-8a5c8e287b05	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:55:10.423+05:30	\N	0	2026-02-27 15:55:10.423+05:30	2026-02-27 15:55:10.423+05:30
abc61397-c072-4e53-81a9-fd01393973c8	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:55:10.438+05:30	\N	0	2026-02-27 15:55:10.438+05:30	2026-02-27 15:55:10.438+05:30
d4527274-5f13-413f-b353-07ac91a88772	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:55:10.452+05:30	\N	0	2026-02-27 15:55:10.452+05:30	2026-02-27 15:55:10.452+05:30
da9b57e3-1ccf-4d03-8cab-059e5c29420d	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:55:10.458+05:30	\N	0	2026-02-27 15:55:10.458+05:30	2026-02-27 15:55:10.458+05:30
245a94c4-4a60-42d3-a799-46dee4ee1ad4	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:57:07.07+05:30	\N	0	2026-02-27 15:57:07.07+05:30	2026-02-27 15:57:07.07+05:30
fe62f2b0-2b48-4326-93ce-c7b8ada007fd	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:57:07.071+05:30	\N	0	2026-02-27 15:57:07.071+05:30	2026-02-27 15:57:07.071+05:30
070481d6-e020-46af-bac9-0595bf07d3fa	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:57:07.108+05:30	\N	0	2026-02-27 15:57:07.108+05:30	2026-02-27 15:57:07.108+05:30
ffa15d80-a280-4459-a2d0-5c03e0d8232b	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:57:35.132+05:30	\N	0	2026-02-27 15:57:35.132+05:30	2026-02-27 15:57:35.132+05:30
1b97bdbf-f2c1-4898-a343-29cc5de202d7	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:57:35.158+05:30	\N	0	2026-02-27 15:57:35.158+05:30	2026-02-27 15:57:35.158+05:30
73be89f7-d75b-4fee-9073-e18d2cc5e738	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:57:35.245+05:30	\N	0	2026-02-27 15:57:35.245+05:30	2026-02-27 15:57:35.245+05:30
dcab8182-a300-436f-93e4-eb5daaa5f9fe	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 15:57:57.617+05:30	\N	0	2026-02-27 15:57:57.617+05:30	2026-02-27 15:57:57.617+05:30
61ee226b-1a59-46ff-9b30-e8d547d602a7	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 16:01:56.791+05:30	\N	0	2026-02-27 16:01:56.791+05:30	2026-02-27 16:01:56.791+05:30
1f3f3d5c-07a6-4251-a734-c0af1f05908e	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 16:01:56.804+05:30	\N	0	2026-02-27 16:01:56.804+05:30	2026-02-27 16:01:56.804+05:30
2d93758c-b6de-4917-aceb-ed6d5858fedb	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 16:01:56.816+05:30	\N	0	2026-02-27 16:01:56.816+05:30	2026-02-27 16:01:56.816+05:30
2132ee5c-7989-431e-b339-8425564694e5	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 16:01:56.853+05:30	\N	0	2026-02-27 16:01:56.853+05:30	2026-02-27 16:01:56.853+05:30
4f59accd-db9f-4300-a99b-edf202c5f4e3	fac877e6-236c-46a4-8f41-0f3706219352	3	2026-02-27 16:05:04.709+05:30	\N	0	2026-02-27 16:05:04.709+05:30	2026-02-27 16:05:04.709+05:30
816e7f37-dcf3-4cee-ae50-dcd18b57ad4b	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 16:06:29.042+05:30	\N	0	2026-02-27 16:06:29.042+05:30	2026-02-27 16:06:29.042+05:30
4dd27cfa-4a5b-4b40-852d-c87ea377637e	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 16:06:29.05+05:30	\N	0	2026-02-27 16:06:29.051+05:30	2026-02-27 16:06:29.051+05:30
019182d0-da4e-4014-9ab5-f80ab925027f	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 16:06:29.066+05:30	\N	0	2026-02-27 16:06:29.066+05:30	2026-02-27 16:06:29.066+05:30
b59ff243-f6b7-4219-b93d-bdde68ff8e00	fac877e6-236c-46a4-8f41-0f3706219352	2	2026-02-27 16:06:29.151+05:30	\N	0	2026-02-27 16:06:29.151+05:30	2026-02-27 16:06:29.151+05:30
3fba2253-86e5-4052-96e9-8ed480eaa2f4	ef845ba0-62c7-4270-be15-cdac934674a1	3	2026-02-28 10:02:32.299+05:30	\N	0	2026-02-28 10:02:32.299+05:30	2026-02-28 10:02:32.299+05:30
02203881-90ad-49af-ba28-da0bb613cb4b	ef845ba0-62c7-4270-be15-cdac934674a1	3	2026-02-28 10:02:32.315+05:30	\N	0	2026-02-28 10:02:32.315+05:30	2026-02-28 10:02:32.315+05:30
d9f51e8c-dfd2-4974-a3bb-e94daf653131	ef845ba0-62c7-4270-be15-cdac934674a1	3	2026-02-28 10:02:32.359+05:30	\N	0	2026-02-28 10:02:32.359+05:30	2026-02-28 10:02:32.359+05:30
132e44ab-7b3d-48d9-891a-139db386e36a	ef845ba0-62c7-4270-be15-cdac934674a1	3	2026-02-28 10:02:32.37+05:30	\N	0	2026-02-28 10:02:32.37+05:30	2026-02-28 10:02:32.37+05:30
8ea22210-02b1-4ffd-87bf-a50ca2ceb103	ef845ba0-62c7-4270-be15-cdac934674a1	3	2026-02-28 10:02:32.372+05:30	\N	0	2026-02-28 10:02:32.372+05:30	2026-02-28 10:02:32.372+05:30
bdb2226a-644f-4ae6-9f31-19475a45a95d	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:04:19.888+05:30	\N	0	2026-02-28 10:04:19.888+05:30	2026-02-28 10:04:19.888+05:30
af8b2d2a-9b0e-4b1f-86aa-b2dd78c4785a	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:04:19.902+05:30	\N	0	2026-02-28 10:04:19.902+05:30	2026-02-28 10:04:19.902+05:30
6f4cd367-a1a8-4798-b2eb-31e2d4542eb9	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:04:19.94+05:30	\N	0	2026-02-28 10:04:19.94+05:30	2026-02-28 10:04:19.94+05:30
878bc889-9f26-42a2-9784-aa99d0d692bd	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:04:19.944+05:30	\N	0	2026-02-28 10:04:19.944+05:30	2026-02-28 10:04:19.944+05:30
d05a979b-fcc9-481a-8712-37b52f3642d8	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:05:23.269+05:30	\N	0	2026-02-28 10:05:23.269+05:30	2026-02-28 10:05:23.269+05:30
9b2da1b4-ceb0-4802-baa9-dcc63336d37b	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:05:36.804+05:30	\N	0	2026-02-28 10:05:36.804+05:30	2026-02-28 10:05:36.804+05:30
3ed47e65-0119-49bd-8060-5fba4c793f9d	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:06:36.268+05:30	\N	0	2026-02-28 10:06:36.268+05:30	2026-02-28 10:06:36.268+05:30
2e8dee75-7c2b-443d-86c9-13a8a9ddbfc3	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:06:36.286+05:30	\N	0	2026-02-28 10:06:36.286+05:30	2026-02-28 10:06:36.286+05:30
fa8a6b6e-cb4d-435e-99a5-4c867c380c04	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:07:05.4+05:30	\N	0	2026-02-28 10:07:05.4+05:30	2026-02-28 10:07:05.4+05:30
e4a8bf97-95d5-4790-afa3-3a56634e3945	9e205020-22a6-4c2d-8480-c06d886d8994	5	2026-02-28 10:13:39.913+05:30	\N	0	2026-02-28 10:13:39.913+05:30	2026-02-28 10:13:39.913+05:30
93663fa1-cbb4-4442-924b-132d9d6bb289	64dae23e-fbe6-4937-8c99-378e7850b495	5	2026-02-28 10:21:36.327+05:30	\N	0	2026-02-28 10:21:36.327+05:30	2026-02-28 10:21:36.327+05:30
36b1c05b-7305-48f3-a9d7-03b681c5cfff	64dae23e-fbe6-4937-8c99-378e7850b495	5	2026-02-28 10:21:36.343+05:30	\N	0	2026-02-28 10:21:36.343+05:30	2026-02-28 10:21:36.343+05:30
37299dd8-a866-4fa0-8e24-4f38af3f65a8	64dae23e-fbe6-4937-8c99-378e7850b495	5	2026-02-28 10:21:36.413+05:30	\N	0	2026-02-28 10:21:36.413+05:30	2026-02-28 10:21:36.413+05:30
e1f7aa0e-30a4-4367-8dd1-20d7ade87eb8	64dae23e-fbe6-4937-8c99-378e7850b495	5	2026-02-28 10:21:36.414+05:30	\N	0	2026-02-28 10:21:36.414+05:30	2026-02-28 10:21:36.414+05:30
4fa0dfba-8425-4810-b759-4167debbfe19	64dae23e-fbe6-4937-8c99-378e7850b495	5	2026-02-28 10:21:51.615+05:30	\N	0	2026-02-28 10:21:51.615+05:30	2026-02-28 10:21:51.615+05:30
9aeb18c5-5637-405b-8340-d65b0ea6adc2	64dae23e-fbe6-4937-8c99-378e7850b495	5	2026-02-28 10:22:11.838+05:30	\N	0	2026-02-28 10:22:11.838+05:30	2026-02-28 10:22:11.838+05:30
dc66ac57-2279-4ece-9118-bb84a6384d72	64dae23e-fbe6-4937-8c99-378e7850b495	5	2026-02-28 10:24:26.069+05:30	\N	0	2026-02-28 10:24:26.069+05:30	2026-02-28 10:24:26.069+05:30
64182a69-b55b-4680-9fad-523ed8ffb6ca	ea0ac943-45f1-49a1-90a8-c9e82ae63126	6	2026-02-28 10:30:25.139+05:30	\N	0	2026-02-28 10:30:25.139+05:30	2026-02-28 10:30:25.139+05:30
473cfd98-f688-46db-9eea-9c0c94147f12	ea0ac943-45f1-49a1-90a8-c9e82ae63126	6	2026-02-28 10:30:25.155+05:30	\N	0	2026-02-28 10:30:25.155+05:30	2026-02-28 10:30:25.155+05:30
b493f16f-8fce-450c-b1b9-f2c871a1c05e	ea0ac943-45f1-49a1-90a8-c9e82ae63126	6	2026-02-28 10:30:25.165+05:30	\N	0	2026-02-28 10:30:25.165+05:30	2026-02-28 10:30:25.165+05:30
81987fe6-d4ce-434f-a935-ca617e73bb02	ea0ac943-45f1-49a1-90a8-c9e82ae63126	6	2026-02-28 10:30:25.191+05:30	\N	0	2026-02-28 10:30:25.191+05:30	2026-02-28 10:30:25.191+05:30
05f9602b-ea71-45f6-a0eb-23cd74b19e0e	ea0ac943-45f1-49a1-90a8-c9e82ae63126	6	2026-02-28 10:30:25.203+05:30	\N	0	2026-02-28 10:30:25.203+05:30	2026-02-28 10:30:25.203+05:30
ebc6e152-9bb1-446c-a0a5-43605190ef93	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:33:58.043+05:30	\N	0	2026-02-28 10:33:58.043+05:30	2026-02-28 10:33:58.043+05:30
efe1377a-c902-4efa-bb04-fdd578272ab9	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:33:58.066+05:30	\N	0	2026-02-28 10:33:58.066+05:30	2026-02-28 10:33:58.066+05:30
ad644fde-6931-47c2-9c0d-ab8666457c19	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:33:58.121+05:30	\N	0	2026-02-28 10:33:58.121+05:30	2026-02-28 10:33:58.121+05:30
526f5071-fa28-4abc-9ad0-b06f731f32b3	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:33:58.122+05:30	\N	0	2026-02-28 10:33:58.122+05:30	2026-02-28 10:33:58.122+05:30
c601f80c-3d84-4542-b707-f7dcfde45daa	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:34:12.345+05:30	\N	0	2026-02-28 10:34:12.345+05:30	2026-02-28 10:34:12.345+05:30
0fce2a1f-be8d-496d-a2f3-3ee01d2f1a27	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:34:38.148+05:30	\N	0	2026-02-28 10:34:38.148+05:30	2026-02-28 10:34:38.148+05:30
397d1327-2795-4f52-876d-d30b3f4dade2	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:35:00.828+05:30	\N	0	2026-02-28 10:35:00.828+05:30	2026-02-28 10:35:00.828+05:30
b49d87da-2e47-4f0b-8ab9-ae02726f363f	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:35:33.447+05:30	\N	0	2026-02-28 10:35:33.447+05:30	2026-02-28 10:35:33.447+05:30
7be33b02-26ab-4503-a1b2-d88800df4709	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:38:09.005+05:30	\N	0	2026-02-28 10:38:09.005+05:30	2026-02-28 10:38:09.005+05:30
33c10b9d-4974-4d13-b5de-e21a087b1637	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:42:13.94+05:30	\N	0	2026-02-28 10:42:13.94+05:30	2026-02-28 10:42:13.94+05:30
07ed6b89-a623-4de1-8a5b-114770324f2c	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:42:18.809+05:30	\N	0	2026-02-28 10:42:18.809+05:30	2026-02-28 10:42:18.809+05:30
525e8984-c03f-44a7-8047-71380567ffa0	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:42:33.357+05:30	\N	0	2026-02-28 10:42:33.357+05:30	2026-02-28 10:42:33.357+05:30
f6ce3087-c66b-44de-9fcf-5492f567f358	4e2088f6-c185-4d4c-a502-5c70b2ded6c2	5	2026-02-28 10:43:27.75+05:30	\N	0	2026-02-28 10:43:27.75+05:30	2026-02-28 10:43:27.75+05:30
d978abe3-8475-46de-b5f3-4d6973578b11	e1a4c85c-9d79-4ce9-8540-2808a90211cb	6	2026-02-28 10:45:25.725+05:30	\N	0	2026-02-28 10:45:25.725+05:30	2026-02-28 10:45:25.725+05:30
c6fadafc-e6ea-431c-b53f-f759bdd22d2d	e1a4c85c-9d79-4ce9-8540-2808a90211cb	6	2026-02-28 10:45:25.74+05:30	\N	0	2026-02-28 10:45:25.74+05:30	2026-02-28 10:45:25.74+05:30
23face5a-e341-4db3-a192-7ebaaad91bde	e1a4c85c-9d79-4ce9-8540-2808a90211cb	6	2026-02-28 10:45:25.779+05:30	\N	0	2026-02-28 10:45:25.779+05:30	2026-02-28 10:45:25.779+05:30
173a20ef-f4f4-46b1-9103-d616bb4623ae	e1a4c85c-9d79-4ce9-8540-2808a90211cb	6	2026-02-28 10:45:25.78+05:30	\N	0	2026-02-28 10:45:25.78+05:30	2026-02-28 10:45:25.78+05:30
3fd77b9b-84b8-47b5-b80c-412ee7b7b03e	e1a4c85c-9d79-4ce9-8540-2808a90211cb	6	2026-02-28 10:45:25.783+05:30	\N	0	2026-02-28 10:45:25.783+05:30	2026-02-28 10:45:25.783+05:30
cb40a747-43f8-41e1-9903-e93859d20c98	15d0b8fe-21aa-4b68-9bad-cd9e243ae9c5	2	2026-02-28 11:02:26.351+05:30	\N	0	2026-02-28 11:02:26.351+05:30	2026-02-28 11:02:26.351+05:30
a1d688ec-c80f-402b-b92c-cfcf20922be7	15d0b8fe-21aa-4b68-9bad-cd9e243ae9c5	2	2026-02-28 11:02:26.38+05:30	\N	0	2026-02-28 11:02:26.38+05:30	2026-02-28 11:02:26.38+05:30
c9d14a02-ef5b-4b5a-9500-327e2e60a247	15d0b8fe-21aa-4b68-9bad-cd9e243ae9c5	2	2026-02-28 11:02:26.547+05:30	\N	0	2026-02-28 11:02:26.547+05:30	2026-02-28 11:02:26.547+05:30
d1e39340-65a1-47c9-b0ce-5812ef28f78a	15d0b8fe-21aa-4b68-9bad-cd9e243ae9c5	2	2026-02-28 11:02:26.555+05:30	\N	0	2026-02-28 11:02:26.555+05:30	2026-02-28 11:02:26.555+05:30
2f6160af-86c4-43c8-bc85-63c37d7bedbf	09d43171-688b-43e5-9ad6-42d2f7af3755	5	2026-02-28 11:03:43.516+05:30	\N	0	2026-02-28 11:03:43.516+05:30	2026-02-28 11:03:43.516+05:30
ada05ff8-115b-4761-afe3-9923fb5b0eb3	09d43171-688b-43e5-9ad6-42d2f7af3755	5	2026-02-28 11:03:43.569+05:30	\N	0	2026-02-28 11:03:43.569+05:30	2026-02-28 11:03:43.569+05:30
d36addf5-9e8c-4dec-b97a-0ecbe1f05252	09d43171-688b-43e5-9ad6-42d2f7af3755	5	2026-02-28 11:03:43.583+05:30	\N	0	2026-02-28 11:03:43.583+05:30	2026-02-28 11:03:43.583+05:30
87502534-96c5-4d06-9b1e-9a8895d30652	09d43171-688b-43e5-9ad6-42d2f7af3755	5	2026-02-28 11:03:43.613+05:30	\N	0	2026-02-28 11:03:43.613+05:30	2026-02-28 11:03:43.613+05:30
d3027aa1-81b9-49cc-a860-a17c864c1ebb	09d43171-688b-43e5-9ad6-42d2f7af3755	5	2026-02-28 11:03:52.63+05:30	\N	0	2026-02-28 11:03:52.63+05:30	2026-02-28 11:03:52.63+05:30
efb70a1a-dbcf-46b3-9c37-4e046b1070b7	09d43171-688b-43e5-9ad6-42d2f7af3755	5	2026-02-28 11:04:54.291+05:30	\N	0	2026-02-28 11:04:54.292+05:30	2026-02-28 11:04:54.292+05:30
5ed8dc90-2068-418e-9ee8-004b87e0eec1	09d43171-688b-43e5-9ad6-42d2f7af3755	2	2026-02-28 11:17:44.895+05:30	\N	0	2026-02-28 11:17:44.895+05:30	2026-02-28 11:17:44.895+05:30
74554330-0803-412b-afad-6383f8609bd5	09d43171-688b-43e5-9ad6-42d2f7af3755	2	2026-02-28 11:17:44.921+05:30	\N	0	2026-02-28 11:17:44.921+05:30	2026-02-28 11:17:44.921+05:30
29428d84-5889-4e5e-8ef2-563c4e4ca529	09d43171-688b-43e5-9ad6-42d2f7af3755	2	2026-02-28 11:17:44.943+05:30	\N	0	2026-02-28 11:17:44.943+05:30	2026-02-28 11:17:44.943+05:30
c7182c16-f1e3-4f58-a691-170c468f4d03	09d43171-688b-43e5-9ad6-42d2f7af3755	2	2026-02-28 11:17:45.149+05:30	\N	0	2026-02-28 11:17:45.15+05:30	2026-02-28 11:17:45.15+05:30
2216cc7c-6daa-4533-b79f-c2520b54c38d	a5f756d4-ce57-420e-8505-24609cc60549	5	2026-02-28 11:18:29.061+05:30	\N	0	2026-02-28 11:18:29.061+05:30	2026-02-28 11:18:29.061+05:30
00b44e6a-bcf6-4826-816b-e485a068f454	a5f756d4-ce57-420e-8505-24609cc60549	5	2026-02-28 11:18:29.08+05:30	\N	0	2026-02-28 11:18:29.08+05:30	2026-02-28 11:18:29.08+05:30
c0672dfa-dabc-4c86-9e7c-80e6ac7cfd31	a5f756d4-ce57-420e-8505-24609cc60549	5	2026-02-28 11:18:29.157+05:30	\N	0	2026-02-28 11:18:29.157+05:30	2026-02-28 11:18:29.157+05:30
52a7aa80-a7f8-4f21-a890-98e81bec5ccb	a5f756d4-ce57-420e-8505-24609cc60549	5	2026-02-28 11:18:29.171+05:30	\N	0	2026-02-28 11:18:29.171+05:30	2026-02-28 11:18:29.171+05:30
c51aa0ce-6fb2-4783-84b3-1839d87a2d43	a5f756d4-ce57-420e-8505-24609cc60549	5	2026-02-28 11:18:36.279+05:30	\N	0	2026-02-28 11:18:36.279+05:30	2026-02-28 11:18:36.279+05:30
6fd0f956-b369-4f6a-8342-90c54f2fcdb7	a5f756d4-ce57-420e-8505-24609cc60549	5	2026-02-28 11:19:55.902+05:30	\N	0	2026-02-28 11:19:55.902+05:30	2026-02-28 11:19:55.902+05:30
3a017616-8d62-4a1a-a7aa-8b400d56a379	9007ba37-98d8-4f9f-8172-5d5ea740861d	5	2026-02-28 11:22:04.135+05:30	\N	0	2026-02-28 11:22:04.135+05:30	2026-02-28 11:22:04.135+05:30
55316e78-4a76-4ca3-acfb-e3e794fefd65	9007ba37-98d8-4f9f-8172-5d5ea740861d	5	2026-02-28 11:22:04.162+05:30	\N	0	2026-02-28 11:22:04.162+05:30	2026-02-28 11:22:04.162+05:30
84882d90-1bc8-4821-a32a-1d95d0cceaf0	9007ba37-98d8-4f9f-8172-5d5ea740861d	5	2026-02-28 11:22:04.22+05:30	\N	0	2026-02-28 11:22:04.22+05:30	2026-02-28 11:22:04.22+05:30
f5c8c23f-aa2f-474e-8e43-0a4abd04da09	9007ba37-98d8-4f9f-8172-5d5ea740861d	5	2026-02-28 11:22:04.231+05:30	\N	0	2026-02-28 11:22:04.231+05:30	2026-02-28 11:22:04.231+05:30
bf2db63e-0a0e-4371-be7a-6eba4a861d55	9007ba37-98d8-4f9f-8172-5d5ea740861d	5	2026-02-28 11:22:14.61+05:30	\N	0	2026-02-28 11:22:14.61+05:30	2026-02-28 11:22:14.61+05:30
ded23d24-e20c-40d5-93e2-7b32e838143d	9007ba37-98d8-4f9f-8172-5d5ea740861d	5	2026-02-28 11:22:49.574+05:30	\N	0	2026-02-28 11:22:49.574+05:30	2026-02-28 11:22:49.574+05:30
d3630849-8cf3-4ab5-92a8-2afea63d9b83	39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	3	2026-03-02 08:44:20.379+05:30	\N	0	2026-03-02 08:44:20.38+05:30	2026-03-02 08:44:20.38+05:30
ecb748f6-16a1-4b04-aef7-7a9e984c92d1	39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	3	2026-03-02 08:44:20.408+05:30	\N	0	2026-03-02 08:44:20.408+05:30	2026-03-02 08:44:20.408+05:30
629e624b-c2a8-4c7f-b0fe-61d4a7ab0a4b	39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	3	2026-03-02 08:44:20.465+05:30	\N	0	2026-03-02 08:44:20.466+05:30	2026-03-02 08:44:20.466+05:30
0e997c01-cb3a-4193-8806-a6d18d5d5a21	39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	3	2026-03-02 08:44:20.477+05:30	\N	0	2026-03-02 08:44:20.477+05:30	2026-03-02 08:44:20.477+05:30
a0d98daf-a135-49a6-b9da-b3295aaa58f6	39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	3	2026-03-02 08:44:20.48+05:30	\N	0	2026-03-02 08:44:20.48+05:30	2026-03-02 08:44:20.48+05:30
f102fd5c-9472-49f6-9b4f-930bbcaab8cd	2b84d0bc-99d8-485c-88f3-0249284c7c6c	3	2026-03-02 09:08:44.033+05:30	\N	0	2026-03-02 09:08:44.033+05:30	2026-03-02 09:08:44.033+05:30
6f96334d-def6-4b47-b477-f907c5be0386	2b84d0bc-99d8-485c-88f3-0249284c7c6c	3	2026-03-02 09:08:44.048+05:30	\N	0	2026-03-02 09:08:44.048+05:30	2026-03-02 09:08:44.048+05:30
662bd905-f725-4961-9271-5b7138fadd1d	2b84d0bc-99d8-485c-88f3-0249284c7c6c	3	2026-03-02 09:08:44.076+05:30	\N	0	2026-03-02 09:08:44.076+05:30	2026-03-02 09:08:44.076+05:30
4539fd3b-33cd-494e-a69e-481ee87f1983	2b84d0bc-99d8-485c-88f3-0249284c7c6c	3	2026-03-02 09:08:44.095+05:30	\N	0	2026-03-02 09:08:44.095+05:30	2026-03-02 09:08:44.095+05:30
eb4dd2a2-a1c2-46c3-bdee-737e31a07db0	2b84d0bc-99d8-485c-88f3-0249284c7c6c	3	2026-03-02 09:08:44.109+05:30	\N	0	2026-03-02 09:08:44.109+05:30	2026-03-02 09:08:44.109+05:30
7d87ff5f-b22a-447e-86ed-7dc5d9cddb89	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:07.17+05:30	\N	0	2026-03-02 09:41:07.171+05:30	2026-03-02 09:41:07.171+05:30
1f969de3-4997-4ce5-a797-855ca11c11c7	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:07.197+05:30	\N	0	2026-03-02 09:41:07.197+05:30	2026-03-02 09:41:07.197+05:30
b821c4a2-d4b9-44a9-b5e6-c1db4f58e078	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:07.233+05:30	\N	0	2026-03-02 09:41:07.233+05:30	2026-03-02 09:41:07.233+05:30
2bd16fcb-d5dd-4ef9-a865-9c47534b7b5a	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:07.237+05:30	\N	0	2026-03-02 09:41:07.238+05:30	2026-03-02 09:41:07.238+05:30
5bbafdb1-9c22-4377-bf80-9c9f54ac662f	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:07.247+05:30	\N	0	2026-03-02 09:41:07.247+05:30	2026-03-02 09:41:07.247+05:30
736cee5b-411a-4b7b-9ea5-170aa437614e	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:18.881+05:30	\N	0	2026-03-02 09:41:18.881+05:30	2026-03-02 09:41:18.881+05:30
ad177d3d-b47d-47ac-8557-e607ee8723c4	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:18.896+05:30	\N	0	2026-03-02 09:41:18.896+05:30	2026-03-02 09:41:18.896+05:30
7eb740bf-590e-49d7-84f4-762648864124	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:18.916+05:30	\N	0	2026-03-02 09:41:18.916+05:30	2026-03-02 09:41:18.916+05:30
eca76b52-ef4c-4b5f-870d-c2358373917c	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:18.936+05:30	\N	0	2026-03-02 09:41:18.936+05:30	2026-03-02 09:41:18.936+05:30
b5745879-b3fe-492d-9410-644a0ab1501d	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:18.942+05:30	\N	0	2026-03-02 09:41:18.942+05:30	2026-03-02 09:41:18.942+05:30
7a99968d-cc21-4a28-8e64-bdfe285c24d9	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:40.088+05:30	\N	0	2026-03-02 09:41:40.088+05:30	2026-03-02 09:41:40.088+05:30
ec78f9e6-1c64-4a62-99e7-75a6ed722140	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:40.115+05:30	\N	0	2026-03-02 09:41:40.115+05:30	2026-03-02 09:41:40.115+05:30
0190e18e-13ec-435e-b6e0-7892901ddd48	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:40.154+05:30	\N	0	2026-03-02 09:41:40.154+05:30	2026-03-02 09:41:40.154+05:30
dfc562b4-c538-4683-90ef-7636e08686c6	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:40.157+05:30	\N	0	2026-03-02 09:41:40.157+05:30	2026-03-02 09:41:40.157+05:30
baf72b0a-a0be-4b4e-b0ae-468bb32556bd	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:41:40.166+05:30	\N	0	2026-03-02 09:41:40.166+05:30	2026-03-02 09:41:40.166+05:30
1b6b3065-2a36-4899-ad87-cd5675c0f437	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:42:19.495+05:30	\N	0	2026-03-02 09:42:19.495+05:30	2026-03-02 09:42:19.495+05:30
c1f2957d-180f-44cc-9d84-c7d3e5f3c74b	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:42:19.508+05:30	\N	0	2026-03-02 09:42:19.508+05:30	2026-03-02 09:42:19.508+05:30
b5a4f6b6-6ee9-408a-b15a-c9864d278fcb	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:42:19.601+05:30	\N	0	2026-03-02 09:42:19.601+05:30	2026-03-02 09:42:19.601+05:30
d09a4d6c-c821-4cd9-9990-afd9e0029674	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:42:19.614+05:30	\N	0	2026-03-02 09:42:19.614+05:30	2026-03-02 09:42:19.614+05:30
d41ee592-3cf0-49cc-a5a0-288431399320	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:42:19.616+05:30	\N	0	2026-03-02 09:42:19.616+05:30	2026-03-02 09:42:19.616+05:30
e2dafe2d-1ce6-4ba1-a00b-b65e077d36b9	bb02d558-ff56-407f-af08-f7c3f66c6b2b	3	2026-03-02 09:42:19.616+05:30	\N	0	2026-03-02 09:42:19.616+05:30	2026-03-02 09:42:19.616+05:30
4db9e54a-214f-431e-bc4c-a4bf1fdc2afd	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:56:59.139+05:30	\N	0	2026-03-02 09:56:59.14+05:30	2026-03-02 09:56:59.14+05:30
195b2ff5-8290-49fd-96a1-e0607a8a8a33	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:56:59.155+05:30	\N	0	2026-03-02 09:56:59.155+05:30	2026-03-02 09:56:59.155+05:30
c503f199-a32b-4ce6-ba2f-590ca1c4def9	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:56:59.184+05:30	\N	0	2026-03-02 09:56:59.184+05:30	2026-03-02 09:56:59.184+05:30
c0a34f2f-c0b9-4ebd-a05d-b8fc338cf260	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:56:59.195+05:30	\N	0	2026-03-02 09:56:59.195+05:30	2026-03-02 09:56:59.195+05:30
09ab78d2-bc72-42f9-9a69-2be344b459dc	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:56:59.201+05:30	\N	0	2026-03-02 09:56:59.201+05:30	2026-03-02 09:56:59.201+05:30
a40c2393-5767-4682-ab75-d3d497bfd19c	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:57:45.101+05:30	\N	0	2026-03-02 09:57:45.101+05:30	2026-03-02 09:57:45.101+05:30
b2393be1-8ef5-446a-a763-79596c3590ba	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:57:45.118+05:30	\N	0	2026-03-02 09:57:45.118+05:30	2026-03-02 09:57:45.118+05:30
f487cbff-a45a-4fe6-93c4-b95a1199d5a4	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:57:45.131+05:30	\N	0	2026-03-02 09:57:45.131+05:30	2026-03-02 09:57:45.131+05:30
4f76cdd6-4177-471d-b1f8-c61ccdad606e	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:57:45.204+05:30	\N	0	2026-03-02 09:57:45.204+05:30	2026-03-02 09:57:45.204+05:30
8ae8eb8f-bd9a-4b58-99b9-7eef1a53019c	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:57:45.215+05:30	\N	0	2026-03-02 09:57:45.216+05:30	2026-03-02 09:57:45.216+05:30
f6af3a3b-c93b-484f-92cd-1521ef2cee27	85bf27e3-83b2-4027-8f6d-2bdb726b271f	3	2026-03-02 09:57:45.224+05:30	\N	0	2026-03-02 09:57:45.224+05:30	2026-03-02 09:57:45.224+05:30
4f708218-ec65-48a4-bb36-a1fe8aceb878	2f3e99a0-d271-4e03-9698-242c7246d16b	3	2026-03-02 10:48:08.542+05:30	\N	0	2026-03-02 10:48:08.542+05:30	2026-03-02 10:48:08.542+05:30
1f4b257c-759d-4a04-92e5-bfb88e4a1559	2f3e99a0-d271-4e03-9698-242c7246d16b	3	2026-03-02 10:48:08.545+05:30	\N	0	2026-03-02 10:48:08.545+05:30	2026-03-02 10:48:08.545+05:30
896cf50e-6efc-42e8-9f01-63150c0f4a14	2f3e99a0-d271-4e03-9698-242c7246d16b	3	2026-03-02 10:48:08.58+05:30	\N	0	2026-03-02 10:48:08.58+05:30	2026-03-02 10:48:08.58+05:30
6ded67e8-dc88-4473-ab87-23f9e6be4329	2f3e99a0-d271-4e03-9698-242c7246d16b	3	2026-03-02 10:48:08.641+05:30	\N	0	2026-03-02 10:48:08.641+05:30	2026-03-02 10:48:08.641+05:30
8cb98bdb-7be4-4e34-b7ed-9d14e0c3c5c4	2f3e99a0-d271-4e03-9698-242c7246d16b	3	2026-03-02 10:48:08.652+05:30	\N	0	2026-03-02 10:48:08.652+05:30	2026-03-02 10:48:08.652+05:30
7298fdeb-6a24-43bf-8a55-1235cf086492	d6554a01-65f9-49db-a0b7-f348c43b7f38	3	2026-03-02 11:17:18.393+05:30	\N	0	2026-03-02 11:17:18.393+05:30	2026-03-02 11:17:18.393+05:30
c356f391-e50a-432e-9606-fc0ad2e38aeb	d6554a01-65f9-49db-a0b7-f348c43b7f38	3	2026-03-02 11:17:18.395+05:30	\N	0	2026-03-02 11:17:18.395+05:30	2026-03-02 11:17:18.395+05:30
85437103-7b45-4307-9b4a-8a0a7e64ce78	d6554a01-65f9-49db-a0b7-f348c43b7f38	3	2026-03-02 11:17:18.422+05:30	\N	0	2026-03-02 11:17:18.422+05:30	2026-03-02 11:17:18.422+05:30
545be66b-4ba7-459c-bfeb-a4225e1883b9	d6554a01-65f9-49db-a0b7-f348c43b7f38	3	2026-03-02 11:17:18.46+05:30	\N	0	2026-03-02 11:17:18.46+05:30	2026-03-02 11:17:18.46+05:30
1a051cbb-5cc9-4d66-9b37-4fb7b86ff2f4	d6554a01-65f9-49db-a0b7-f348c43b7f38	3	2026-03-02 11:17:18.52+05:30	\N	0	2026-03-02 11:17:18.52+05:30	2026-03-02 11:17:18.52+05:30
fbffcbbc-2f20-4f6c-af9c-cb4a172c278d	46556f12-bc99-4fe2-b17d-3e66cc0b8969	3	2026-03-02 11:39:52.031+05:30	\N	0	2026-03-02 11:39:52.031+05:30	2026-03-02 11:39:52.031+05:30
dadb17a0-a79e-4c94-8f45-482b1266c9b0	46556f12-bc99-4fe2-b17d-3e66cc0b8969	3	2026-03-02 11:39:52.042+05:30	\N	0	2026-03-02 11:39:52.042+05:30	2026-03-02 11:39:52.042+05:30
78110242-494f-420c-a542-8b21f6abed9d	46556f12-bc99-4fe2-b17d-3e66cc0b8969	3	2026-03-02 11:39:52.074+05:30	\N	0	2026-03-02 11:39:52.074+05:30	2026-03-02 11:39:52.074+05:30
ad629658-f8ad-404d-9e6c-48fd579ba201	46556f12-bc99-4fe2-b17d-3e66cc0b8969	3	2026-03-02 11:39:52.091+05:30	\N	0	2026-03-02 11:39:52.091+05:30	2026-03-02 11:39:52.091+05:30
b9382ee3-6677-4777-a3f6-11ff5d573881	46556f12-bc99-4fe2-b17d-3e66cc0b8969	3	2026-03-02 11:39:52.16+05:30	\N	0	2026-03-02 11:39:52.161+05:30	2026-03-02 11:39:52.161+05:30
9831d6e8-f8ac-49c2-a982-6cb35d412a9b	46556f12-bc99-4fe2-b17d-3e66cc0b8969	5	2026-03-02 11:54:01.185+05:30	\N	0	2026-03-02 11:54:01.185+05:30	2026-03-02 11:54:01.185+05:30
c82c4221-85af-4778-8277-a3c11e7c6f50	46556f12-bc99-4fe2-b17d-3e66cc0b8969	5	2026-03-02 11:54:01.196+05:30	\N	0	2026-03-02 11:54:01.196+05:30	2026-03-02 11:54:01.196+05:30
34309b43-492d-4146-a586-3caab423e2d9	46556f12-bc99-4fe2-b17d-3e66cc0b8969	5	2026-03-02 11:54:01.213+05:30	\N	0	2026-03-02 11:54:01.213+05:30	2026-03-02 11:54:01.213+05:30
6aa8697c-552d-4ae7-bc0a-799367df30f9	46556f12-bc99-4fe2-b17d-3e66cc0b8969	5	2026-03-02 11:54:01.298+05:30	\N	0	2026-03-02 11:54:01.298+05:30	2026-03-02 11:54:01.298+05:30
1ed517e8-8bcf-43d7-853f-e6d980060f20	46556f12-bc99-4fe2-b17d-3e66cc0b8969	5	2026-03-02 11:54:13.118+05:30	\N	0	2026-03-02 11:54:13.118+05:30	2026-03-02 11:54:13.118+05:30
ae49bb47-02e7-4030-bbcd-01feba0ab49c	8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	5	2026-03-02 12:04:01.784+05:30	\N	0	2026-03-02 12:04:01.784+05:30	2026-03-02 12:04:01.784+05:30
35a7155f-4ebf-45f0-9731-f48ad26d1532	8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	5	2026-03-02 12:04:01.795+05:30	\N	0	2026-03-02 12:04:01.795+05:30	2026-03-02 12:04:01.795+05:30
19105c8f-712a-4f64-b571-140bd324c2c1	8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	5	2026-03-02 12:04:01.832+05:30	\N	0	2026-03-02 12:04:01.832+05:30	2026-03-02 12:04:01.832+05:30
39224caf-eae7-49eb-b573-93f0e028ea47	8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	5	2026-03-02 12:04:01.886+05:30	\N	0	2026-03-02 12:04:01.886+05:30	2026-03-02 12:04:01.886+05:30
b25d95d5-6c47-45a9-a461-b00a345866e4	8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	5	2026-03-02 12:04:47.72+05:30	\N	0	2026-03-02 12:04:47.72+05:30	2026-03-02 12:04:47.72+05:30
4bc3ea6c-c5be-487c-8321-2520dc4a9909	8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	5	2026-03-02 12:04:56.278+05:30	\N	0	2026-03-02 12:04:56.278+05:30	2026-03-02 12:04:56.278+05:30
fc28ae9e-4556-4e06-acee-f0ea4b141de2	ad1b781c-76e0-4f95-a2cf-f17f35874781	9	2026-03-02 12:11:36.848+05:30	\N	0	2026-03-02 12:11:36.848+05:30	2026-03-02 12:11:36.848+05:30
385b35e3-609c-4ea8-94ed-1f3f0934feac	ad1b781c-76e0-4f95-a2cf-f17f35874781	9	2026-03-02 12:11:36.88+05:30	\N	0	2026-03-02 12:11:36.88+05:30	2026-03-02 12:11:36.88+05:30
5e05e69c-aed1-4676-9f31-585d63a98eb4	ad1b781c-76e0-4f95-a2cf-f17f35874781	9	2026-03-02 12:11:36.934+05:30	\N	0	2026-03-02 12:11:36.934+05:30	2026-03-02 12:11:36.934+05:30
b0438cd2-b3ad-4c0c-9d2e-2be3a739b821	ad1b781c-76e0-4f95-a2cf-f17f35874781	9	2026-03-02 12:11:50.5+05:30	\N	0	2026-03-02 12:11:50.5+05:30	2026-03-02 12:11:50.5+05:30
6e81a248-7c22-4fb6-9989-d3770a9cc67e	ad1b781c-76e0-4f95-a2cf-f17f35874781	9	2026-03-02 12:12:49.661+05:30	\N	0	2026-03-02 12:12:49.661+05:30	2026-03-02 12:12:49.661+05:30
4480ed7b-82d5-4dde-aedd-88d6d7555134	ec9b82a6-87c9-454c-8206-0a50a547c06c	9	2026-03-02 12:20:13.036+05:30	\N	0	2026-03-02 12:20:13.036+05:30	2026-03-02 12:20:13.036+05:30
959bd3d5-eba6-4c83-b08a-37c3c234bb6b	ec9b82a6-87c9-454c-8206-0a50a547c06c	9	2026-03-02 12:20:13.139+05:30	\N	0	2026-03-02 12:20:13.139+05:30	2026-03-02 12:20:13.139+05:30
66bbfaa3-ad82-4e10-91e8-1550d0e71bc4	ec9b82a6-87c9-454c-8206-0a50a547c06c	9	2026-03-02 12:20:13.221+05:30	\N	0	2026-03-02 12:20:13.221+05:30	2026-03-02 12:20:13.221+05:30
646a9c92-122b-4305-a34e-ffe9a083ffb0	ec9b82a6-87c9-454c-8206-0a50a547c06c	9	2026-03-02 12:20:38.363+05:30	\N	0	2026-03-02 12:20:38.363+05:30	2026-03-02 12:20:38.363+05:30
ae0ceff1-7a3b-4039-8a35-84894db25b48	ec9b82a6-87c9-454c-8206-0a50a547c06c	9	2026-03-02 12:21:45.229+05:30	\N	0	2026-03-02 12:21:45.229+05:30	2026-03-02 12:21:45.229+05:30
092f2de9-8013-4848-a7d8-935ff8725b7f	fd34f243-9d48-404c-a282-c961be3e55f5	9	2026-03-02 12:25:41.783+05:30	\N	0	2026-03-02 12:25:41.783+05:30	2026-03-02 12:25:41.783+05:30
ede7de6a-728f-4189-84cd-852ed6ff935f	fd34f243-9d48-404c-a282-c961be3e55f5	9	2026-03-02 12:25:41.815+05:30	\N	0	2026-03-02 12:25:41.815+05:30	2026-03-02 12:25:41.815+05:30
a2d9e3d8-48f5-4634-bc8b-4d7fa3e45f43	fd34f243-9d48-404c-a282-c961be3e55f5	9	2026-03-02 12:25:41.855+05:30	\N	0	2026-03-02 12:25:41.855+05:30	2026-03-02 12:25:41.855+05:30
523e3dbf-4077-452d-aca7-db8c767cb4c0	fd34f243-9d48-404c-a282-c961be3e55f5	9	2026-03-02 12:25:55.052+05:30	\N	0	2026-03-02 12:25:55.052+05:30	2026-03-02 12:25:55.052+05:30
c80651ea-66e2-4427-8611-fe58bdd1040e	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:27:57.041+05:30	\N	0	2026-03-02 12:27:57.041+05:30	2026-03-02 12:27:57.041+05:30
eb910229-8ebc-4c5f-9c7e-10f2164c5475	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:27:57.059+05:30	\N	0	2026-03-02 12:27:57.059+05:30	2026-03-02 12:27:57.059+05:30
1650ec4b-0be0-4738-8030-1704e873294b	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:27:57.129+05:30	\N	0	2026-03-02 12:27:57.129+05:30	2026-03-02 12:27:57.129+05:30
b1e47824-2b15-4e40-b465-5ff7885d3930	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:27:57.137+05:30	\N	0	2026-03-02 12:27:57.137+05:30	2026-03-02 12:27:57.137+05:30
f7084560-2fb7-4441-8ba9-23771b1a425a	fd34f243-9d48-404c-a282-c961be3e55f5	3	2026-03-02 12:28:46.013+05:30	\N	0	2026-03-02 12:28:46.013+05:30	2026-03-02 12:28:46.013+05:30
55598e73-f344-4502-bd15-535eebfd7ad1	fd34f243-9d48-404c-a282-c961be3e55f5	3	2026-03-02 12:28:46.014+05:30	\N	0	2026-03-02 12:28:46.015+05:30	2026-03-02 12:28:46.015+05:30
183070a4-34cd-45df-a358-36b5a686231e	fd34f243-9d48-404c-a282-c961be3e55f5	3	2026-03-02 12:28:46.039+05:30	\N	0	2026-03-02 12:28:46.039+05:30	2026-03-02 12:28:46.039+05:30
dc01e5e9-c4b1-4feb-917c-651b5adbd84d	fd34f243-9d48-404c-a282-c961be3e55f5	3	2026-03-02 12:28:46.123+05:30	\N	0	2026-03-02 12:28:46.123+05:30	2026-03-02 12:28:46.123+05:30
bd943bb9-bf9d-4d0c-ab37-935ff043e2ea	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:30:14.444+05:30	\N	0	2026-03-02 12:30:14.444+05:30	2026-03-02 12:30:14.444+05:30
78ad5430-76f1-457b-a5f6-623cc233e3b9	fd34f243-9d48-404c-a282-c961be3e55f5	3	2026-03-02 12:30:16.015+05:30	\N	0	2026-03-02 12:30:16.015+05:30	2026-03-02 12:30:16.015+05:30
ea1ee289-b002-47eb-8131-c0d61e6f6447	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:37:37.575+05:30	\N	0	2026-03-02 12:37:37.575+05:30	2026-03-02 12:37:37.575+05:30
3e32b14a-1d11-4977-b875-94f4c82d1b1a	fd34f243-9d48-404c-a282-c961be3e55f5	5	2026-03-02 12:42:22.49+05:30	\N	0	2026-03-02 12:42:22.49+05:30	2026-03-02 12:42:22.49+05:30
a2c33520-2c30-48ae-a4f9-b314a631a0db	fd34f243-9d48-404c-a282-c961be3e55f5	5	2026-03-02 12:42:22.603+05:30	\N	0	2026-03-02 12:42:22.603+05:30	2026-03-02 12:42:22.603+05:30
7f72e32d-e820-4c2e-8b32-e5e67e54e3e8	fd34f243-9d48-404c-a282-c961be3e55f5	5	2026-03-02 12:42:22.608+05:30	\N	0	2026-03-02 12:42:22.608+05:30	2026-03-02 12:42:22.608+05:30
77422ea1-9bb7-416f-89d6-c73a27b2cc30	fd34f243-9d48-404c-a282-c961be3e55f5	5	2026-03-02 12:42:22.687+05:30	\N	0	2026-03-02 12:42:22.687+05:30	2026-03-02 12:42:22.687+05:30
3bee5d03-68dc-4a41-aa4a-6ca15f1e44c6	fd34f243-9d48-404c-a282-c961be3e55f5	5	2026-03-02 12:43:14.631+05:30	\N	0	2026-03-02 12:43:14.631+05:30	2026-03-02 12:43:14.631+05:30
0117106d-fbff-441f-8fc8-f7cc151f00ed	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:43:49.813+05:30	\N	0	2026-03-02 12:43:49.813+05:30	2026-03-02 12:43:49.813+05:30
418b55f0-d22a-457b-8ffa-6a21331d7f31	fd34f243-9d48-404c-a282-c961be3e55f5	3	2026-03-02 12:45:37.308+05:30	\N	0	2026-03-02 12:45:37.308+05:30	2026-03-02 12:45:37.308+05:30
ca0553c1-67f2-47fd-9eb1-573212343ddd	fd34f243-9d48-404c-a282-c961be3e55f5	8	2026-03-02 12:47:10.523+05:30	\N	0	2026-03-02 12:47:10.523+05:30	2026-03-02 12:47:10.523+05:30
cff68d3d-d1de-46e9-93a8-07c4f4aac86d	fd34f243-9d48-404c-a282-c961be3e55f5	9	2026-03-02 12:49:44.473+05:30	\N	0	2026-03-02 12:49:44.473+05:30	2026-03-02 12:49:44.473+05:30
e02c31c0-1c92-49d6-994a-df7446ac90ed	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	3	2026-03-02 12:50:39.194+05:30	\N	0	2026-03-02 12:50:39.194+05:30	2026-03-02 12:50:39.194+05:30
cbcb2293-1d7b-43d1-934f-94d971440492	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	3	2026-03-02 12:50:39.195+05:30	\N	0	2026-03-02 12:50:39.195+05:30	2026-03-02 12:50:39.195+05:30
725e237b-be7d-4c8d-89b3-f357b71c55f5	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	3	2026-03-02 12:50:39.228+05:30	\N	0	2026-03-02 12:50:39.228+05:30	2026-03-02 12:50:39.228+05:30
7b690daf-196c-4b12-a8dc-a8a2a8717536	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	3	2026-03-02 12:50:39.284+05:30	\N	0	2026-03-02 12:50:39.284+05:30	2026-03-02 12:50:39.284+05:30
a3a923e9-a719-4623-bc67-7b432d49ab6c	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	6	2026-03-02 13:27:07.007+05:30	\N	0	2026-03-02 13:27:07.007+05:30	2026-03-02 13:27:07.007+05:30
89afb31c-a081-4928-b490-912e054e26a0	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	6	2026-03-02 13:27:07.017+05:30	\N	0	2026-03-02 13:27:07.017+05:30	2026-03-02 13:27:07.017+05:30
5f5a018f-2a8f-4d03-b6e0-e3e5130513f3	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	6	2026-03-02 13:27:07.036+05:30	\N	0	2026-03-02 13:27:07.036+05:30	2026-03-02 13:27:07.036+05:30
46e5aec6-21c7-42ce-8d33-0299be014daf	c8c377ec-871e-4d3f-b01a-ab6fb54c452c	6	2026-03-02 13:27:07.078+05:30	\N	0	2026-03-02 13:27:07.078+05:30	2026-03-02 13:27:07.078+05:30
1b719618-c615-4366-b567-4c2ca0b0b07c	757a4b7c-81b6-4613-9dfb-de900dae6823	9	2026-03-02 13:52:18.504+05:30	\N	0	2026-03-02 13:52:18.504+05:30	2026-03-02 13:52:18.504+05:30
7e16212c-8708-442f-8e81-1c594af46139	757a4b7c-81b6-4613-9dfb-de900dae6823	9	2026-03-02 13:52:18.67+05:30	\N	0	2026-03-02 13:52:18.67+05:30	2026-03-02 13:52:18.67+05:30
6335d03d-6d51-4e15-a9ce-1816712ca748	757a4b7c-81b6-4613-9dfb-de900dae6823	9	2026-03-02 13:52:18.84+05:30	\N	0	2026-03-02 13:52:18.84+05:30	2026-03-02 13:52:18.84+05:30
87008a0f-b467-4424-9346-f18f00b8f7e6	757a4b7c-81b6-4613-9dfb-de900dae6823	9	2026-03-02 13:53:43.506+05:30	\N	0	2026-03-02 13:53:43.506+05:30	2026-03-02 13:53:43.506+05:30
31819cc1-598c-4027-a013-7426bf45be5f	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:26:13.207+05:30	\N	0	2026-03-02 14:26:13.207+05:30	2026-03-02 14:26:13.207+05:30
93cec9cf-7d99-4823-94b6-236bc11310d5	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:26:13.228+05:30	\N	0	2026-03-02 14:26:13.228+05:30	2026-03-02 14:26:13.228+05:30
a1290f16-78d9-4d95-a0b8-c4d07749d87e	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:26:13.297+05:30	\N	0	2026-03-02 14:26:13.297+05:30	2026-03-02 14:26:13.297+05:30
044fe4d9-e6a4-47e0-b743-9fd8496a8c95	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:26:13.991+05:30	\N	0	2026-03-02 14:26:13.991+05:30	2026-03-02 14:26:13.991+05:30
bbbc0964-dd9a-42cf-bc4f-84c07811520e	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:26:16.845+05:30	\N	0	2026-03-02 14:26:16.845+05:30	2026-03-02 14:26:16.845+05:30
e7ebbe7b-e316-40d0-a382-852171ba3ce4	fd34f243-9d48-404c-a282-c961be3e55f5	10	2026-03-02 14:26:23.982+05:30	\N	0	2026-03-02 14:26:23.982+05:30	2026-03-02 14:26:23.982+05:30
f969f86e-d10e-43b1-9429-8c985551aacd	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:30:50.069+05:30	\N	0	2026-03-02 14:30:50.069+05:30	2026-03-02 14:30:50.069+05:30
3bd3c008-94fa-4446-994c-01ef77ae43f8	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:30:50.086+05:30	\N	0	2026-03-02 14:30:50.086+05:30	2026-03-02 14:30:50.086+05:30
46710bc4-716c-44f7-9f5a-15db1bb882fe	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:30:50.172+05:30	\N	0	2026-03-02 14:30:50.172+05:30	2026-03-02 14:30:50.172+05:30
bd87480a-4e46-4073-92e4-dfa2f9ee6ce8	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:30:50.174+05:30	\N	0	2026-03-02 14:30:50.174+05:30	2026-03-02 14:30:50.174+05:30
93e21399-dad7-4986-a4ec-1e65e91fdc01	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:31:04.324+05:30	\N	0	2026-03-02 14:31:04.324+05:30	2026-03-02 14:31:04.324+05:30
89deab15-9a80-4706-bdcc-ed67eab9e348	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:31:26.112+05:30	\N	0	2026-03-02 14:31:26.112+05:30	2026-03-02 14:31:26.112+05:30
2aea43b2-66f3-4de0-9857-d59a8813bb86	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:31:51.23+05:30	\N	0	2026-03-02 14:31:51.23+05:30	2026-03-02 14:31:51.23+05:30
6a78bf93-1bb8-413c-af68-be2f70757255	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:31:55.848+05:30	\N	0	2026-03-02 14:31:55.848+05:30	2026-03-02 14:31:55.848+05:30
d52f1b94-1105-4c4e-a268-9c966e6cf125	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:32:06.109+05:30	\N	0	2026-03-02 14:32:06.109+05:30	2026-03-02 14:32:06.109+05:30
c9ce749e-7851-4dc4-b905-15105a1bbfdd	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:33:30.373+05:30	\N	0	2026-03-02 14:33:30.373+05:30	2026-03-02 14:33:30.373+05:30
0ac26f61-8c08-40ca-a54e-b6bbfad40193	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:44:15.959+05:30	\N	0	2026-03-02 14:44:15.96+05:30	2026-03-02 14:44:15.96+05:30
a150a22d-af29-4714-bfbb-96b281efe047	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:44:21.658+05:30	\N	0	2026-03-02 14:44:21.659+05:30	2026-03-02 14:44:21.659+05:30
e2aa5925-01f3-4ad9-afd9-233e68dac627	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:44:25.883+05:30	\N	0	2026-03-02 14:44:25.883+05:30	2026-03-02 14:44:25.883+05:30
aa42f604-45db-453c-9c5b-2317e09b2577	1f265282-3cf6-4e10-a004-bc8080e227d3	10	2026-03-02 14:44:35.154+05:30	\N	0	2026-03-02 14:44:35.154+05:30	2026-03-02 14:44:35.154+05:30
e7abd70e-1030-45f6-b5e9-9c9512503691	e3ddf773-9ac6-4a3d-92b9-b0beef4de80d	5	2026-03-02 15:35:22.584+05:30	\N	0	2026-03-02 15:35:22.584+05:30	2026-03-02 15:35:22.584+05:30
1c62ccdc-cb80-4c55-a359-d9852a9f562b	e3ddf773-9ac6-4a3d-92b9-b0beef4de80d	5	2026-03-02 15:35:22.599+05:30	\N	0	2026-03-02 15:35:22.599+05:30	2026-03-02 15:35:22.599+05:30
c58af887-99b9-4d12-8cac-d51b89a04e46	e3ddf773-9ac6-4a3d-92b9-b0beef4de80d	5	2026-03-02 15:35:22.653+05:30	\N	0	2026-03-02 15:35:22.653+05:30	2026-03-02 15:35:22.653+05:30
ce8e2e80-a7aa-4108-ab65-35e39f3af7c9	e3ddf773-9ac6-4a3d-92b9-b0beef4de80d	5	2026-03-02 15:35:22.653+05:30	\N	0	2026-03-02 15:35:22.653+05:30	2026-03-02 15:35:22.653+05:30
71088d0a-a4e0-4efb-bed5-4a09ac35a55e	e3ddf773-9ac6-4a3d-92b9-b0beef4de80d	5	2026-03-02 15:35:42.318+05:30	\N	0	2026-03-02 15:35:42.318+05:30	2026-03-02 15:35:42.318+05:30
b14aeeaf-12c9-459a-91d1-a0d799ff98d5	782bb235-3076-401f-89c6-b4aa53769777	5	2026-03-04 09:03:17.161+05:30	\N	0	2026-03-04 09:03:17.161+05:30	2026-03-04 09:03:17.161+05:30
671a0a84-0983-4a05-8bb1-73a875bd2b3a	782bb235-3076-401f-89c6-b4aa53769777	5	2026-03-04 09:03:17.175+05:30	\N	0	2026-03-04 09:03:17.175+05:30	2026-03-04 09:03:17.175+05:30
98dae1f5-6892-4928-bdb1-4cb65e3b54b4	782bb235-3076-401f-89c6-b4aa53769777	5	2026-03-04 09:03:17.224+05:30	\N	0	2026-03-04 09:03:17.224+05:30	2026-03-04 09:03:17.224+05:30
dcfefd16-d1b0-45bc-937b-43a6d6c7888f	782bb235-3076-401f-89c6-b4aa53769777	5	2026-03-04 09:03:17.225+05:30	\N	0	2026-03-04 09:03:17.226+05:30	2026-03-04 09:03:17.226+05:30
b63566f9-360b-4784-a9ea-07d0f51fb9e1	782bb235-3076-401f-89c6-b4aa53769777	3	2026-03-04 09:03:40.964+05:30	\N	0	2026-03-04 09:03:40.964+05:30	2026-03-04 09:03:40.964+05:30
666e9069-c1d7-4e2c-aeaf-567bbebb18e3	782bb235-3076-401f-89c6-b4aa53769777	3	2026-03-04 09:03:40.976+05:30	\N	0	2026-03-04 09:03:40.976+05:30	2026-03-04 09:03:40.976+05:30
23062395-1f76-4a8d-b12e-df2addc8cb81	782bb235-3076-401f-89c6-b4aa53769777	3	2026-03-04 09:03:40.992+05:30	\N	0	2026-03-04 09:03:40.992+05:30	2026-03-04 09:03:40.992+05:30
2597d99e-ee94-429f-9bf6-e004953512ee	782bb235-3076-401f-89c6-b4aa53769777	3	2026-03-04 09:03:41.006+05:30	\N	0	2026-03-04 09:03:41.006+05:30	2026-03-04 09:03:41.006+05:30
a1b4e97e-9db2-4bed-abc7-005895d0361d	782bb235-3076-401f-89c6-b4aa53769777	3	2026-03-04 09:03:41.018+05:30	\N	0	2026-03-04 09:03:41.018+05:30	2026-03-04 09:03:41.018+05:30
08815a55-4aa6-4b73-8878-5a44af4070e5	782bb235-3076-401f-89c6-b4aa53769777	5	2026-03-04 09:05:28.869+05:30	\N	0	2026-03-04 09:05:28.869+05:30	2026-03-04 09:05:28.869+05:30
641d4921-822c-4e25-84c4-75f1434953a4	782bb235-3076-401f-89c6-b4aa53769777	5	2026-03-04 09:05:36.321+05:30	\N	0	2026-03-04 09:05:36.321+05:30	2026-03-04 09:05:36.321+05:30
7e3ab996-d66a-4759-9f7f-778bd3ccf409	782bb235-3076-401f-89c6-b4aa53769777	5	2026-03-04 09:05:40.292+05:30	\N	0	2026-03-04 09:05:40.292+05:30	2026-03-04 09:05:40.292+05:30
b61c440f-7f17-4823-93e9-76cdd09c6d3e	1d3aa0bb-0c23-4521-ab6b-355f87b57f93	2	2026-03-07 10:35:55.233+05:30	\N	0	2026-03-07 10:35:55.233+05:30	2026-03-07 10:35:55.233+05:30
ca3e7059-fc44-41bb-80d7-9e48b2e2d25d	1d3aa0bb-0c23-4521-ab6b-355f87b57f93	2	2026-03-07 10:35:55.262+05:30	\N	0	2026-03-07 10:35:55.262+05:30	2026-03-07 10:35:55.262+05:30
e7fb8833-d47d-42ab-8540-317f928a1d60	1d3aa0bb-0c23-4521-ab6b-355f87b57f93	2	2026-03-07 10:35:55.33+05:30	\N	0	2026-03-07 10:35:55.33+05:30	2026-03-07 10:35:55.33+05:30
2619f399-6999-49d7-abf1-b801b780c720	1d3aa0bb-0c23-4521-ab6b-355f87b57f93	2	2026-03-07 10:36:03.675+05:30	\N	0	2026-03-07 10:36:03.675+05:30	2026-03-07 10:36:03.675+05:30
5fee1a05-34ca-4a2f-8702-57619a54b1f4	1d3aa0bb-0c23-4521-ab6b-355f87b57f93	2	2026-03-07 10:36:20.424+05:30	\N	0	2026-03-07 10:36:20.424+05:30	2026-03-07 10:36:20.424+05:30
3a143a18-9c6c-4489-806c-e52205c80f56	5c6e28e0-4a2f-484f-98d5-48af755098b6	3	2026-03-07 12:34:25.56+05:30	\N	0	2026-03-07 12:34:25.56+05:30	2026-03-07 12:34:25.56+05:30
3cdfa9ad-73bc-483e-8d58-3f39c76c5cb8	5c6e28e0-4a2f-484f-98d5-48af755098b6	3	2026-03-07 12:34:25.582+05:30	\N	0	2026-03-07 12:34:25.582+05:30	2026-03-07 12:34:25.582+05:30
11111f11-b8b9-4aef-9c18-40ceee8c8575	5c6e28e0-4a2f-484f-98d5-48af755098b6	3	2026-03-07 12:34:25.607+05:30	\N	0	2026-03-07 12:34:25.607+05:30	2026-03-07 12:34:25.607+05:30
21a74665-ca58-45c4-91bb-617d2ae50dfc	5c6e28e0-4a2f-484f-98d5-48af755098b6	3	2026-03-07 12:34:25.703+05:30	\N	0	2026-03-07 12:34:25.703+05:30	2026-03-07 12:34:25.703+05:30
a0080391-6dd3-4438-86ee-6573978e741d	5c6e28e0-4a2f-484f-98d5-48af755098b6	3	2026-03-07 12:34:51.565+05:30	\N	0	2026-03-07 12:34:51.565+05:30	2026-03-07 12:34:51.565+05:30
19c39435-5916-486b-a62e-59687fec5355	5c6e28e0-4a2f-484f-98d5-48af755098b6	3	2026-03-07 12:35:28.679+05:30	\N	0	2026-03-07 12:35:28.679+05:30	2026-03-07 12:35:28.679+05:30
2b8975ff-b023-4950-86fd-7c9d4c44e03d	5c6e28e0-4a2f-484f-98d5-48af755098b6	5	2026-03-07 12:56:35.654+05:30	\N	0	2026-03-07 12:56:35.654+05:30	2026-03-07 12:56:35.654+05:30
876c5f6b-6cba-4554-ba60-ff5354d22514	5c6e28e0-4a2f-484f-98d5-48af755098b6	5	2026-03-07 12:56:35.667+05:30	\N	0	2026-03-07 12:56:35.667+05:30	2026-03-07 12:56:35.667+05:30
8ce8d425-674f-4c1a-8e02-8c2ba4ce0b8b	5c6e28e0-4a2f-484f-98d5-48af755098b6	5	2026-03-07 12:56:35.686+05:30	\N	0	2026-03-07 12:56:35.686+05:30	2026-03-07 12:56:35.686+05:30
5a8387c2-deb2-4965-94d3-ccbf8f09d5ce	5c6e28e0-4a2f-484f-98d5-48af755098b6	5	2026-03-07 12:56:35.732+05:30	\N	0	2026-03-07 12:56:35.732+05:30	2026-03-07 12:56:35.732+05:30
d3aaca01-b9e4-4f60-9050-f3eeaf4a7de4	5c6e28e0-4a2f-484f-98d5-48af755098b6	5	2026-03-07 12:56:45.824+05:30	\N	0	2026-03-07 12:56:45.824+05:30	2026-03-07 12:56:45.824+05:30
\.


--
-- Data for Name: live_streams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_streams (id, room_name, title, category, visibility, thumbnail_url, status, scheduled_at, started_at, ended_at, peak_viewers, total_viewers, created_at, updated_at, host_id, hashtags) FROM stdin;
403c5ee8-01b9-477a-bf93-951602f5f6a7	room_361c3a320a2c4bd98a61afa6299b071dmm4e9ffh	practice	Social	public	\N	ended	\N	2026-02-27 10:00:40.733+05:30	2026-02-27 10:03:00.509+05:30	0	0	2026-02-27 10:00:40.734+05:30	2026-02-27 10:03:00.509+05:30	\N	\N
70ca5ce1-0098-4147-bc50-faa7964109b2	room_bdb792e44f3d47bfaf6b1ffe6b0cc32dmm4f85a4	testing	Social	public	\N	ended	\N	2026-02-27 10:27:40.54+05:30	2026-02-27 10:31:54.536+05:30	0	0	2026-02-27 10:27:40.54+05:30	2026-02-27 10:31:54.536+05:30	\N	\N
3c70b32b-030a-4d77-a9b3-8f1999a06cf2	room_7e41496e7dfb4f13824dd6434e5e1eefmm4fpfvs	practice	Social	public	\N	ended	\N	2026-02-27 10:41:07.432+05:30	2026-02-27 10:48:17.132+05:30	0	0	2026-02-27 10:41:07.432+05:30	2026-02-27 10:48:17.132+05:30	\N	\N
fdd06085-c778-4da4-ad76-a34f683932bc	room_0798ed524ad34a639c3666732a57686fmm4guyjw	f	Social	public	\N	ended	\N	2026-02-27 11:13:24.524+05:30	2026-02-27 11:13:34.181+05:30	0	0	2026-02-27 11:13:24.524+05:30	2026-02-27 11:13:34.181+05:30	\N	\N
6616e80a-16c6-480d-97c9-ac0b0cb57a75	room_ef716f77a8d34ff3a8205d4691bb057cmm4hfiaw	srtnjsrtn	Social	public	\N	ended	\N	2026-02-27 11:29:23.24+05:30	2026-02-27 11:30:04.146+05:30	0	0	2026-02-27 11:29:23.241+05:30	2026-02-27 11:30:04.146+05:30	\N	\N
a318736a-dcf4-4494-8d31-2d7ceeec420d	room_400893c226db4fc8b6cb790eac762c53mm4hl047	m,gtdm	Social	public	\N	ended	\N	2026-02-27 11:33:39.607+05:30	2026-02-27 11:34:52.296+05:30	0	0	2026-02-27 11:33:39.607+05:30	2026-02-27 11:34:52.296+05:30	\N	\N
dd1df18a-2012-47b8-9063-d19ca0b6c1b5	room_4cbcfc850b9c4695a40e9290fb2c35d8mm4icv5j	ezsdg n	Social	public	\N	ended	\N	2026-02-27 11:55:19.543+05:30	2026-02-27 11:56:30.896+05:30	0	0	2026-02-27 11:55:19.543+05:30	2026-02-27 11:56:30.896+05:30	\N	\N
6ee98bad-1118-42e8-8112-0514b22f5da3	room_83f21fa8d7c94830a42c81872e5d6559mm4k6d4g	akbar rathor	Social	public	\N	ended	\N	2026-02-27 12:46:15.472+05:30	2026-02-27 12:49:28.147+05:30	0	0	2026-02-27 12:46:15.472+05:30	2026-02-27 12:49:28.148+05:30	\N	\N
742e8759-fa0d-4392-a2cf-e69c61eb5f5e	room_ebbed4b8359f41e19149392f2e67b9b0mm4khsuh	jgf	Social	public	\N	ended	\N	2026-02-27 12:55:09.065+05:30	2026-02-27 12:58:48.278+05:30	0	0	2026-02-27 12:55:09.065+05:30	2026-02-27 12:58:48.278+05:30	\N	\N
09d43171-688b-43e5-9ad6-42d2f7af3755	room_0019e86563d7464b895aaddaa8cfb398mm5vxwhd	tf	Social	public	\N	ended	\N	2026-02-28 11:03:22.249+05:30	2026-02-28 11:17:49.335+05:30	10	10	2026-02-28 11:03:22.249+05:30	2026-02-28 11:17:49.335+05:30	\N	\N
e1a4c85c-9d79-4ce9-8540-2808a90211cb	room_037b56fde8184699a7eb280df931decdmm5usty2	k	Social	public	\N	ended	\N	2026-02-28 10:31:26.046+05:30	2026-02-28 10:45:28.027+05:30	3	3	2026-02-28 10:31:26.046+05:30	2026-02-28 10:45:28.027+05:30	\N	\N
4e2088f6-c185-4d4c-a502-5c70b2ded6c2	room_7b890149b6ea4c5996ecdad1073ad4c2mm5uuyv3	awtg4	Social	public	\N	ended	\N	2026-02-28 10:33:05.749+05:30	2026-02-28 10:46:25.587+05:30	12	12	2026-02-28 10:33:05.749+05:30	2026-02-28 10:46:25.587+05:30	\N	\N
ea0ac943-45f1-49a1-90a8-c9e82ae63126	room_a2b55136a17647ebac209c4f4a08fb98mm5uqqo7	kjui	Social	public	\N	ended	\N	2026-02-28 10:29:48.512+05:30	2026-02-28 10:30:51.597+05:30	5	5	2026-02-28 10:29:48.512+05:30	2026-02-28 10:30:51.597+05:30	\N	\N
ef845ba0-62c7-4270-be15-cdac934674a1	room_a7b4331c57144f95b7a194c5d627f64cmm5tpejt	a	Social	public	\N	ended	\N	2026-02-28 10:00:46.534+05:30	2026-02-28 10:02:38.622+05:30	4	4	2026-02-28 10:00:46.534+05:30	2026-02-28 10:02:38.622+05:30	\N	\N
d0804e13-6338-4b94-9ce4-ab086796b94b	room_3a2fdbde628f47bbbadfbac50552d7famm5usavn	kj	Social	public	\N	ended	\N	2026-02-28 10:31:01.333+05:30	2026-02-28 10:31:26.042+05:30	0	0	2026-02-28 10:31:01.333+05:30	2026-02-28 10:31:26.042+05:30	\N	\N
083ff537-04e8-4bad-96df-d91c0883f1b5	room_6b5570681e784d5c99ac8fd48a856e86mm5uuc4o	rtsdhj	Social	public	\N	ended	\N	2026-02-28 10:32:36.265+05:30	2026-02-28 10:32:54.001+05:30	0	0	2026-02-28 10:32:36.265+05:30	2026-02-28 10:32:54.001+05:30	\N	\N
1948d3f8-ba0a-4ed4-9766-cbcf5f560f04	room_2b79d56060dc40f58569185ca797756dmm5vc41e	drgb	Social	public	\N	ended	\N	2026-02-28 10:46:25.614+05:30	2026-02-28 10:55:56.314+05:30	0	0	2026-02-28 10:46:25.614+05:30	2026-02-28 10:55:56.314+05:30	\N	\N
6743adab-fef4-4420-928d-6f996afb3cf2	room_e5aa6ba7cf1c41cd9a4901fd5ac99f5emm5ys8ck	junaid 	Social	public	\N	ended	\N	2026-02-28 12:22:56.546+05:30	2026-02-28 12:23:56.494+05:30	0	0	2026-02-28 12:22:56.546+05:30	2026-02-28 12:23:56.494+05:30	\N	\N
9e205020-22a6-4c2d-8480-c06d886d8994	room_9a2f44d7a49d426b9903454fa322bc8fmm5ttb21	ab	Social	public	\N	ended	\N	2026-02-28 10:03:48.625+05:30	2026-02-28 10:13:53.038+05:30	9	9	2026-02-28 10:03:48.625+05:30	2026-02-28 10:13:53.038+05:30	\N	\N
bce33b1b-8630-41be-8e91-ca623f09cc86	room_99884bf0112d4fe7946422d41c03a93bmm4f3p6b	practice	Social	public	\N	ended	\N	2026-02-27 10:24:13.043+05:30	\N	0	0	2026-02-27 10:24:13.044+05:30	2026-02-27 10:24:13.044+05:30	\N	\N
6aa224d3-0d98-40da-b28e-294aaecb6155	room_e1b9b4e48a1c44f9ae88461f61d555d5mm4g0hu9	p	Social	public	\N	ended	\N	2026-02-27 10:49:43.185+05:30	\N	0	0	2026-02-27 10:49:43.185+05:30	2026-02-27 10:49:43.185+05:30	\N	\N
da027ee4-730b-4e10-b726-d740bb55b6a8	room_eb8667a57d874561af926bfe25b394ddmm4gi90c	a	Social	public	\N	ended	\N	2026-02-27 11:03:31.548+05:30	\N	1	1	2026-02-27 11:03:31.548+05:30	2026-02-27 13:21:02.879+05:30	\N	\N
437b03b0-9855-471d-8dd2-356a4b100d86	room_62a1b2a8ae8d4a108ff01e4c387490bamm4iadbg	dnedzb	Social	public	\N	ended	\N	2026-02-27 11:53:23.116+05:30	\N	15	15	2026-02-27 11:53:23.116+05:30	2026-02-27 15:05:25.713+05:30	\N	\N
0241076b-c6c1-43ee-a79d-28f42e14d797	room_8603cce197794bef83ecf5072e638fa7mm5ztipf	n 	Social	public	\N	ended	\N	2026-02-28 12:51:56.241+05:30	2026-02-28 12:52:13.799+05:30	0	0	2026-02-28 12:51:56.241+05:30	2026-02-28 12:52:13.799+05:30	\N	\N
15d0b8fe-21aa-4b68-9bad-cd9e243ae9c5	room_54104374499d4dd89431c55de698a649mm5vqlvi	ttt	Social	public	\N	ended	\N	2026-02-28 10:57:41.887+05:30	2026-02-28 11:02:32.82+05:30	4	4	2026-02-28 10:57:41.887+05:30	2026-02-28 11:02:32.82+05:30	\N	\N
f30c5d13-3435-4b95-9c10-60e983d65777	room_c5ebd773908d4bfb86dbc8fc57bbdb43mm64yuxj	hello	Social	public	\N	ended	\N	2026-02-28 15:16:08.702+05:30	2026-02-28 15:17:10.049+05:30	0	0	2026-02-28 15:16:03.447+05:30	2026-02-28 15:17:10.049+05:30	\N	\N
64dae23e-fbe6-4937-8c99-378e7850b495	room_70b4a6be64d2400ebaa276c41dff49f0mm5ufwqp	e	Social	public	\N	ended	\N	2026-02-28 10:21:23.161+05:30	2026-02-28 10:24:29.805+05:30	6	6	2026-02-28 10:21:23.162+05:30	2026-02-28 10:24:29.806+05:30	\N	\N
d0e138f4-9382-4a29-a572-5c81d0209ffb	room_e6872dce5ca34ce2919cdf2887af8492mm5ukb25	ab	Social	public	\N	ended	\N	2026-02-28 10:24:48.445+05:30	2026-02-28 10:25:09.129+05:30	0	0	2026-02-28 10:24:48.445+05:30	2026-02-28 10:25:09.129+05:30	\N	\N
a5f756d4-ce57-420e-8505-24609cc60549	room_442f813c9e3a47a6b65ae12fe6b8c427mm5wgrft	gcg	Social	public	\N	ended	\N	2026-02-28 11:18:02.175+05:30	2026-02-28 11:21:10.324+05:30	6	6	2026-02-28 11:18:02.176+05:30	2026-02-28 11:21:10.324+05:30	\N	\N
fac877e6-236c-46a4-8f41-0f3706219352	room_71e348245ba94985aa8be11cdcb4d87dmm4pnji2	a	Social	public	\N	ended	\N	2026-02-27 15:19:34.976+05:30	2026-02-27 16:07:56.671+05:30	61	61	2026-02-27 15:19:34.977+05:30	2026-02-27 16:07:56.672+05:30	\N	\N
a6b552ec-07cf-4daf-b13f-01bcb2d1387e	room_cb16e56ae8be4f409d97a75195cbe9a6mm650ach	afd	Social	public	\N	ended	\N	2026-02-28 15:17:26.314+05:30	2026-02-28 15:19:52.788+05:30	0	0	2026-02-28 15:17:10.081+05:30	2026-02-28 15:19:52.788+05:30	\N	\N
01b649b8-bbe0-464c-9874-2f50669bd720	room_7ea9b2420285498591f4cc0293f1868bmm653rx0	fd	Social	public	\N	ended	\N	2026-02-28 15:19:54.832+05:30	2026-02-28 15:22:45.783+05:30	0	0	2026-02-28 15:19:52.818+05:30	2026-02-28 15:22:45.783+05:30	\N	\N
9007ba37-98d8-4f9f-8172-5d5ea740861d	room_e56145f37dca4ca3b294de3773977270mm5wl5qj	edhb	Social	public	\N	ended	\N	2026-02-28 11:21:27.333+05:30	2026-02-28 11:46:42.724+05:30	6	6	2026-02-28 11:21:27.333+05:30	2026-02-28 11:46:42.724+05:30	\N	\N
bd35ca2c-c747-4987-8e1c-dbad8e19bae3	room_363aceb715904b3d859fa2bb15c69dd8mm5xs1mz	jmtyg	Social	public	\N	ended	\N	2026-02-28 11:54:48.226+05:30	2026-02-28 11:56:11.911+05:30	0	0	2026-02-28 11:54:48.226+05:30	2026-02-28 11:56:11.911+05:30	\N	\N
4604563d-6bb7-49e8-88c4-0b2db46ef661	room_f256f25b5ec74d13ab88f1001e443866mm657hef	ff	Social	public	\N	ended	\N	2026-02-28 15:22:52.122+05:30	2026-02-28 15:26:02.9+05:30	0	0	2026-02-28 15:22:45.814+05:30	2026-02-28 15:26:02.901+05:30	\N	\N
13c28aa0-0c5e-4b9d-a837-bfae2920a65b	room_407293006e1941fa862115665a59eddfmm65bphw	f	Social	public	\N	ended	\N	\N	2026-02-28 15:30:17.262+05:30	0	0	2026-02-28 15:26:02.941+05:30	2026-02-28 15:30:17.263+05:30	\N	\N
58f82f47-0c5c-4fca-a029-4add82006352	room_d1cf2d6edc9b4fe78a675a905e0cfaadmm65h5ri	gf	Social	public	\N	ended	\N	2026-02-28 15:30:22.698+05:30	2026-02-28 15:31:42.705+05:30	0	0	2026-02-28 15:30:17.297+05:30	2026-02-28 15:31:42.705+05:30	\N	\N
ed527cc1-d6c9-4436-a048-eb7eee48ae61	room_a32adbba95b24a23b51b0a93d150f0efmm65izox	fafdf	Social	public	\N	ended	\N	2026-02-28 15:31:46.075+05:30	2026-02-28 15:34:39.903+05:30	0	0	2026-02-28 15:31:42.736+05:30	2026-02-28 15:34:39.904+05:30	\N	\N
7e8ad122-5027-4a31-bffe-f1e7099ec9cf	room_103ee3ef11964785a3ba59271941846emm65msf3	ff	Social	public	\N	ended	\N	2026-02-28 15:34:42.285+05:30	2026-02-28 15:45:09.57+05:30	0	0	2026-02-28 15:34:39.94+05:30	2026-02-28 15:45:09.57+05:30	\N	\N
69b55866-9745-4c7e-b840-5ed9c0b370a3	room_b6a0d57b334e440fba844904d2e5698emm660a9u	gg	Social	public	\N	ended	\N	2026-02-28 15:45:23.718+05:30	2026-02-28 15:50:41.565+05:30	0	0	2026-02-28 15:45:09.6+05:30	2026-02-28 15:50:41.565+05:30	\N	\N
0b68092f-3fbb-4a57-b64e-4794e1d43d6f	room_0543430f8d1a44798c5e89429865cb18mm8m4tki	a	Social	public	\N	idle	\N	\N	\N	0	0	2026-03-02 08:52:07.418+05:30	2026-03-02 08:52:07.418+05:30	\N	\N
39d3e1c4-4d11-4c4f-b9a0-d9c10dcaa571	room_457814acec6c4352ba9fc598c8abd240mm667efx	ty	Social	public	\N	ended	\N	2026-02-28 15:50:46.71+05:30	2026-03-02 08:44:26.677+05:30	4	4	2026-02-28 15:50:41.596+05:30	2026-03-02 08:44:26.677+05:30	\N	\N
0d990fac-bdcc-4580-92c0-679f10452755	room_ca1be148fdb34f0ea3c5924ee93567c1mm8mo23z	a	Social	public	\N	ended	\N	2026-03-02 09:07:04.974+05:30	2026-03-02 09:08:20.579+05:30	0	0	2026-03-02 09:07:04.975+05:30	2026-03-02 09:08:20.579+05:30	\N	\N
2b84d0bc-99d8-485c-88f3-0249284c7c6c	room_3b68b7a085904b07a44dd1ca584eb293mm8mpogz	a	Social	public	\N	ended	2026-03-02 09:09:00+05:30	2026-03-02 09:08:23.014+05:30	2026-03-02 09:08:49.075+05:30	5	5	2026-03-02 09:08:20.606+05:30	2026-03-02 09:08:49.075+05:30	\N	\N
aea5d1b1-737d-4753-bc11-d365b094b7f4	room_439b59871de541f1aec968a8eeb8775bmm8mvjsd	s	Social	public	\N	ended	\N	2026-03-02 09:12:54.475+05:30	2026-03-02 09:16:34.667+05:30	0	0	2026-03-02 09:12:54.476+05:30	2026-03-02 09:16:34.667+05:30	\N	\N
bb02d558-ff56-407f-af08-f7c3f66c6b2b	room_4877c49059b1455aaf591ca1471eae67mm8n0xne	d	Social	public	\N	ended	\N	2026-03-02 09:17:05.72+05:30	2026-03-02 09:43:12.414+05:30	17	17	2026-03-02 09:17:05.72+05:30	2026-03-02 09:43:12.414+05:30	\N	\N
8cf8f4f6-26ef-4da4-aac5-ddb781642ee9	room_95999194e3074a33a29f1a2076ec7904mm8syqp9	g	Social	public	\N	ended	\N	2026-03-02 12:03:21.094+05:30	2026-03-02 12:05:39.741+05:30	6	6	2026-03-02 12:03:21.094+05:30	2026-03-02 12:05:39.741+05:30	\N	\N
782bb235-3076-401f-89c6-b4aa53769777	room_ce045d49fd464a4b8b38465e4cbd8771mmbheb3n	a	Social	public	\N	ended	\N	2026-03-04 09:02:50.509+05:30	2026-03-04 09:05:48.124+05:30	11	11	2026-03-04 09:02:50.509+05:30	2026-03-04 09:05:48.124+05:30	\N	\N
406eb798-c90d-4c37-8036-d2549c535ad9	\N	a	Social	Public	\N	LIVE	\N	2026-03-07 10:33:23.423+05:30	\N	0	0	2026-03-07 10:33:23.424+05:30	2026-03-07 10:33:23.424+05:30	\N	\N
85bf27e3-83b2-4027-8f6d-2bdb726b271f	room_499f5b180a7b4093bb3ae9914b136d01mm8nyxry	live	Social	public	\N	ended	\N	2026-03-02 09:43:32.184+05:30	2026-03-02 09:58:19.956+05:30	11	11	2026-03-02 09:43:32.184+05:30	2026-03-02 09:58:19.956+05:30	\N	\N
1d8cad24-0563-4766-9e31-841f3d8e21b9	room_5b60c18a433642389799ebe523bd796cmm8oisj0	d	Social	public	\N	ended	\N	2026-03-02 09:58:58.502+05:30	2026-03-02 10:31:05.277+05:30	0	0	2026-03-02 09:58:58.502+05:30	2026-03-02 10:31:05.278+05:30	\N	\N
ad1b781c-76e0-4f95-a2cf-f17f35874781	room_a2258683614641c8ae93b1551798c7damm8t8x5q	video game	Social	public	\N	ended	\N	2026-03-02 12:11:16+05:30	2026-03-02 12:13:18.238+05:30	5	5	2026-03-02 12:11:16+05:30	2026-03-02 12:13:18.238+05:30	\N	\N
304af157-29e0-4bc0-a5f2-dcf51a51fe25	room_d7868ddb211446d18ceafa14aa7e00a5mm8td1ak	a	Social	public	\N	ended	\N	2026-03-02 12:14:28.007+05:30	2026-03-02 12:16:31.94+05:30	0	0	2026-03-02 12:14:28.007+05:30	2026-03-02 12:16:31.94+05:30	\N	\N
2f3e99a0-d271-4e03-9698-242c7246d16b	room_1ff4e36e7bdd4b9e8875677de8993828mm8po9ur	ss	Social	public	\N	ended	\N	2026-03-02 10:31:13.829+05:30	2026-03-02 10:48:15.053+05:30	4	4	2026-03-02 10:31:13.83+05:30	2026-03-02 10:48:15.053+05:30	\N	\N
e5dfdc46-ec1a-413f-80bf-3a3e84abf987	room_d18340e40f27474c82aff7bcc848ed39mm8qag6p	aa	Social	public	\N	ended	\N	2026-03-02 10:48:28.467+05:30	2026-03-02 10:48:40.021+05:30	0	0	2026-03-02 10:48:28.467+05:30	2026-03-02 10:48:40.021+05:30	\N	\N
a2647e1a-bb59-478c-b176-b2c770070629	room_4307e1e30ea24d1ba5dfcfa84303bb4cmm8qb90u	a	Social	public	\N	ended	\N	2026-03-02 10:49:05.969+05:30	2026-03-02 11:00:22.063+05:30	0	0	2026-03-02 10:49:05.969+05:30	2026-03-02 11:00:22.063+05:30	\N	\N
ec9b82a6-87c9-454c-8206-0a50a547c06c	room_ac9ea8064d5c487cbfbbe0d358a9f185mm8tk50b	fuirfhj	Social	public	\N	ended	\N	2026-03-02 12:19:59.414+05:30	2026-03-02 12:21:53.554+05:30	5	5	2026-03-02 12:19:59.415+05:30	2026-03-02 12:21:53.554+05:30	\N	\N
d6554a01-65f9-49db-a0b7-f348c43b7f38	room_8ef3e3dd73854a18b4d7248416f4e9e9mm8qpyy4	h	Social	public	\N	ended	\N	2026-03-02 11:00:32.622+05:30	2026-03-02 11:17:25.349+05:30	4	4	2026-03-02 11:00:32.622+05:30	2026-03-02 11:17:25.349+05:30	\N	\N
1f265282-3cf6-4e10-a004-bc8080e227d3	room_ca66dc8611c24cad87d51a870b59062cmm8y0gqf	fa	Social	public	\N	ended	\N	2026-03-02 14:24:39.545+05:30	2026-03-02 15:34:03.557+05:30	18	18	2026-03-02 14:24:39.545+05:30	2026-03-02 15:34:03.558+05:30	\N	\N
c8c377ec-871e-4d3f-b01a-ab6fb54c452c	room_004bd6d6a3004858b31797701229530dmm8uh8z9	a	Social	public	\N	ended	\N	2026-03-02 12:45:44.183+05:30	2026-03-02 13:32:23.044+05:30	6	6	2026-03-02 12:45:44.183+05:30	2026-03-02 13:32:23.044+05:30	\N	\N
1d3aa0bb-0c23-4521-ab6b-355f87b57f93	room_58d100b40af24f1dacca7e00fe8874e0mmfv18hb	a	Social	public	\N	ended	\N	2026-03-07 10:35:39.916+05:30	2026-03-07 10:36:32.137+05:30	5	5	2026-03-07 10:35:39.917+05:30	2026-03-07 10:36:32.137+05:30	3	\N
46556f12-bc99-4fe2-b17d-3e66cc0b8969	room_39f647e3b74b40d480a58646570dd2f3mm8rby4j	f	Social	public	\N	ended	\N	2026-03-02 11:17:38.015+05:30	2026-03-02 11:55:10.328+05:30	10	10	2026-03-02 11:17:38.015+05:30	2026-03-02 11:55:10.328+05:30	\N	\N
757a4b7c-81b6-4613-9dfb-de900dae6823	room_7d0c4f7ad73b40daad2533450279d181mm8wulst	a	Social	public	\N	ended	\N	2026-03-02 13:52:06.587+05:30	2026-03-02 14:24:11.342+05:30	4	4	2026-03-02 13:52:06.587+05:30	2026-03-02 14:24:11.342+05:30	\N	\N
e3ddf773-9ac6-4a3d-92b9-b0beef4de80d	room_c0d305c644ce4e3aba150e6b4afcd22emm90hpph	a	Social	public	\N	ended	\N	2026-03-02 15:34:03.561+05:30	2026-03-02 15:37:51.471+05:30	4	4	2026-03-02 15:34:03.561+05:30	2026-03-02 15:37:51.471+05:30	\N	\N
c740dfbe-d33f-4c25-989d-7ef253e62932	room_1eee0111ca5944138dd37a286ea1fdefmmbgqdvi	a	Social	public	\N	ended	\N	2026-03-04 08:44:14.367+05:30	2026-03-04 09:01:25.717+05:30	0	0	2026-03-04 08:44:14.368+05:30	2026-03-04 09:01:25.717+05:30	\N	\N
fd34f243-9d48-404c-a282-c961be3e55f5	room_0beb0c0c1e84486ab685c5484187b92cmm8tqzvx	ggt	Social	public	\N	ended	\N	2026-03-02 12:25:19.365+05:30	2026-03-02 14:26:27.18+05:30	24	24	2026-03-02 12:25:19.365+05:30	2026-03-02 14:26:27.18+05:30	\N	\N
5c6e28e0-4a2f-484f-98d5-48af755098b6	room_dc76aa5b98aa4041be6d55facac04322mmfynkoe	avd	Social	public	\N	ended	\N	2026-03-07 12:17:01.008+05:30	2026-03-07 12:57:59.005+05:30	11	11	2026-03-07 12:17:01.008+05:30	2026-03-07 12:57:59.006+05:30	2	\N
\.


--
-- Data for Name: live_supporters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_supporters (id, stream_id, user_id, username, badge_level, amount_paid, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: live_viewers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_viewers (id, "streamId", "userId", "joinedAt", "leftAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: muted_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.muted_accounts (id, user_id, muted_user_id, created_at, mute_posts, mute_stories) FROM stdin;
228c22b0-8194-438c-8348-52735d51c584	2	435	2026-03-02 10:12:49.6+05:30	t	t
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, type, from_user_id, from_username, from_user_avatar, title, message, link, is_read, created_at) FROM stdin;
29d3808d-9985-453f-8f19-efbf6829288e	5	follow	6	ashish	/api/v1/media/files/Jaadoe/posts/images/1772084806946-33478956_opt.webp	New Follower	ashish started following you	/profile/6	t	2026-02-26 11:19:16.833+05:30
c6f305f5-9cde-4547-9e16-e8d03ba5f50f	5	follow	7	sarfarz	/api/v1/media/files/Jaadoe/posts/images/1772085050435-53870855_opt.webp	New Follower	sarfarz started following you	/profile/7	t	2026-02-26 11:24:02.992+05:30
c4f5e026-e6ec-4e3a-8899-c04e3e92faaa	5	follow	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Follower	akbar started following you	/profile/3	t	2026-02-26 12:15:58.249+05:30
961cee2a-4d30-413c-bc70-f4a561f601fa	7	message	2	must	\N	New Message	must: https://jaadoe.app/post/2092	/messages/36	f	2026-02-27 15:39:08.264+05:30
59e4ef3c-30df-4042-9d97-147fc1afbffb	7	message	2	must	\N	New Message	must: https://jaadoe.app/post/2092	/messages/36	f	2026-02-27 15:51:32.976+05:30
8febb586-5ae6-4940-994a-9d6c8dc27e70	7	message	2	must	\N	New Message	must: https://jaadoe.app/post/2082	/messages/36	f	2026-02-28 10:16:34.861+05:30
9bcd56ff-f722-4ca8-b79c-5210bb853ce9	5	message	2	must	\N	New Message	must: hi	/messages/37	t	2026-02-28 10:46:10.496+05:30
76e7c1a9-32fd-4b2b-b3d6-bb9cf8661eb6	5	message	2	must	\N	New Message	must: https://jaadoe.app/post/2092	/messages/37	t	2026-02-28 10:53:11.712+05:30
9c4b3cf9-afb9-4147-a11f-97afb0230ccc	5	follow	2	must		New Follower	must started following you	/profile/2	t	2026-02-28 11:47:09.365+05:30
598e412a-5681-47b3-b68b-aaf0c0289506	5	message	2	must	\N	New Message	must: hhii	/messages/37	t	2026-02-28 11:47:19.412+05:30
d2b2fe17-3c02-4d4b-9c18-a53a5489d58e	7	follow	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Follower	akbar started following you	/profile/3	f	2026-02-26 12:15:59.415+05:30
a5fe69aa-9c7b-4fb3-8956-38912606c44d	6	follow	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Follower	akbar started following you	/profile/3	f	2026-02-26 12:16:07.049+05:30
e18be6e9-2bf7-44dd-bee4-1819f5d69207	5	message	2	must	\N	New Message	must: 📹 Video call	/messages/37	t	2026-02-28 11:48:57.198+05:30
a4b401e1-ef15-4e0c-a55b-7804e4c91228	2	follow	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Follower	akbar started following you	/profile/3	t	2026-02-27 16:07:14.624+05:30
935b0b59-e69b-4c53-81d2-5974f911db53	7	follow	2	must		New Follower	must started following you	/profile/2	f	2026-02-28 15:37:27.261+05:30
9efcc4c2-dd44-4d55-afd2-7d4e78f3c0b9	7	like	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Like	akbar liked your post	/p/2109	f	2026-02-27 09:09:32.383+05:30
fc3cffae-a8fe-4daf-ace2-f870f9b4f6f1	7	like	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Like	akbar liked your post	/p/2108	f	2026-02-27 09:09:34.85+05:30
4963a4ea-3a27-4b8f-8606-04f6ba3ce699	2	message	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Message	akbar: hello\\	/messages/33	t	2026-03-02 09:17:34.882+05:30
3c7f4ec5-89a6-47f3-8ac4-fc7b2c62cf91	7	message	2	must	\N	New Message	must: hi	/messages/36	f	2026-03-02 11:17:13.992+05:30
088fe220-27c9-405e-94a1-77945457b145	7	message	2	must	\N	New Message	must: hi	/messages/36	f	2026-03-02 11:23:00.541+05:30
f913fab7-27e2-4f38-b2ff-d5e5528f180c	8	follow	2	must		New Follower	must started following you	/profile/2	t	2026-03-02 11:06:00.33+05:30
8863d6a2-3370-4262-9a9c-aa053cfbd517	8	message	2	must	\N	New Message	must: [STORY_REACTION] 🔥	/messages/39	t	2026-03-02 11:16:54.337+05:30
69ade14d-1123-4baf-a17f-de2cd69568ff	8	message	2	must	\N	New Message	must: [STORY_REACTION] ❤️	/messages/39	t	2026-03-02 11:22:37.732+05:30
809c951b-c224-4ca8-8a09-0165b1c177a9	8	message	2	must	\N	New Message	must: [STORY_REACTION] 😢	/messages/39	t	2026-03-02 11:34:59.223+05:30
8840a157-954d-44aa-b420-2ab1e6e5e3c3	8	message	2	must	\N	New Message	must: [STORY_REACTION] ❤️	/messages/39	t	2026-03-02 11:35:16.717+05:30
99c8c407-1b6c-45d8-943b-583c3e2644ad	10	follow	9	irfan1		New Follower	irfan1 started following you	/profile/9	t	2026-03-02 12:11:06.192+05:30
6df8efb0-2c86-4013-b2b4-16a269d43ce0	2	follow	5	farhan	/api/v1/media/files/Jaadoe/posts/images/1772084049865-897626602_opt.webp	New Follower	farhan started following you	/profile/5	t	2026-03-02 12:02:27.948+05:30
fedbad88-19d6-4a8a-b4b9-76d06dda9856	3	message	2	must	\N	New Message	must: https://jaadoe.app/post/2092	/messages/33	t	2026-02-27 15:54:11.066+05:30
f23e7fd3-4326-4101-8dd7-4ff9b937935c	3	follow	2	must		New Follower	must started following you	/profile/2	t	2026-02-27 15:54:33.357+05:30
e0874d5e-4a3f-4b63-8b4a-e98c34dd3819	3	message	2	must	\N	New Message	must: https://jaadoe.app/reel/62	/messages/33	t	2026-02-28 15:39:32.366+05:30
7fd94e5d-b745-4898-b01f-a6ae98ee3505	2	follow	8	Anu1		New Follower	Anu1 started following you	/profile/8	t	2026-03-02 11:05:33.707+05:30
aff9242f-f3b4-4cf0-bb5f-0e97299cf689	435	message	2	must	\N	New Message	must: Check this out: https://jaadoe.app/post/2092	/messages/34	f	2026-02-27 13:35:35.182+05:30
1ca080d0-ab9b-4250-8ce1-4f603ba1862c	435	message	2	must	\N	New Message	must: Check this out: https://jaadoe.app/post/2092	/messages/34	f	2026-02-27 13:37:03.035+05:30
10d177ed-4927-42a9-9723-5cb2b39c7347	435	message	2	must	\N	New Message	must: https://jaadoe.app/post/2089	/messages/35	f	2026-02-27 13:45:33.483+05:30
af6d7697-f5e3-4467-b41a-bf1bf653c160	3	like	2	must		New Like	must liked your post	/p/2092	t	2026-02-27 11:59:56.327+05:30
03359e97-86e7-49db-8e1c-525123dd9aef	3	like	2	must		New Like	must liked your post	/p/2092	t	2026-02-27 12:38:51.17+05:30
47c98fad-dba2-467b-bfd3-11480ddd5931	3	follow	2	must		New Follower	must started following you	/profile/2	t	2026-02-27 12:40:21.838+05:30
c1d544cd-9a4d-4d94-a180-ab0226b53be8	3	like	2	must		New Like	must liked your post	/p/2092	t	2026-02-27 12:41:30.054+05:30
eac5643a-40db-402f-aea7-f61d23a7565c	3	follow	2	must		New Follower	must started following you	/profile/2	t	2026-02-27 12:42:24.992+05:30
36ec370e-f2f0-43dd-ad28-b5cc4c75e80a	3	message	2	must	\N	New Message	must: https://192.168.1.100:5175/feed	/messages/33	t	2026-02-27 12:47:11.792+05:30
2590bcf2-7ece-434f-9cef-bf90a701cd88	3	follow	2	must		New Follower	must started following you	/profile/2	t	2026-02-27 12:50:56.394+05:30
07587f33-b075-4832-8307-da902d8b0428	3	follow	2	must		New Follower	must started following you	/profile/2	t	2026-02-27 13:01:49.146+05:30
cf268c76-8944-441f-88d6-76569b435b2f	5	message	2	must	\N	New Message	must: hu	/messages/38	t	2026-02-28 11:50:36.631+05:30
5414ab8b-50bf-460a-b161-d0a50804115e	5	message	2	must	\N	New Message	must: dhnbdz	/messages/38	t	2026-02-28 11:51:20.149+05:30
5ff826a1-ebb4-43cc-9f15-768495c78e5b	5	message	2	must	\N	New Message	must: 🖼️ Sticker	/messages/38	t	2026-02-28 12:07:35.503+05:30
f0aeab3a-c1a5-4a09-963e-0cb8a3df4aba	5	message	2	must	\N	New Message	must: 🖼️ Sticker	/messages/38	t	2026-02-28 12:09:16.301+05:30
3d459afd-52d2-45ca-8a8b-05560e936988	5	message	2	must	\N	New Message	must: ❤️	/messages/38	t	2026-02-28 12:11:26.934+05:30
8b825b66-5650-4086-8404-02e60541e30b	10	follow	8	Anu1		New Follower	Anu1 started following you	/profile/8	t	2026-03-02 12:27:51.456+05:30
0b5a522b-2703-45a5-aff2-84a84504dad2	10	follow	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Follower	akbar started following you	/profile/3	t	2026-03-02 12:28:40.814+05:30
14969058-35e0-47b6-b952-03451f12b379	3	follow	8	Anu1		New Follower	Anu1 started following you	/profile/8	t	2026-03-02 11:05:39.041+05:30
5d0875ff-f505-4a64-b35d-b4e454710fc5	3	message	2	must	\N	New Message	must: lol	/messages/33	t	2026-03-02 14:07:06.77+05:30
1052e98c-8c83-44cb-b9d9-891cc74ecdbf	3	follow	10	shahbaazk		New Follower	shahbaazk started following you	/profile/10	t	2026-03-02 14:30:01.771+05:30
e69ef4d2-d5fd-41b7-ac76-1545faf1428f	3	like	10	shahbaazk		New Like	shahbaazk liked your post	/p/2092	t	2026-03-02 14:44:55.745+05:30
4a18e745-f088-48a7-a14c-e27845bb70f1	5	message	2	must	\N	New Message	must: https://jaadoe.app/reel/61	/messages/38	t	2026-02-28 15:40:03.649+05:30
89d515be-4b01-4daa-b962-24519c1f9def	5	follow	8	Anu1		New Follower	Anu1 started following you	/profile/8	t	2026-03-02 11:05:46.076+05:30
f0afd539-3272-410d-8540-50b87cd77acd	5	message	2	must	\N	New Message	must: hi	/messages/38	t	2026-03-02 11:23:05.942+05:30
5ef35dc6-405e-4c42-81cd-e596ef233c9f	7	follow	2	must		New Follower	must started following you	/profile/2	f	2026-03-04 09:47:29.313+05:30
ed8c0f44-f12e-435c-98be-3309d673ba4b	7	follow	2	must		New Follower	must started following you	/profile/2	f	2026-03-04 10:23:50.942+05:30
d91e2827-6205-41d4-88d2-f5685cd2ff4b	7	like	2	must		New Like	must liked your post	/p/2109	f	2026-03-05 10:23:14.464+05:30
9003ed92-70c5-4d4a-ab50-edd272251274	10	follow	18	juneadkhan		New Follower	juneadkhan7_4380 started following you	/profile/18	f	2026-03-05 14:27:41.017+05:30
7c22dbb4-fa71-443e-a775-191aaf557ee2	7	follow	18	juneadkhan		New Follower	juneadkhan7_4380 started following you	/profile/18	f	2026-03-05 14:27:42.587+05:30
d19f70b2-7499-4d3c-b244-7d62da3c1da2	2110	message	18	juneadkhan	\N	New Message	juneadkhan7_4380: hi	/messages/40	f	2026-03-05 14:36:06.26+05:30
37a979f4-aeea-479a-81dc-73d5b3b37979	2	follow	18	juneadkhan		New Follower	juneadkhan7_4380 started following you	/profile/18	t	2026-03-05 14:27:41.772+05:30
5ab233ee-a9d0-42b7-8911-56f7d5937e2b	19	message	2	must	\N	New Message	must: https://jaadoe.app/post/2083	/messages/41	f	2026-03-05 14:56:52.856+05:30
66cfc214-f448-42b6-b8b2-91db3e321d3c	2	follow	19	Akshay		New Follower	Akshay started following you	/profile/19	t	2026-03-05 14:56:28.382+05:30
6026c8f7-bfd9-4195-96ce-7400c8b249a6	19	follow	2	must		New Follower	must started following you	/profile/2	f	2026-03-05 15:16:07.932+05:30
7883656c-2cdd-448a-8915-891e9d4b71d5	17	follow	2	must		New Follower	must started following you	/profile/2	f	2026-03-05 15:18:55.994+05:30
b709d5a3-abd5-4777-b90c-7e8a1a22a46c	2	message	3	akbar_09	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Message	akbar: heloo	/messages/33	t	2026-03-05 15:40:44.549+05:30
434141e3-60a7-4a4c-9bd7-6b80e252b244	2	message	3	akbar_09	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Message	akbar: chomu	/messages/33	t	2026-03-05 15:42:05.543+05:30
166b891d-0108-4970-b527-6b59b01b2941	3	follow	2	must		New Follower	must started following you	/profile/2	t	2026-03-04 10:24:26.538+05:30
332db57d-8e98-4eaf-81c8-32eb116181e2	3	follow	14	tanmay_03		New Follower	tanmay03_6252 started following you	/profile/14	t	2026-03-04 12:45:16.19+05:30
95800f19-305f-453b-84fe-b73470d46e6e	3	follow	18	juneadkhan		New Follower	juneadkhan7_4380 started following you	/profile/18	t	2026-03-05 14:27:39.164+05:30
f936620e-eca5-4ce1-ad95-e8590d1cddd9	3	message	2	must	\N	New Message	must: [STORY_REACTION] ❤️	/messages/33	t	2026-03-05 14:45:02.11+05:30
e1462cf3-8afc-4efb-9105-07a63b464445	3	message	2	must	\N	New Message	must: [STORY_REACTION] ❤️	/messages/33	t	2026-03-05 14:45:04.843+05:30
7f576baf-0fe6-41d1-86f0-dccd4479e3d4	3	follow	2	must		New Follower	must started following you	/profile/2	t	2026-03-05 15:18:37.598+05:30
70359efc-86ff-4987-b570-a3d089cd3873	2	message	3	akbar1	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Message	akbar: hii	/messages/33	f	2026-03-06 15:48:32.693+05:30
a122321b-c67c-4252-9f53-721d36346322	9	POST_TAG	3	akbar	\N	Tagged in a post	akbar tagged you in their post.	#	f	2026-03-07 09:25:45.755+05:30
ca43958f-e7c1-4595-aafe-8331d640b206	2	message	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Message	akbar: 📞 Voice call	/messages/33	f	2026-03-07 10:36:56.977+05:30
b9b423f6-2dea-41aa-92de-3d3ffb4784fd	2	message	3	akbar	/api/v1/media/files/Jaadoe/posts/images/1772082904087-159841012_opt.webp	New Message	akbar: 📹 Video call	/messages/33	f	2026-03-07 10:37:24.511+05:30
6d6b3786-16b9-4a35-8589-d73fa39967f5	17	follow	20	taleem_01		New Follower	taleem_4160 started following you	/profile/20	f	2026-03-07 10:40:03.973+05:30
00e3b488-5db5-4dbb-819d-419359ee8362	2	follow	20	taleem_01		New Follower	taleem_4160 started following you	/profile/20	f	2026-03-07 10:40:05.444+05:30
1c49a3b7-4fd0-4fa8-a716-0a3af3779851	3	follow	20	taleem_01		New Follower	taleem_4160 started following you	/profile/20	t	2026-03-07 10:39:52.613+05:30
723a9266-2b46-421f-9d3c-2f4b8f8638d0	5	follow	15	tanmay04		New Follower	tanmay04_1074 started following you	/profile/15	t	2026-03-04 12:59:47.622+05:30
4e43263c-4929-42cf-bb76-e48ed7bdcfd2	5	follow	18	juneadkhan		New Follower	juneadkhan7_4380 started following you	/profile/18	t	2026-03-05 14:27:40.154+05:30
277344c5-be02-41ac-96ea-8b8bb02f6d7a	5	follow	2	must		New Follower	must started following you	/profile/2	t	2026-03-05 15:18:44.73+05:30
8120369f-cef0-4a59-abd8-9c6a4236b7c7	5	follow	20	taleem_01		New Follower	taleem_4160 started following you	/profile/20	t	2026-03-07 10:40:01.53+05:30
0e855d5f-4b64-4abd-abd5-df6f4c838a43	2	message	5	farhan	/api/v1/media/files/Jaadoe/posts/images/1772084049865-897626602_opt.webp	New Message	farhan: hii	/messages/38	f	2026-03-07 12:24:04.712+05:30
\.


--
-- Data for Name: pending_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pending_tags (id, post_id, tagged_user_id, tagged_by_user_id, status, created_at) FROM stdin;
\.


--
-- Data for Name: pinned_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pinned_posts (id, "userId", "postId", "position") FROM stdin;
1	3	2111	0
\.


--
-- Data for Name: post_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_tags (id, "postId", "taggedUserId", approved, "createdAt") FROM stdin;
1	2112	9	t	2026-03-06 16:09:43.283+05:30
2	2111	5	t	2026-03-07 12:04:50.382+05:30
\.


--
-- Data for Name: profile_actions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_actions (id, "userId", type, url, "createdAt") FROM stdin;
\.


--
-- Data for Name: profile_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_links (id, "userId", title, url, "position", "createdAt") FROM stdin;
\.


--
-- Data for Name: push_subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.push_subscriptions (id, user_id, endpoint, p256dh, auth, created_at) FROM stdin;
7d776872-58c2-4a6a-8f3d-6e0956284139	3	https://fcm.googleapis.com/fcm/send/cx2C8OItS5g:APA91bHi33myaFZi_ufG_Y509ngaz6DI1QyFZvq6SZ-hWK-cRwvaNFKkOMHzOHgT3Z9dhLOxs0PgXfmdA9PcwmbcABWarIYoFIKoVrsVRz4iZkgwFnXmXxpJDblldqf15cpvGWRqRVum	BC3aasnzA6kOmlPDd7xMtGPS-F4nKx5R6-IUDGBJsMlPBKnr844_ncjRIIXfZVKlm0BUiUAz94mZ4iCtKUcIGJM	WZOBjURK-b1ixQJmYOOZTQ	2026-02-26 14:52:35.702+05:30
ccf7d8ba-f8a2-4aba-af00-2661bf5ece30	3	https://fcm.googleapis.com/fcm/send/el3xErxTkpc:APA91bEl8vv3usCOVx-Hj4sE0_SAm2ftxI4D3zqm9HVTek0oHZiegc_vPleaFMeruXp8AAS9NYxu96meMs-mzZRZhzqxmkBCrY2MzaeWIPPgchNzB_yUHIYQXcVv2KlMMg8w1zps10QF	BDTuL0Dg7h2E9OT-3ZJfZjmYgo8szcVcoxLk7P4L4VsNb5koKTthBDNbkHzDvntVUZ6TlKxpeYlkHiz93UKtYzo	oOdNXuJoYLOsjEXsRXYIww	2026-02-26 14:56:52.723+05:30
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, reporter_id, reported_user_id, content_type, content_id, reason, description, status, resolution_type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: restricted_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restricted_accounts (id, user_id, restricted_user_id, created_at) FROM stdin;
c1c60e8e-b84f-4191-b997-9fdfd8a26eb6	2	436	2026-03-02 10:11:31.706+05:30
\.


--
-- Data for Name: scheduled_streams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scheduled_streams (id, "userId", title, "scheduledAt", category, "thumbnailUrl", visibility, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: story_highlights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.story_highlights (id, "userId", title, "coverImage", "createdAt") FROM stdin;
\.


--
-- Data for Name: story_privacy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.story_privacy (id, user_id, hidden_user_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: story_reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.story_reactions (id, "storyId", "reactorId", type, "createdAt", "updatedAt") FROM stdin;
2	99	2	LIKE	2026-02-28 11:38:52.106+05:30	2026-02-28 11:38:52.107+05:30
3	101	2	LIKE	2026-03-02 11:09:58.779+05:30	2026-03-02 11:09:58.779+05:30
4	102	2	LIKE	2026-03-05 14:45:02.066+05:30	2026-03-05 14:45:02.066+05:30
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, user_id, creator_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: support_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_requests (id, user_id, category, status, description, created_at) FROM stdin;
\.


--
-- Data for Name: system_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.system_settings (id, maintenance_mode, allow_registrations, email_alerts, admin_theme, updated_at) FROM stdin;
2	f	t	t	light	2026-02-28 12:24:18.673+05:30
\.


--
-- Data for Name: user_activity_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_activity_settings (user_id, show_activity_status, last_active_at, created_at, updated_at) FROM stdin;
2	t	\N	2026-03-05 09:37:01.209+05:30	2026-03-05 12:00:35.515+05:30
\.


--
-- Data for Name: user_avatars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_avatars (id, "userId", username, "avatarUrl", status, "uploadedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: user_comment_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_comment_settings (user_id, allow_from, allow_gif, updated_at) FROM stdin;
2	followers	t	2026-03-05 13:09:07.394+05:30
18	everyone	t	2026-03-05 14:31:20.35+05:30
\.


--
-- Data for Name: user_custom_words; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_custom_words (id, user_id, word) FROM stdin;
\.


--
-- Data for Name: user_general_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_general_settings (user_id, save_story_to_archive, reduce_motion, language_code, updated_at) FROM stdin;
1	t	f	en	2026-02-23 11:20:35.172+05:30
3	t	f	en	2026-02-26 10:44:52.283+05:30
5	t	f	en	2026-02-26 11:04:01.253+05:30
6	t	f	en	2026-02-26 11:16:36.912+05:30
7	t	f	en	2026-02-26 11:20:42.862+05:30
51	t	f	en	2026-02-26 11:40:43.174+05:30
8	t	f	en	2026-03-02 11:05:14.776+05:30
9	t	f	en	2026-03-02 12:09:13.073+05:30
10	t	f	en	2026-03-02 12:10:33.823+05:30
11	t	f	en	2026-03-04 09:08:31.392+05:30
12	t	f	en	2026-03-04 11:42:31.918+05:30
13	t	f	en	2026-03-04 12:14:06.511+05:30
14	t	f	en	2026-03-04 12:42:58.146+05:30
15	t	f	en	2026-03-04 12:50:42.548+05:30
17	t	f	en	2026-03-04 13:30:29.216+05:30
18	t	f	en-uk	2026-03-05 14:32:43.508+05:30
19	t	f	en	2026-03-05 14:55:48.051+05:30
2	t	f	en	2026-03-05 15:00:20.879+05:30
20	t	f	en	2026-03-07 10:39:00.708+05:30
\.


--
-- Data for Name: user_hidden_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_hidden_settings (user_id, hide_comments, advanced_filter, hide_message_requests, custom_hide_comments, custom_hide_message_requests) FROM stdin;
2	f	f	t	f	t
18	f	f	f	f	f
\.


--
-- Data for Name: user_message_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_message_settings (user_id, message_requests_from, group_add_permission, created_at, updated_at) FROM stdin;
2	everyone	everyone	2026-03-05 09:35:58.381+05:30	2026-03-05 12:01:08.592+05:30
\.


--
-- Data for Name: user_privacy_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_privacy_settings (user_id, allow_tags_from, manual_tag_approval, allow_mentions_from, created_at, updated_at) FROM stdin;
2	everyone	f	everyone	2026-03-05 09:37:14.7+05:30	2026-03-05 12:31:42.498+05:30
18	everyone	f	everyone	2026-03-05 14:31:19.476+05:30	2026-03-05 14:31:19.476+05:30
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sessions (id, "userId", "deviceId", token, "lastLogin", "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: user_sharing_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sharing_settings (user_id, story_shares, post_to_story, reposts, website_embeds, featured_requests) FROM stdin;
2	t	f	f	f	f
18	t	t	t	t	t
\.


--
-- Data for Name: user_story_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_story_settings (user_id, story_replies, created_at, updated_at) FROM stdin;
2	everyone	2026-03-05 09:36:06.822+05:30	2026-03-05 12:30:37.393+05:30
\.


--
-- Data for Name: violations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.violations (id, user_id, type, description, created_at) FROM stdin;
\.


--
-- Name: AccountAnalytics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AccountAnalytics_id_seq"', 1, false);


--
-- Name: AccountCategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AccountCategories_id_seq"', 24, true);


--
-- Name: AccountHistories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AccountHistories_id_seq"', 20, true);


--
-- Name: AccountProfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AccountProfiles_id_seq"', 2, true);


--
-- Name: AdminNotifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AdminNotifications_id_seq"', 1, true);


--
-- Name: CommentLikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CommentLikes_id_seq"', 24, true);


--
-- Name: Comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comments_id_seq"', 59, true);


--
-- Name: ContactMatches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContactMatches_id_seq"', 1, false);


--
-- Name: Conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Conversations_id_seq"', 41, true);


--
-- Name: Interests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Interests_id_seq"', 9, true);


--
-- Name: Likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Likes_id_seq"', 82, true);


--
-- Name: Messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Messages_id_seq"', 190, true);


--
-- Name: Notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notifications_id_seq"', 122, true);


--
-- Name: PostReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PostReports_id_seq"', 4, true);


--
-- Name: Posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Posts_id_seq"', 2112, true);


--
-- Name: ReelBookmarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ReelBookmarks_id_seq"', 9, true);


--
-- Name: ReelLikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ReelLikes_id_seq"', 20, true);


--
-- Name: ReelReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ReelReports_id_seq"', 3, true);


--
-- Name: Reels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reels_id_seq"', 62, true);


--
-- Name: Reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reports_id_seq"', 1, true);


--
-- Name: Reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reviews_id_seq"', 1, true);


--
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 1, true);


--
-- Name: SavedPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SavedPosts_id_seq"', 28, true);


--
-- Name: SearchIndices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SearchIndices_id_seq"', 455, true);


--
-- Name: Stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Stories_id_seq"', 104, true);


--
-- Name: StoryReplies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StoryReplies_id_seq"', 1, true);


--
-- Name: StoryReports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StoryReports_id_seq"', 1, true);


--
-- Name: StoryViews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StoryViews_id_seq"', 63, true);


--
-- Name: UserOnboardingEvents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserOnboardingEvents_id_seq"', 15, true);


--
-- Name: UserProfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserProfiles_id_seq"', 89, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 20, true);


--
-- Name: account_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_history_id_seq', 151, true);


--
-- Name: ad_clicks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ad_clicks_id_seq', 2, true);


--
-- Name: ad_impressions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ad_impressions_id_seq', 6, true);


--
-- Name: admin_audit_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_audit_logs_id_seq', 13, true);


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 1, true);


--
-- Name: dm_moderation_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dm_moderation_logs_id_seq', 1, true);


--
-- Name: explore_algorithm_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.explore_algorithm_config_id_seq', 1, true);


--
-- Name: explore_trending_topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.explore_trending_topics_id_seq', 6, true);


--
-- Name: featured_content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.featured_content_id_seq', 1, true);


--
-- Name: follower_activity_heatmap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.follower_activity_heatmap_id_seq', 1, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 320, true);


--
-- Name: highlight_stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.highlight_stories_id_seq', 1, false);


--
-- Name: impressions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.impressions_id_seq', 1848, true);


--
-- Name: interactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interactions_id_seq', 631, true);


--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.languages_id_seq', 5, true);


--
-- Name: pinned_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pinned_posts_id_seq', 1, true);


--
-- Name: post_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_tags_id_seq', 2, true);


--
-- Name: profile_actions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_actions_id_seq', 1, false);


--
-- Name: profile_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_links_id_seq', 1, false);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- Name: story_highlights_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.story_highlights_id_seq', 1, false);


--
-- Name: story_reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.story_reactions_id_seq', 4, true);


--
-- Name: system_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.system_settings_id_seq', 2, true);


--
-- Name: user_avatars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_avatars_id_seq', 1, true);


--
-- Name: user_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_sessions_id_seq', 1, true);


--
-- Name: AccountAnalytics AccountAnalytics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountAnalytics"
    ADD CONSTRAINT "AccountAnalytics_pkey" PRIMARY KEY (id);


--
-- Name: AccountCategories AccountCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountCategories"
    ADD CONSTRAINT "AccountCategories_pkey" PRIMARY KEY (id);


--
-- Name: AccountHistories AccountHistories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountHistories"
    ADD CONSTRAINT "AccountHistories_pkey" PRIMARY KEY (id);


--
-- Name: AccountProfiles AccountProfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_pkey" PRIMARY KEY (id);


--
-- Name: AccountProfiles AccountProfiles_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key1" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key10" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key11" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key12" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key13" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key14" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key15" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key16" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key17" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key18" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key19" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key2" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key20" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key21" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key22" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key23" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key24" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key25" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key26" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key27" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key28" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key29" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key3" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key30" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key31" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key32" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key33" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key34" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key35" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key36" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key37" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key38" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key39" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key4" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key40" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key41" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key42" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key43" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key44" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key45" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key46" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key47" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key48" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key49" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key5" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key50" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key51" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key52" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key53" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key54" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key55" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key56" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key57" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key58" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key59" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key6" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key60" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key61" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key62" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key63" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key64" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key65" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key66" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key67" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key68" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key69" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key7" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key70" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key71" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key72" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key8" UNIQUE ("userId");


--
-- Name: AccountProfiles AccountProfiles_userId_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AccountProfiles"
    ADD CONSTRAINT "AccountProfiles_userId_key9" UNIQUE ("userId");


--
-- Name: AppFeedback AppFeedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AppFeedback"
    ADD CONSTRAINT "AppFeedback_pkey" PRIMARY KEY (id);


--
-- Name: CommentLikes CommentLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CommentLikes"
    ADD CONSTRAINT "CommentLikes_pkey" PRIMARY KEY (id);


--
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: ContactMatches ContactMatches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactMatches"
    ADD CONSTRAINT "ContactMatches_pkey" PRIMARY KEY (id);


--
-- Name: Conversations Conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Conversations"
    ADD CONSTRAINT "Conversations_pkey" PRIMARY KEY (id);


--
-- Name: Feedbacks Feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks"
    ADD CONSTRAINT "Feedbacks_pkey" PRIMARY KEY (id);


--
-- Name: FollowRequests FollowRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FollowRequests"
    ADD CONSTRAINT "FollowRequests_pkey" PRIMARY KEY (id);


--
-- Name: Interests Interests_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key" UNIQUE (name);


--
-- Name: Interests Interests_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key1" UNIQUE (name);


--
-- Name: Interests Interests_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key10" UNIQUE (name);


--
-- Name: Interests Interests_name_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key100" UNIQUE (name);


--
-- Name: Interests Interests_name_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key101" UNIQUE (name);


--
-- Name: Interests Interests_name_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key102" UNIQUE (name);


--
-- Name: Interests Interests_name_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key103" UNIQUE (name);


--
-- Name: Interests Interests_name_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key104" UNIQUE (name);


--
-- Name: Interests Interests_name_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key105" UNIQUE (name);


--
-- Name: Interests Interests_name_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key106" UNIQUE (name);


--
-- Name: Interests Interests_name_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key107" UNIQUE (name);


--
-- Name: Interests Interests_name_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key108" UNIQUE (name);


--
-- Name: Interests Interests_name_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key109" UNIQUE (name);


--
-- Name: Interests Interests_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key11" UNIQUE (name);


--
-- Name: Interests Interests_name_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key110" UNIQUE (name);


--
-- Name: Interests Interests_name_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key111" UNIQUE (name);


--
-- Name: Interests Interests_name_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key112" UNIQUE (name);


--
-- Name: Interests Interests_name_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key113" UNIQUE (name);


--
-- Name: Interests Interests_name_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key114" UNIQUE (name);


--
-- Name: Interests Interests_name_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key115" UNIQUE (name);


--
-- Name: Interests Interests_name_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key116" UNIQUE (name);


--
-- Name: Interests Interests_name_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key117" UNIQUE (name);


--
-- Name: Interests Interests_name_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key118" UNIQUE (name);


--
-- Name: Interests Interests_name_key119; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key119" UNIQUE (name);


--
-- Name: Interests Interests_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key12" UNIQUE (name);


--
-- Name: Interests Interests_name_key120; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key120" UNIQUE (name);


--
-- Name: Interests Interests_name_key121; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key121" UNIQUE (name);


--
-- Name: Interests Interests_name_key122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key122" UNIQUE (name);


--
-- Name: Interests Interests_name_key123; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key123" UNIQUE (name);


--
-- Name: Interests Interests_name_key124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key124" UNIQUE (name);


--
-- Name: Interests Interests_name_key125; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key125" UNIQUE (name);


--
-- Name: Interests Interests_name_key126; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key126" UNIQUE (name);


--
-- Name: Interests Interests_name_key127; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key127" UNIQUE (name);


--
-- Name: Interests Interests_name_key128; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key128" UNIQUE (name);


--
-- Name: Interests Interests_name_key129; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key129" UNIQUE (name);


--
-- Name: Interests Interests_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key13" UNIQUE (name);


--
-- Name: Interests Interests_name_key130; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key130" UNIQUE (name);


--
-- Name: Interests Interests_name_key131; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key131" UNIQUE (name);


--
-- Name: Interests Interests_name_key132; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key132" UNIQUE (name);


--
-- Name: Interests Interests_name_key133; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key133" UNIQUE (name);


--
-- Name: Interests Interests_name_key134; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key134" UNIQUE (name);


--
-- Name: Interests Interests_name_key135; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key135" UNIQUE (name);


--
-- Name: Interests Interests_name_key136; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key136" UNIQUE (name);


--
-- Name: Interests Interests_name_key137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key137" UNIQUE (name);


--
-- Name: Interests Interests_name_key138; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key138" UNIQUE (name);


--
-- Name: Interests Interests_name_key139; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key139" UNIQUE (name);


--
-- Name: Interests Interests_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key14" UNIQUE (name);


--
-- Name: Interests Interests_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key15" UNIQUE (name);


--
-- Name: Interests Interests_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key16" UNIQUE (name);


--
-- Name: Interests Interests_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key17" UNIQUE (name);


--
-- Name: Interests Interests_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key18" UNIQUE (name);


--
-- Name: Interests Interests_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key19" UNIQUE (name);


--
-- Name: Interests Interests_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key2" UNIQUE (name);


--
-- Name: Interests Interests_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key20" UNIQUE (name);


--
-- Name: Interests Interests_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key21" UNIQUE (name);


--
-- Name: Interests Interests_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key22" UNIQUE (name);


--
-- Name: Interests Interests_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key23" UNIQUE (name);


--
-- Name: Interests Interests_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key24" UNIQUE (name);


--
-- Name: Interests Interests_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key25" UNIQUE (name);


--
-- Name: Interests Interests_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key26" UNIQUE (name);


--
-- Name: Interests Interests_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key27" UNIQUE (name);


--
-- Name: Interests Interests_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key28" UNIQUE (name);


--
-- Name: Interests Interests_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key29" UNIQUE (name);


--
-- Name: Interests Interests_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key3" UNIQUE (name);


--
-- Name: Interests Interests_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key30" UNIQUE (name);


--
-- Name: Interests Interests_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key31" UNIQUE (name);


--
-- Name: Interests Interests_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key32" UNIQUE (name);


--
-- Name: Interests Interests_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key33" UNIQUE (name);


--
-- Name: Interests Interests_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key34" UNIQUE (name);


--
-- Name: Interests Interests_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key35" UNIQUE (name);


--
-- Name: Interests Interests_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key36" UNIQUE (name);


--
-- Name: Interests Interests_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key37" UNIQUE (name);


--
-- Name: Interests Interests_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key38" UNIQUE (name);


--
-- Name: Interests Interests_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key39" UNIQUE (name);


--
-- Name: Interests Interests_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key4" UNIQUE (name);


--
-- Name: Interests Interests_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key40" UNIQUE (name);


--
-- Name: Interests Interests_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key41" UNIQUE (name);


--
-- Name: Interests Interests_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key42" UNIQUE (name);


--
-- Name: Interests Interests_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key43" UNIQUE (name);


--
-- Name: Interests Interests_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key44" UNIQUE (name);


--
-- Name: Interests Interests_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key45" UNIQUE (name);


--
-- Name: Interests Interests_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key46" UNIQUE (name);


--
-- Name: Interests Interests_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key47" UNIQUE (name);


--
-- Name: Interests Interests_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key48" UNIQUE (name);


--
-- Name: Interests Interests_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key49" UNIQUE (name);


--
-- Name: Interests Interests_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key5" UNIQUE (name);


--
-- Name: Interests Interests_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key50" UNIQUE (name);


--
-- Name: Interests Interests_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key51" UNIQUE (name);


--
-- Name: Interests Interests_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key52" UNIQUE (name);


--
-- Name: Interests Interests_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key53" UNIQUE (name);


--
-- Name: Interests Interests_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key54" UNIQUE (name);


--
-- Name: Interests Interests_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key55" UNIQUE (name);


--
-- Name: Interests Interests_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key56" UNIQUE (name);


--
-- Name: Interests Interests_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key57" UNIQUE (name);


--
-- Name: Interests Interests_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key58" UNIQUE (name);


--
-- Name: Interests Interests_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key59" UNIQUE (name);


--
-- Name: Interests Interests_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key6" UNIQUE (name);


--
-- Name: Interests Interests_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key60" UNIQUE (name);


--
-- Name: Interests Interests_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key61" UNIQUE (name);


--
-- Name: Interests Interests_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key62" UNIQUE (name);


--
-- Name: Interests Interests_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key63" UNIQUE (name);


--
-- Name: Interests Interests_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key64" UNIQUE (name);


--
-- Name: Interests Interests_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key65" UNIQUE (name);


--
-- Name: Interests Interests_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key66" UNIQUE (name);


--
-- Name: Interests Interests_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key67" UNIQUE (name);


--
-- Name: Interests Interests_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key68" UNIQUE (name);


--
-- Name: Interests Interests_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key69" UNIQUE (name);


--
-- Name: Interests Interests_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key7" UNIQUE (name);


--
-- Name: Interests Interests_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key70" UNIQUE (name);


--
-- Name: Interests Interests_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key71" UNIQUE (name);


--
-- Name: Interests Interests_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key72" UNIQUE (name);


--
-- Name: Interests Interests_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key73" UNIQUE (name);


--
-- Name: Interests Interests_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key74" UNIQUE (name);


--
-- Name: Interests Interests_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key75" UNIQUE (name);


--
-- Name: Interests Interests_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key76" UNIQUE (name);


--
-- Name: Interests Interests_name_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key77" UNIQUE (name);


--
-- Name: Interests Interests_name_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key78" UNIQUE (name);


--
-- Name: Interests Interests_name_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key79" UNIQUE (name);


--
-- Name: Interests Interests_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key8" UNIQUE (name);


--
-- Name: Interests Interests_name_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key80" UNIQUE (name);


--
-- Name: Interests Interests_name_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key81" UNIQUE (name);


--
-- Name: Interests Interests_name_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key82" UNIQUE (name);


--
-- Name: Interests Interests_name_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key83" UNIQUE (name);


--
-- Name: Interests Interests_name_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key84" UNIQUE (name);


--
-- Name: Interests Interests_name_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key85" UNIQUE (name);


--
-- Name: Interests Interests_name_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key86" UNIQUE (name);


--
-- Name: Interests Interests_name_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key87" UNIQUE (name);


--
-- Name: Interests Interests_name_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key88" UNIQUE (name);


--
-- Name: Interests Interests_name_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key89" UNIQUE (name);


--
-- Name: Interests Interests_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key9" UNIQUE (name);


--
-- Name: Interests Interests_name_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key90" UNIQUE (name);


--
-- Name: Interests Interests_name_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key91" UNIQUE (name);


--
-- Name: Interests Interests_name_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key92" UNIQUE (name);


--
-- Name: Interests Interests_name_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key93" UNIQUE (name);


--
-- Name: Interests Interests_name_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key94" UNIQUE (name);


--
-- Name: Interests Interests_name_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key95" UNIQUE (name);


--
-- Name: Interests Interests_name_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key96" UNIQUE (name);


--
-- Name: Interests Interests_name_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key97" UNIQUE (name);


--
-- Name: Interests Interests_name_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key98" UNIQUE (name);


--
-- Name: Interests Interests_name_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_name_key99" UNIQUE (name);


--
-- Name: Interests Interests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interests"
    ADD CONSTRAINT "Interests_pkey" PRIMARY KEY (id);


--
-- Name: Likes Likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY (id);


--
-- Name: Media Media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (id);


--
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);


--
-- Name: NotificationSettings NotificationSettings_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key1" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key10" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key11" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key12" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key13" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key14" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key15" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key16" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key17" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key18" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key19" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key2" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key20" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key21" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key22" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key23" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key24" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key25" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key26" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key27" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key28" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key29" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key3" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key30" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key31" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key32" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key33" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key4" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key5" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key6" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key7" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key8" UNIQUE ("userId");


--
-- Name: NotificationSettings NotificationSettings_userId_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NotificationSettings"
    ADD CONSTRAINT "NotificationSettings_userId_key9" UNIQUE ("userId");


--
-- Name: PostReports PostReports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PostReports"
    ADD CONSTRAINT "PostReports_pkey" PRIMARY KEY (id);


--
-- Name: Posts Posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_pkey" PRIMARY KEY (id);


--
-- Name: ReelBookmarks ReelBookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReelBookmarks"
    ADD CONSTRAINT "ReelBookmarks_pkey" PRIMARY KEY (id);


--
-- Name: ReelLikes ReelLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReelLikes"
    ADD CONSTRAINT "ReelLikes_pkey" PRIMARY KEY (id);


--
-- Name: ReelReports ReelReports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReelReports"
    ADD CONSTRAINT "ReelReports_pkey" PRIMARY KEY (id);


--
-- Name: Reels Reels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reels"
    ADD CONSTRAINT "Reels_pkey" PRIMARY KEY (id);


--
-- Name: Reviews Reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (id);


--
-- Name: Roles Roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key" UNIQUE (name);


--
-- Name: Roles Roles_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key1" UNIQUE (name);


--
-- Name: Roles Roles_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key10" UNIQUE (name);


--
-- Name: Roles Roles_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key11" UNIQUE (name);


--
-- Name: Roles Roles_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key12" UNIQUE (name);


--
-- Name: Roles Roles_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key13" UNIQUE (name);


--
-- Name: Roles Roles_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key14" UNIQUE (name);


--
-- Name: Roles Roles_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key15" UNIQUE (name);


--
-- Name: Roles Roles_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key16" UNIQUE (name);


--
-- Name: Roles Roles_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key17" UNIQUE (name);


--
-- Name: Roles Roles_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key18" UNIQUE (name);


--
-- Name: Roles Roles_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key19" UNIQUE (name);


--
-- Name: Roles Roles_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key2" UNIQUE (name);


--
-- Name: Roles Roles_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key20" UNIQUE (name);


--
-- Name: Roles Roles_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key21" UNIQUE (name);


--
-- Name: Roles Roles_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key22" UNIQUE (name);


--
-- Name: Roles Roles_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key23" UNIQUE (name);


--
-- Name: Roles Roles_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key24" UNIQUE (name);


--
-- Name: Roles Roles_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key25" UNIQUE (name);


--
-- Name: Roles Roles_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key26" UNIQUE (name);


--
-- Name: Roles Roles_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key27" UNIQUE (name);


--
-- Name: Roles Roles_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key28" UNIQUE (name);


--
-- Name: Roles Roles_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key29" UNIQUE (name);


--
-- Name: Roles Roles_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key3" UNIQUE (name);


--
-- Name: Roles Roles_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key30" UNIQUE (name);


--
-- Name: Roles Roles_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key31" UNIQUE (name);


--
-- Name: Roles Roles_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key32" UNIQUE (name);


--
-- Name: Roles Roles_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key33" UNIQUE (name);


--
-- Name: Roles Roles_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key34" UNIQUE (name);


--
-- Name: Roles Roles_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key35" UNIQUE (name);


--
-- Name: Roles Roles_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key36" UNIQUE (name);


--
-- Name: Roles Roles_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key37" UNIQUE (name);


--
-- Name: Roles Roles_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key38" UNIQUE (name);


--
-- Name: Roles Roles_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key39" UNIQUE (name);


--
-- Name: Roles Roles_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key4" UNIQUE (name);


--
-- Name: Roles Roles_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key40" UNIQUE (name);


--
-- Name: Roles Roles_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key41" UNIQUE (name);


--
-- Name: Roles Roles_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key42" UNIQUE (name);


--
-- Name: Roles Roles_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key43" UNIQUE (name);


--
-- Name: Roles Roles_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key44" UNIQUE (name);


--
-- Name: Roles Roles_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key45" UNIQUE (name);


--
-- Name: Roles Roles_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key46" UNIQUE (name);


--
-- Name: Roles Roles_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key47" UNIQUE (name);


--
-- Name: Roles Roles_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key48" UNIQUE (name);


--
-- Name: Roles Roles_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key49" UNIQUE (name);


--
-- Name: Roles Roles_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key5" UNIQUE (name);


--
-- Name: Roles Roles_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key50" UNIQUE (name);


--
-- Name: Roles Roles_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key51" UNIQUE (name);


--
-- Name: Roles Roles_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key52" UNIQUE (name);


--
-- Name: Roles Roles_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key53" UNIQUE (name);


--
-- Name: Roles Roles_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key54" UNIQUE (name);


--
-- Name: Roles Roles_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key55" UNIQUE (name);


--
-- Name: Roles Roles_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key56" UNIQUE (name);


--
-- Name: Roles Roles_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key57" UNIQUE (name);


--
-- Name: Roles Roles_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key58" UNIQUE (name);


--
-- Name: Roles Roles_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key59" UNIQUE (name);


--
-- Name: Roles Roles_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key6" UNIQUE (name);


--
-- Name: Roles Roles_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key60" UNIQUE (name);


--
-- Name: Roles Roles_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key61" UNIQUE (name);


--
-- Name: Roles Roles_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key62" UNIQUE (name);


--
-- Name: Roles Roles_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key63" UNIQUE (name);


--
-- Name: Roles Roles_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key64" UNIQUE (name);


--
-- Name: Roles Roles_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key65" UNIQUE (name);


--
-- Name: Roles Roles_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key66" UNIQUE (name);


--
-- Name: Roles Roles_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key67" UNIQUE (name);


--
-- Name: Roles Roles_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key68" UNIQUE (name);


--
-- Name: Roles Roles_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key69" UNIQUE (name);


--
-- Name: Roles Roles_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key7" UNIQUE (name);


--
-- Name: Roles Roles_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key70" UNIQUE (name);


--
-- Name: Roles Roles_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key71" UNIQUE (name);


--
-- Name: Roles Roles_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key72" UNIQUE (name);


--
-- Name: Roles Roles_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key73" UNIQUE (name);


--
-- Name: Roles Roles_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key74" UNIQUE (name);


--
-- Name: Roles Roles_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key75" UNIQUE (name);


--
-- Name: Roles Roles_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key76" UNIQUE (name);


--
-- Name: Roles Roles_name_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key77" UNIQUE (name);


--
-- Name: Roles Roles_name_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key78" UNIQUE (name);


--
-- Name: Roles Roles_name_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key79" UNIQUE (name);


--
-- Name: Roles Roles_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key8" UNIQUE (name);


--
-- Name: Roles Roles_name_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key80" UNIQUE (name);


--
-- Name: Roles Roles_name_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key81" UNIQUE (name);


--
-- Name: Roles Roles_name_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key82" UNIQUE (name);


--
-- Name: Roles Roles_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key9" UNIQUE (name);


--
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: SavedPosts SavedPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedPosts"
    ADD CONSTRAINT "SavedPosts_pkey" PRIMARY KEY (id);


--
-- Name: SearchIndices SearchIndices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SearchIndices"
    ADD CONSTRAINT "SearchIndices_pkey" PRIMARY KEY (id);


--
-- Name: Stories Stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stories"
    ADD CONSTRAINT "Stories_pkey" PRIMARY KEY (id);


--
-- Name: StoryReplies StoryReplies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoryReplies"
    ADD CONSTRAINT "StoryReplies_pkey" PRIMARY KEY (id);


--
-- Name: StoryReports StoryReports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoryReports"
    ADD CONSTRAINT "StoryReports_pkey" PRIMARY KEY (id);


--
-- Name: StoryViews StoryViews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoryViews"
    ADD CONSTRAINT "StoryViews_pkey" PRIMARY KEY (id);


--
-- Name: UserInterests UserInterests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserInterests"
    ADD CONSTRAINT "UserInterests_pkey" PRIMARY KEY ("userId", "interestId");


--
-- Name: UserOnboardingEvents UserOnboardingEvents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserOnboardingEvents"
    ADD CONSTRAINT "UserOnboardingEvents_pkey" PRIMARY KEY (id);


--
-- Name: UserProfiles UserProfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_pkey" PRIMARY KEY (id);


--
-- Name: UserProfiles UserProfiles_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key1" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key10" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key100" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key101" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key102" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key103" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key104" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key105" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key106" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key107" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key108" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key109" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key11" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key110" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key111" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key112" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key113" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key114" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key115" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key116" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key117" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key118" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key119; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key119" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key12" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key120; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key120" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key121; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key121" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key122" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key123; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key123" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key124" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key125; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key125" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key126; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key126" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key127; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key127" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key128; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key128" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key129; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key129" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key13" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key130; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key130" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key131; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key131" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key132; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key132" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key133; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key133" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key134; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key134" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key135; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key135" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key136; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key136" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key137" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key138; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key138" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key139; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key139" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key14" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key140; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key140" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key141" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key142; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key142" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key143; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key143" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key144; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key144" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key145; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key145" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key146; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key146" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key147; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key147" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key148; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key148" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key149; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key149" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key15" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key150; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key150" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key151; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key151" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key152; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key152" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key153; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key153" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key154; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key154" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key155; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key155" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key156; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key156" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key157; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key157" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key158; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key158" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key159; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key159" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key16" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key160; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key160" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key161; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key161" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key162; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key162" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key163; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key163" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key164; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key164" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key165; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key165" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key166; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key166" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key167; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key167" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key168; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key168" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key169; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key169" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key17" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key170; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key170" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key171; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key171" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key172; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key172" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key173; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key173" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key174; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key174" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key175; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key175" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key176; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key176" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key177; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key177" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key178; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key178" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key179; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key179" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key18" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key180; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key180" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key181; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key181" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key182; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key182" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key183; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key183" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key184; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key184" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key185; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key185" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key186; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key186" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key187; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key187" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key188; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key188" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key189; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key189" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key19" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key190; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key190" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key191; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key191" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key192; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key192" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key193; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key193" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key194; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key194" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key195; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key195" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key196; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key196" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key197; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key197" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key198; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key198" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key199; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key199" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key2" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key20" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key200; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key200" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key201; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key201" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key202; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key202" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key203; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key203" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key204; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key204" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key205; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key205" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key206" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key207; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key207" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key208; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key208" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key209; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key209" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key21" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key210; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key210" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key211; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key211" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key212; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key212" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key213; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key213" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key214; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key214" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key215; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key215" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key22" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key23" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key24" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key25" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key26" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key27" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key28" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key29" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key3" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key30" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key31" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key32" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key33" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key34" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key35" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key36" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key37" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key38" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key39" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key4" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key40" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key41" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key42" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key43" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key44" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key45" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key46" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key47" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key48" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key49" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key5" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key50" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key51" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key52" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key53" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key54" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key55" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key56" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key57" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key58" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key59" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key6" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key60" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key61" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key62" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key63" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key64" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key65" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key66" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key67" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key68" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key69" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key7" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key70" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key71" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key72" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key73" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key74" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key75" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key76" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key77" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key78" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key79" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key8" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key80" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key81" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key82" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key83" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key84" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key85" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key86" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key87" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key88" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key89" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key9" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key90" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key91" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key92" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key93" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key94" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key95" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key96" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key97" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key98" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_userId_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_userId_key99" UNIQUE ("userId");


--
-- Name: UserProfiles UserProfiles_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key1" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key10" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key100" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key101" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key102" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key103" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key104" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key105" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key106" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key107" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key108" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key109" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key11" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key110" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key111; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key111" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key112; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key112" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key113; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key113" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key114; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key114" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key115; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key115" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key116; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key116" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key117; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key117" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key118" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key119; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key119" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key12" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key120; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key120" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key121; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key121" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key122; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key122" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key123; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key123" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key124" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key125; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key125" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key126; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key126" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key127; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key127" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key128; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key128" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key129; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key129" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key13" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key130; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key130" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key131; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key131" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key132; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key132" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key133; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key133" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key134; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key134" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key135; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key135" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key136; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key136" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key137" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key138; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key138" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key139; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key139" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key14" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key140; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key140" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key141" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key142; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key142" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key143; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key143" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key144; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key144" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key145; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key145" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key146; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key146" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key147; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key147" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key148; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key148" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key149; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key149" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key15" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key150; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key150" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key151; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key151" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key152; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key152" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key153; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key153" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key154; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key154" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key155; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key155" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key156; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key156" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key157; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key157" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key158; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key158" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key159; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key159" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key16" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key160; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key160" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key161; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key161" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key162; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key162" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key163; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key163" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key164; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key164" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key165; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key165" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key166; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key166" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key167; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key167" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key168; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key168" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key169; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key169" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key17" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key170; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key170" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key171; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key171" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key172; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key172" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key173; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key173" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key174; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key174" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key175; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key175" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key176; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key176" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key177; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key177" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key178; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key178" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key179; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key179" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key18" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key180; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key180" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key181; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key181" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key182; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key182" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key183; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key183" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key184; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key184" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key185; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key185" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key186; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key186" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key187; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key187" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key188; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key188" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key189; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key189" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key19" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key190; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key190" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key191; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key191" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key192; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key192" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key193; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key193" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key194; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key194" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key195; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key195" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key196; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key196" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key197; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key197" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key198; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key198" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key199; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key199" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key2" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key20" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key200; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key200" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key201; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key201" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key202; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key202" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key203; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key203" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key204; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key204" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key205; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key205" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key206" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key207; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key207" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key208; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key208" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key209; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key209" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key21" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key210; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key210" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key211; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key211" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key212; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key212" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key213; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key213" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key214; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key214" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key215; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key215" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key22" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key23" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key24" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key25" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key26" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key27" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key28" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key29" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key3" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key30" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key31" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key32" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key33" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key34" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key35" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key36" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key37" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key38" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key39" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key4" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key40" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key41" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key42" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key43" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key44" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key45" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key46" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key47" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key48" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key49" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key5" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key50" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key51" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key52" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key53" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key54" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key55" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key56" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key57" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key58" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key59" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key6" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key60" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key61" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key62" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key63" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key64" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key65" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key66" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key67" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key68" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key69" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key7" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key70" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key71" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key72" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key73" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key74" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key75" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key76" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key77" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key78" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key79" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key8" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key80" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key81" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key82" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key83" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key84" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key85" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key86" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key87" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key88" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key89" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key9" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key90" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key91" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key92" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key93" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key94" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key95" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key96" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key97" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key98" UNIQUE (username);


--
-- Name: UserProfiles UserProfiles_username_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfiles"
    ADD CONSTRAINT "UserProfiles_username_key99" UNIQUE (username);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key1" UNIQUE (email);


--
-- Name: Users Users_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key10" UNIQUE (email);


--
-- Name: Users Users_email_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key100" UNIQUE (email);


--
-- Name: Users Users_email_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key101" UNIQUE (email);


--
-- Name: Users Users_email_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key102" UNIQUE (email);


--
-- Name: Users Users_email_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key103" UNIQUE (email);


--
-- Name: Users Users_email_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key104" UNIQUE (email);


--
-- Name: Users Users_email_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key105" UNIQUE (email);


--
-- Name: Users Users_email_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key106" UNIQUE (email);


--
-- Name: Users Users_email_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key107" UNIQUE (email);


--
-- Name: Users Users_email_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key108" UNIQUE (email);


--
-- Name: Users Users_email_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key109" UNIQUE (email);


--
-- Name: Users Users_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key11" UNIQUE (email);


--
-- Name: Users Users_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key12" UNIQUE (email);


--
-- Name: Users Users_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key13" UNIQUE (email);


--
-- Name: Users Users_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key14" UNIQUE (email);


--
-- Name: Users Users_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key15" UNIQUE (email);


--
-- Name: Users Users_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key16" UNIQUE (email);


--
-- Name: Users Users_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key17" UNIQUE (email);


--
-- Name: Users Users_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key18" UNIQUE (email);


--
-- Name: Users Users_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key19" UNIQUE (email);


--
-- Name: Users Users_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key2" UNIQUE (email);


--
-- Name: Users Users_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key20" UNIQUE (email);


--
-- Name: Users Users_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key21" UNIQUE (email);


--
-- Name: Users Users_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key22" UNIQUE (email);


--
-- Name: Users Users_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key23" UNIQUE (email);


--
-- Name: Users Users_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key24" UNIQUE (email);


--
-- Name: Users Users_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key25" UNIQUE (email);


--
-- Name: Users Users_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key26" UNIQUE (email);


--
-- Name: Users Users_email_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key27" UNIQUE (email);


--
-- Name: Users Users_email_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key28" UNIQUE (email);


--
-- Name: Users Users_email_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key29" UNIQUE (email);


--
-- Name: Users Users_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key3" UNIQUE (email);


--
-- Name: Users Users_email_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key30" UNIQUE (email);


--
-- Name: Users Users_email_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key31" UNIQUE (email);


--
-- Name: Users Users_email_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key32" UNIQUE (email);


--
-- Name: Users Users_email_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key33" UNIQUE (email);


--
-- Name: Users Users_email_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key34" UNIQUE (email);


--
-- Name: Users Users_email_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key35" UNIQUE (email);


--
-- Name: Users Users_email_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key36" UNIQUE (email);


--
-- Name: Users Users_email_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key37" UNIQUE (email);


--
-- Name: Users Users_email_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key38" UNIQUE (email);


--
-- Name: Users Users_email_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key39" UNIQUE (email);


--
-- Name: Users Users_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key4" UNIQUE (email);


--
-- Name: Users Users_email_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key40" UNIQUE (email);


--
-- Name: Users Users_email_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key41" UNIQUE (email);


--
-- Name: Users Users_email_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key42" UNIQUE (email);


--
-- Name: Users Users_email_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key43" UNIQUE (email);


--
-- Name: Users Users_email_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key44" UNIQUE (email);


--
-- Name: Users Users_email_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key45" UNIQUE (email);


--
-- Name: Users Users_email_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key46" UNIQUE (email);


--
-- Name: Users Users_email_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key47" UNIQUE (email);


--
-- Name: Users Users_email_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key48" UNIQUE (email);


--
-- Name: Users Users_email_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key49" UNIQUE (email);


--
-- Name: Users Users_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key5" UNIQUE (email);


--
-- Name: Users Users_email_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key50" UNIQUE (email);


--
-- Name: Users Users_email_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key51" UNIQUE (email);


--
-- Name: Users Users_email_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key52" UNIQUE (email);


--
-- Name: Users Users_email_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key53" UNIQUE (email);


--
-- Name: Users Users_email_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key54" UNIQUE (email);


--
-- Name: Users Users_email_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key55" UNIQUE (email);


--
-- Name: Users Users_email_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key56" UNIQUE (email);


--
-- Name: Users Users_email_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key57" UNIQUE (email);


--
-- Name: Users Users_email_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key58" UNIQUE (email);


--
-- Name: Users Users_email_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key59" UNIQUE (email);


--
-- Name: Users Users_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key6" UNIQUE (email);


--
-- Name: Users Users_email_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key60" UNIQUE (email);


--
-- Name: Users Users_email_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key61" UNIQUE (email);


--
-- Name: Users Users_email_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key62" UNIQUE (email);


--
-- Name: Users Users_email_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key63" UNIQUE (email);


--
-- Name: Users Users_email_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key64" UNIQUE (email);


--
-- Name: Users Users_email_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key65" UNIQUE (email);


--
-- Name: Users Users_email_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key66" UNIQUE (email);


--
-- Name: Users Users_email_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key67" UNIQUE (email);


--
-- Name: Users Users_email_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key68" UNIQUE (email);


--
-- Name: Users Users_email_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key69" UNIQUE (email);


--
-- Name: Users Users_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key7" UNIQUE (email);


--
-- Name: Users Users_email_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key70" UNIQUE (email);


--
-- Name: Users Users_email_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key71" UNIQUE (email);


--
-- Name: Users Users_email_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key72" UNIQUE (email);


--
-- Name: Users Users_email_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key73" UNIQUE (email);


--
-- Name: Users Users_email_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key74" UNIQUE (email);


--
-- Name: Users Users_email_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key75" UNIQUE (email);


--
-- Name: Users Users_email_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key76" UNIQUE (email);


--
-- Name: Users Users_email_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key77" UNIQUE (email);


--
-- Name: Users Users_email_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key78" UNIQUE (email);


--
-- Name: Users Users_email_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key79" UNIQUE (email);


--
-- Name: Users Users_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key8" UNIQUE (email);


--
-- Name: Users Users_email_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key80" UNIQUE (email);


--
-- Name: Users Users_email_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key81" UNIQUE (email);


--
-- Name: Users Users_email_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key82" UNIQUE (email);


--
-- Name: Users Users_email_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key83" UNIQUE (email);


--
-- Name: Users Users_email_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key84" UNIQUE (email);


--
-- Name: Users Users_email_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key85" UNIQUE (email);


--
-- Name: Users Users_email_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key86" UNIQUE (email);


--
-- Name: Users Users_email_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key87" UNIQUE (email);


--
-- Name: Users Users_email_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key88" UNIQUE (email);


--
-- Name: Users Users_email_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key89" UNIQUE (email);


--
-- Name: Users Users_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key9" UNIQUE (email);


--
-- Name: Users Users_email_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key90" UNIQUE (email);


--
-- Name: Users Users_email_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key91" UNIQUE (email);


--
-- Name: Users Users_email_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key92" UNIQUE (email);


--
-- Name: Users Users_email_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key93" UNIQUE (email);


--
-- Name: Users Users_email_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key94" UNIQUE (email);


--
-- Name: Users Users_email_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key95" UNIQUE (email);


--
-- Name: Users Users_email_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key96" UNIQUE (email);


--
-- Name: Users Users_email_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key97" UNIQUE (email);


--
-- Name: Users Users_email_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key98" UNIQUE (email);


--
-- Name: Users Users_email_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key99" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Users Users_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key1" UNIQUE (username);


--
-- Name: Users Users_username_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key10" UNIQUE (username);


--
-- Name: Users Users_username_key100; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key100" UNIQUE (username);


--
-- Name: Users Users_username_key101; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key101" UNIQUE (username);


--
-- Name: Users Users_username_key102; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key102" UNIQUE (username);


--
-- Name: Users Users_username_key103; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key103" UNIQUE (username);


--
-- Name: Users Users_username_key104; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key104" UNIQUE (username);


--
-- Name: Users Users_username_key105; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key105" UNIQUE (username);


--
-- Name: Users Users_username_key106; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key106" UNIQUE (username);


--
-- Name: Users Users_username_key107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key107" UNIQUE (username);


--
-- Name: Users Users_username_key108; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key108" UNIQUE (username);


--
-- Name: Users Users_username_key109; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key109" UNIQUE (username);


--
-- Name: Users Users_username_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key11" UNIQUE (username);


--
-- Name: Users Users_username_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key12" UNIQUE (username);


--
-- Name: Users Users_username_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key13" UNIQUE (username);


--
-- Name: Users Users_username_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key14" UNIQUE (username);


--
-- Name: Users Users_username_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key15" UNIQUE (username);


--
-- Name: Users Users_username_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key16" UNIQUE (username);


--
-- Name: Users Users_username_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key17" UNIQUE (username);


--
-- Name: Users Users_username_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key18" UNIQUE (username);


--
-- Name: Users Users_username_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key19" UNIQUE (username);


--
-- Name: Users Users_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key2" UNIQUE (username);


--
-- Name: Users Users_username_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key20" UNIQUE (username);


--
-- Name: Users Users_username_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key21" UNIQUE (username);


--
-- Name: Users Users_username_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key22" UNIQUE (username);


--
-- Name: Users Users_username_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key23" UNIQUE (username);


--
-- Name: Users Users_username_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key24" UNIQUE (username);


--
-- Name: Users Users_username_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key25" UNIQUE (username);


--
-- Name: Users Users_username_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key26" UNIQUE (username);


--
-- Name: Users Users_username_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key27" UNIQUE (username);


--
-- Name: Users Users_username_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key28" UNIQUE (username);


--
-- Name: Users Users_username_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key29" UNIQUE (username);


--
-- Name: Users Users_username_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key3" UNIQUE (username);


--
-- Name: Users Users_username_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key30" UNIQUE (username);


--
-- Name: Users Users_username_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key31" UNIQUE (username);


--
-- Name: Users Users_username_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key32" UNIQUE (username);


--
-- Name: Users Users_username_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key33" UNIQUE (username);


--
-- Name: Users Users_username_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key34" UNIQUE (username);


--
-- Name: Users Users_username_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key35" UNIQUE (username);


--
-- Name: Users Users_username_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key36" UNIQUE (username);


--
-- Name: Users Users_username_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key37" UNIQUE (username);


--
-- Name: Users Users_username_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key38" UNIQUE (username);


--
-- Name: Users Users_username_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key39" UNIQUE (username);


--
-- Name: Users Users_username_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key4" UNIQUE (username);


--
-- Name: Users Users_username_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key40" UNIQUE (username);


--
-- Name: Users Users_username_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key41" UNIQUE (username);


--
-- Name: Users Users_username_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key42" UNIQUE (username);


--
-- Name: Users Users_username_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key43" UNIQUE (username);


--
-- Name: Users Users_username_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key44" UNIQUE (username);


--
-- Name: Users Users_username_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key45" UNIQUE (username);


--
-- Name: Users Users_username_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key46" UNIQUE (username);


--
-- Name: Users Users_username_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key47" UNIQUE (username);


--
-- Name: Users Users_username_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key48" UNIQUE (username);


--
-- Name: Users Users_username_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key49" UNIQUE (username);


--
-- Name: Users Users_username_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key5" UNIQUE (username);


--
-- Name: Users Users_username_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key50" UNIQUE (username);


--
-- Name: Users Users_username_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key51" UNIQUE (username);


--
-- Name: Users Users_username_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key52" UNIQUE (username);


--
-- Name: Users Users_username_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key53" UNIQUE (username);


--
-- Name: Users Users_username_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key54" UNIQUE (username);


--
-- Name: Users Users_username_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key55" UNIQUE (username);


--
-- Name: Users Users_username_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key56" UNIQUE (username);


--
-- Name: Users Users_username_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key57" UNIQUE (username);


--
-- Name: Users Users_username_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key58" UNIQUE (username);


--
-- Name: Users Users_username_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key59" UNIQUE (username);


--
-- Name: Users Users_username_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key6" UNIQUE (username);


--
-- Name: Users Users_username_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key60" UNIQUE (username);


--
-- Name: Users Users_username_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key61" UNIQUE (username);


--
-- Name: Users Users_username_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key62" UNIQUE (username);


--
-- Name: Users Users_username_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key63" UNIQUE (username);


--
-- Name: Users Users_username_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key64" UNIQUE (username);


--
-- Name: Users Users_username_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key65" UNIQUE (username);


--
-- Name: Users Users_username_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key66" UNIQUE (username);


--
-- Name: Users Users_username_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key67" UNIQUE (username);


--
-- Name: Users Users_username_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key68" UNIQUE (username);


--
-- Name: Users Users_username_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key69" UNIQUE (username);


--
-- Name: Users Users_username_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key7" UNIQUE (username);


--
-- Name: Users Users_username_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key70" UNIQUE (username);


--
-- Name: Users Users_username_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key71" UNIQUE (username);


--
-- Name: Users Users_username_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key72" UNIQUE (username);


--
-- Name: Users Users_username_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key73" UNIQUE (username);


--
-- Name: Users Users_username_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key74" UNIQUE (username);


--
-- Name: Users Users_username_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key75" UNIQUE (username);


--
-- Name: Users Users_username_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key76" UNIQUE (username);


--
-- Name: Users Users_username_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key77" UNIQUE (username);


--
-- Name: Users Users_username_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key78" UNIQUE (username);


--
-- Name: Users Users_username_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key79" UNIQUE (username);


--
-- Name: Users Users_username_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key8" UNIQUE (username);


--
-- Name: Users Users_username_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key80" UNIQUE (username);


--
-- Name: Users Users_username_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key81" UNIQUE (username);


--
-- Name: Users Users_username_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key82" UNIQUE (username);


--
-- Name: Users Users_username_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key83" UNIQUE (username);


--
-- Name: Users Users_username_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key84" UNIQUE (username);


--
-- Name: Users Users_username_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key85" UNIQUE (username);


--
-- Name: Users Users_username_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key86" UNIQUE (username);


--
-- Name: Users Users_username_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key87" UNIQUE (username);


--
-- Name: Users Users_username_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key88" UNIQUE (username);


--
-- Name: Users Users_username_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key89" UNIQUE (username);


--
-- Name: Users Users_username_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key9" UNIQUE (username);


--
-- Name: Users Users_username_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key90" UNIQUE (username);


--
-- Name: Users Users_username_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key91" UNIQUE (username);


--
-- Name: Users Users_username_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key92" UNIQUE (username);


--
-- Name: Users Users_username_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key93" UNIQUE (username);


--
-- Name: Users Users_username_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key94" UNIQUE (username);


--
-- Name: Users Users_username_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key95" UNIQUE (username);


--
-- Name: Users Users_username_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key96" UNIQUE (username);


--
-- Name: Users Users_username_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key97" UNIQUE (username);


--
-- Name: Users Users_username_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key98" UNIQUE (username);


--
-- Name: Users Users_username_key99; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key99" UNIQUE (username);


--
-- Name: account_history account_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_history
    ADD CONSTRAINT account_history_pkey PRIMARY KEY (id);


--
-- Name: account_metrics account_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_metrics
    ADD CONSTRAINT account_metrics_pkey PRIMARY KEY (id);


--
-- Name: account_status account_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_status
    ADD CONSTRAINT account_status_pkey PRIMARY KEY (user_id);


--
-- Name: ad_bookmarks ad_bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_bookmarks
    ADD CONSTRAINT ad_bookmarks_pkey PRIMARY KEY (id);


--
-- Name: ad_budgets ad_budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_budgets
    ADD CONSTRAINT ad_budgets_pkey PRIMARY KEY (id);


--
-- Name: ad_clicks ad_clicks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_clicks
    ADD CONSTRAINT ad_clicks_pkey PRIMARY KEY (id);


--
-- Name: ad_comments ad_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_comments
    ADD CONSTRAINT ad_comments_pkey PRIMARY KEY (id);


--
-- Name: ad_impressions ad_impressions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_impressions
    ADD CONSTRAINT ad_impressions_pkey PRIMARY KEY (id);


--
-- Name: ad_likes ad_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_likes
    ADD CONSTRAINT ad_likes_pkey PRIMARY KEY (id);


--
-- Name: ad_media ad_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_media
    ADD CONSTRAINT ad_media_pkey PRIMARY KEY (id);


--
-- Name: ad_metrics ad_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_metrics
    ADD CONSTRAINT ad_metrics_pkey PRIMARY KEY (id);


--
-- Name: ad_targets ad_targets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_targets
    ADD CONSTRAINT ad_targets_pkey PRIMARY KEY (id);


--
-- Name: admin_audit_logs admin_audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_audit_logs
    ADD CONSTRAINT admin_audit_logs_pkey PRIMARY KEY (id);


--
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- Name: admins admins_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key1 UNIQUE (email);


--
-- Name: admins admins_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key10 UNIQUE (email);


--
-- Name: admins admins_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key11 UNIQUE (email);


--
-- Name: admins admins_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key12 UNIQUE (email);


--
-- Name: admins admins_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key13 UNIQUE (email);


--
-- Name: admins admins_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key14 UNIQUE (email);


--
-- Name: admins admins_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key15 UNIQUE (email);


--
-- Name: admins admins_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key16 UNIQUE (email);


--
-- Name: admins admins_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key17 UNIQUE (email);


--
-- Name: admins admins_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key18 UNIQUE (email);


--
-- Name: admins admins_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key19 UNIQUE (email);


--
-- Name: admins admins_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key2 UNIQUE (email);


--
-- Name: admins admins_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key20 UNIQUE (email);


--
-- Name: admins admins_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key21 UNIQUE (email);


--
-- Name: admins admins_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key22 UNIQUE (email);


--
-- Name: admins admins_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key23 UNIQUE (email);


--
-- Name: admins admins_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key24 UNIQUE (email);


--
-- Name: admins admins_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key25 UNIQUE (email);


--
-- Name: admins admins_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key26 UNIQUE (email);


--
-- Name: admins admins_email_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key27 UNIQUE (email);


--
-- Name: admins admins_email_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key28 UNIQUE (email);


--
-- Name: admins admins_email_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key29 UNIQUE (email);


--
-- Name: admins admins_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key3 UNIQUE (email);


--
-- Name: admins admins_email_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key30 UNIQUE (email);


--
-- Name: admins admins_email_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key31 UNIQUE (email);


--
-- Name: admins admins_email_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key32 UNIQUE (email);


--
-- Name: admins admins_email_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key33 UNIQUE (email);


--
-- Name: admins admins_email_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key34 UNIQUE (email);


--
-- Name: admins admins_email_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key35 UNIQUE (email);


--
-- Name: admins admins_email_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key36 UNIQUE (email);


--
-- Name: admins admins_email_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key37 UNIQUE (email);


--
-- Name: admins admins_email_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key38 UNIQUE (email);


--
-- Name: admins admins_email_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key39 UNIQUE (email);


--
-- Name: admins admins_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key4 UNIQUE (email);


--
-- Name: admins admins_email_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key40 UNIQUE (email);


--
-- Name: admins admins_email_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key41 UNIQUE (email);


--
-- Name: admins admins_email_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key42 UNIQUE (email);


--
-- Name: admins admins_email_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key43 UNIQUE (email);


--
-- Name: admins admins_email_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key44 UNIQUE (email);


--
-- Name: admins admins_email_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key45 UNIQUE (email);


--
-- Name: admins admins_email_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key46 UNIQUE (email);


--
-- Name: admins admins_email_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key47 UNIQUE (email);


--
-- Name: admins admins_email_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key48 UNIQUE (email);


--
-- Name: admins admins_email_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key49 UNIQUE (email);


--
-- Name: admins admins_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key5 UNIQUE (email);


--
-- Name: admins admins_email_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key50 UNIQUE (email);


--
-- Name: admins admins_email_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key51 UNIQUE (email);


--
-- Name: admins admins_email_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key52 UNIQUE (email);


--
-- Name: admins admins_email_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key53 UNIQUE (email);


--
-- Name: admins admins_email_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key54 UNIQUE (email);


--
-- Name: admins admins_email_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key55 UNIQUE (email);


--
-- Name: admins admins_email_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key56 UNIQUE (email);


--
-- Name: admins admins_email_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key57 UNIQUE (email);


--
-- Name: admins admins_email_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key58 UNIQUE (email);


--
-- Name: admins admins_email_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key59 UNIQUE (email);


--
-- Name: admins admins_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key6 UNIQUE (email);


--
-- Name: admins admins_email_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key60 UNIQUE (email);


--
-- Name: admins admins_email_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key61 UNIQUE (email);


--
-- Name: admins admins_email_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key62 UNIQUE (email);


--
-- Name: admins admins_email_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key63 UNIQUE (email);


--
-- Name: admins admins_email_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key64 UNIQUE (email);


--
-- Name: admins admins_email_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key65 UNIQUE (email);


--
-- Name: admins admins_email_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key66 UNIQUE (email);


--
-- Name: admins admins_email_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key67 UNIQUE (email);


--
-- Name: admins admins_email_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key68 UNIQUE (email);


--
-- Name: admins admins_email_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key69 UNIQUE (email);


--
-- Name: admins admins_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key7 UNIQUE (email);


--
-- Name: admins admins_email_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key70 UNIQUE (email);


--
-- Name: admins admins_email_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key71 UNIQUE (email);


--
-- Name: admins admins_email_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key72 UNIQUE (email);


--
-- Name: admins admins_email_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key73 UNIQUE (email);


--
-- Name: admins admins_email_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key74 UNIQUE (email);


--
-- Name: admins admins_email_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key75 UNIQUE (email);


--
-- Name: admins admins_email_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key76 UNIQUE (email);


--
-- Name: admins admins_email_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key77 UNIQUE (email);


--
-- Name: admins admins_email_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key78 UNIQUE (email);


--
-- Name: admins admins_email_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key79 UNIQUE (email);


--
-- Name: admins admins_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key8 UNIQUE (email);


--
-- Name: admins admins_email_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key80 UNIQUE (email);


--
-- Name: admins admins_email_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key81 UNIQUE (email);


--
-- Name: admins admins_email_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key82 UNIQUE (email);


--
-- Name: admins admins_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key9 UNIQUE (email);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- Name: admins admins_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key1 UNIQUE (username);


--
-- Name: admins admins_username_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key10 UNIQUE (username);


--
-- Name: admins admins_username_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key11 UNIQUE (username);


--
-- Name: admins admins_username_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key12 UNIQUE (username);


--
-- Name: admins admins_username_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key13 UNIQUE (username);


--
-- Name: admins admins_username_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key14 UNIQUE (username);


--
-- Name: admins admins_username_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key15 UNIQUE (username);


--
-- Name: admins admins_username_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key16 UNIQUE (username);


--
-- Name: admins admins_username_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key17 UNIQUE (username);


--
-- Name: admins admins_username_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key18 UNIQUE (username);


--
-- Name: admins admins_username_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key19 UNIQUE (username);


--
-- Name: admins admins_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key2 UNIQUE (username);


--
-- Name: admins admins_username_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key20 UNIQUE (username);


--
-- Name: admins admins_username_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key21 UNIQUE (username);


--
-- Name: admins admins_username_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key22 UNIQUE (username);


--
-- Name: admins admins_username_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key23 UNIQUE (username);


--
-- Name: admins admins_username_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key24 UNIQUE (username);


--
-- Name: admins admins_username_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key25 UNIQUE (username);


--
-- Name: admins admins_username_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key26 UNIQUE (username);


--
-- Name: admins admins_username_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key27 UNIQUE (username);


--
-- Name: admins admins_username_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key28 UNIQUE (username);


--
-- Name: admins admins_username_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key29 UNIQUE (username);


--
-- Name: admins admins_username_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key3 UNIQUE (username);


--
-- Name: admins admins_username_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key30 UNIQUE (username);


--
-- Name: admins admins_username_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key31 UNIQUE (username);


--
-- Name: admins admins_username_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key32 UNIQUE (username);


--
-- Name: admins admins_username_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key33 UNIQUE (username);


--
-- Name: admins admins_username_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key34 UNIQUE (username);


--
-- Name: admins admins_username_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key35 UNIQUE (username);


--
-- Name: admins admins_username_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key36 UNIQUE (username);


--
-- Name: admins admins_username_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key37 UNIQUE (username);


--
-- Name: admins admins_username_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key38 UNIQUE (username);


--
-- Name: admins admins_username_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key39 UNIQUE (username);


--
-- Name: admins admins_username_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key4 UNIQUE (username);


--
-- Name: admins admins_username_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key40 UNIQUE (username);


--
-- Name: admins admins_username_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key41 UNIQUE (username);


--
-- Name: admins admins_username_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key42 UNIQUE (username);


--
-- Name: admins admins_username_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key43 UNIQUE (username);


--
-- Name: admins admins_username_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key44 UNIQUE (username);


--
-- Name: admins admins_username_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key45 UNIQUE (username);


--
-- Name: admins admins_username_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key46 UNIQUE (username);


--
-- Name: admins admins_username_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key47 UNIQUE (username);


--
-- Name: admins admins_username_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key48 UNIQUE (username);


--
-- Name: admins admins_username_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key49 UNIQUE (username);


--
-- Name: admins admins_username_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key5 UNIQUE (username);


--
-- Name: admins admins_username_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key50 UNIQUE (username);


--
-- Name: admins admins_username_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key51 UNIQUE (username);


--
-- Name: admins admins_username_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key52 UNIQUE (username);


--
-- Name: admins admins_username_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key53 UNIQUE (username);


--
-- Name: admins admins_username_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key54 UNIQUE (username);


--
-- Name: admins admins_username_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key55 UNIQUE (username);


--
-- Name: admins admins_username_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key56 UNIQUE (username);


--
-- Name: admins admins_username_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key57 UNIQUE (username);


--
-- Name: admins admins_username_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key58 UNIQUE (username);


--
-- Name: admins admins_username_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key59 UNIQUE (username);


--
-- Name: admins admins_username_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key6 UNIQUE (username);


--
-- Name: admins admins_username_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key60 UNIQUE (username);


--
-- Name: admins admins_username_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key61 UNIQUE (username);


--
-- Name: admins admins_username_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key62 UNIQUE (username);


--
-- Name: admins admins_username_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key63 UNIQUE (username);


--
-- Name: admins admins_username_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key64 UNIQUE (username);


--
-- Name: admins admins_username_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key65 UNIQUE (username);


--
-- Name: admins admins_username_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key66 UNIQUE (username);


--
-- Name: admins admins_username_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key67 UNIQUE (username);


--
-- Name: admins admins_username_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key68 UNIQUE (username);


--
-- Name: admins admins_username_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key69 UNIQUE (username);


--
-- Name: admins admins_username_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key7 UNIQUE (username);


--
-- Name: admins admins_username_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key70 UNIQUE (username);


--
-- Name: admins admins_username_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key71 UNIQUE (username);


--
-- Name: admins admins_username_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key72 UNIQUE (username);


--
-- Name: admins admins_username_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key73 UNIQUE (username);


--
-- Name: admins admins_username_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key74 UNIQUE (username);


--
-- Name: admins admins_username_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key75 UNIQUE (username);


--
-- Name: admins admins_username_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key76 UNIQUE (username);


--
-- Name: admins admins_username_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key77 UNIQUE (username);


--
-- Name: admins admins_username_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key78 UNIQUE (username);


--
-- Name: admins admins_username_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key79 UNIQUE (username);


--
-- Name: admins admins_username_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key8 UNIQUE (username);


--
-- Name: admins admins_username_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key80 UNIQUE (username);


--
-- Name: admins admins_username_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key81 UNIQUE (username);


--
-- Name: admins admins_username_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key82 UNIQUE (username);


--
-- Name: admins admins_username_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key9 UNIQUE (username);


--
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- Name: blocked_users blocked_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocked_users
    ADD CONSTRAINT blocked_users_pkey PRIMARY KEY (id);


--
-- Name: boosted_content_references boosted_content_references_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boosted_content_references
    ADD CONSTRAINT boosted_content_references_pkey PRIMARY KEY (id);


--
-- Name: call_logs call_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_logs
    ADD CONSTRAINT call_logs_pkey PRIMARY KEY (id);


--
-- Name: call_sessions call_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_sessions
    ADD CONSTRAINT call_sessions_pkey PRIMARY KEY (id);


--
-- Name: call_sessions call_sessions_room_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_sessions
    ADD CONSTRAINT call_sessions_room_name_key UNIQUE (room_name);


--
-- Name: close_friends close_friends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.close_friends
    ADD CONSTRAINT close_friends_pkey PRIMARY KEY (id);


--
-- Name: connected_apps connected_apps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connected_apps
    ADD CONSTRAINT connected_apps_pkey PRIMARY KEY (id);


--
-- Name: content_metrics content_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_metrics
    ADD CONSTRAINT content_metrics_pkey PRIMARY KEY (id);


--
-- Name: content_preferences content_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_preferences
    ADD CONSTRAINT content_preferences_pkey PRIMARY KEY (user_id);


--
-- Name: dm_moderation_logs dm_moderation_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_moderation_logs
    ADD CONSTRAINT dm_moderation_logs_pkey PRIMARY KEY (id);


--
-- Name: explore_algorithm_config explore_algorithm_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_algorithm_config
    ADD CONSTRAINT explore_algorithm_config_pkey PRIMARY KEY (id);


--
-- Name: explore_trending_topics explore_trending_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_pkey PRIMARY KEY (id);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key1 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key10 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key11 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key12 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key13 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key14 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key15 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key16 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key17 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key18 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key19 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key2 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key20 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key21 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key22 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key23 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key24 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key25 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key26 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key27 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key28 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key29 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key3 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key30 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key31 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key32 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key33 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key34 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key35 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key36 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key37 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key38 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key39 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key4 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key40 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key41 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key42 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key43 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key44 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key45 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key46 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key47 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key48 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key49 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key5 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key50 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key51 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key52 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key53 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key54 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key55 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key56 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key57 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key58 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key59 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key6 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key60 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key61 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key62 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key63 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key64 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key65 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key66 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key67 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key68 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key69 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key7 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key70 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key71 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key72 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key73 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key74 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key75 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key76 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key77 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key78 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key79 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key8 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key80 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key81 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key82 UNIQUE (topic);


--
-- Name: explore_trending_topics explore_trending_topics_topic_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.explore_trending_topics
    ADD CONSTRAINT explore_trending_topics_topic_key9 UNIQUE (topic);


--
-- Name: favorite_accounts favorite_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_accounts
    ADD CONSTRAINT favorite_accounts_pkey PRIMARY KEY (id);


--
-- Name: feature_limits feature_limits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_limits
    ADD CONSTRAINT feature_limits_pkey PRIMARY KEY (id);


--
-- Name: featured_content featured_content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.featured_content
    ADD CONSTRAINT featured_content_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: follower_activity_heatmap follower_activity_heatmap_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follower_activity_heatmap
    ADD CONSTRAINT follower_activity_heatmap_pkey PRIMARY KEY (id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (id);


--
-- Name: hashtag_follows hashtag_follows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtag_follows
    ADD CONSTRAINT hashtag_follows_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- Name: hashtags hashtags_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key1 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key10 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key11 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key12 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key13 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key14 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key15 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key16 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key17 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key18 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key19 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key2 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key20 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key21 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key22 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key23 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key24 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key25 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key26 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key27 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key28 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key29 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key3 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key30 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key31 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key32 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key33 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key34 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key35 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key36 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key37 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key38 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key39 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key4 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key40 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key41 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key42 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key43 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key44 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key45 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key46 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key47 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key48 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key49 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key5 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key50 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key51 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key52 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key53 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key54 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key55 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key56 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key57 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key58 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key59 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key6 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key60 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key61 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key62 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key63 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key64 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key65 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key66 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key67 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key68 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key69 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key7 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key70 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key71 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key72 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key73 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key74 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key75 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key76 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key77 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key78 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key79 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key8 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key80 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key81 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key82 UNIQUE (name);


--
-- Name: hashtags hashtags_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key9 UNIQUE (name);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: help_article_tags help_article_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_article_tags
    ADD CONSTRAINT help_article_tags_pkey PRIMARY KEY (article_id, tag_id);


--
-- Name: help_articles help_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_pkey PRIMARY KEY (id);


--
-- Name: help_articles help_articles_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key1 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key10 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key11 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key12 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key13 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key14 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key15 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key16 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key17 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key18 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key19 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key2 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key20 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key21 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key22 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key23 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key24 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key25 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key26 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key27 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key28 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key29 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key3 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key30 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key31 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key32 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key33 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key34 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key35 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key36 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key37 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key38 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key39 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key4 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key40 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key41 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key42 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key43 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key44 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key45 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key46 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key47 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key48 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key49 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key5 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key50 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key51 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key52 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key53 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key54 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key55 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key56 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key57 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key58 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key59 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key6 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key60 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key61 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key62 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key63 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key64 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key65 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key66 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key67 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key68 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key69 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key7 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key70 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key71 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key8 UNIQUE (slug);


--
-- Name: help_articles help_articles_slug_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_slug_key9 UNIQUE (slug);


--
-- Name: help_categories help_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_pkey PRIMARY KEY (id);


--
-- Name: help_categories help_categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key1 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key10 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key11 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key12 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key13 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key14 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key15 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key16 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key17 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key18 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key19 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key2 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key20 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key21 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key22 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key23 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key24 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key25 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key26 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key27 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key28 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key29 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key3 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key30 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key31 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key32 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key33 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key34 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key35 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key36 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key37 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key38 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key39 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key4 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key40 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key41 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key42 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key43 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key44 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key45 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key46 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key47 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key48 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key49 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key5 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key50 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key51 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key52 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key53 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key54 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key55 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key56 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key57 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key58 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key59 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key6 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key60 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key61 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key62 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key63 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key64 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key65 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key66 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key67 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key68 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key69 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key7 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key70 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key71 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key72 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key8 UNIQUE (slug);


--
-- Name: help_categories help_categories_slug_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_slug_key9 UNIQUE (slug);


--
-- Name: help_tags help_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_pkey PRIMARY KEY (id);


--
-- Name: help_tags help_tags_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key1 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key10 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key11 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key12 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key13 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key14 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key15 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key16 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key17 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key18 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key19 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key2 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key20 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key21 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key22 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key23 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key24 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key25 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key26 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key27 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key28 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key29 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key3 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key30 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key31 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key32 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key33 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key34 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key35 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key36 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key37 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key38 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key39 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key4 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key40 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key41 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key42 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key43 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key44 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key45 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key46 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key47 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key48 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key49 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key5 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key50 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key51 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key52 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key53 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key54 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key55 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key56 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key57 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key58 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key59 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key6 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key60 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key61 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key62 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key63 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key64 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key65 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key66 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key67 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key68 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key69 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key7 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key70 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key71 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key8 UNIQUE (slug);


--
-- Name: help_tags help_tags_slug_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_tags
    ADD CONSTRAINT help_tags_slug_key9 UNIQUE (slug);


--
-- Name: highlight_stories highlight_stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.highlight_stories
    ADD CONSTRAINT highlight_stories_pkey PRIMARY KEY (id);


--
-- Name: highlights highlights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.highlights
    ADD CONSTRAINT highlights_pkey PRIMARY KEY (id);


--
-- Name: impressions impressions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impressions
    ADD CONSTRAINT impressions_pkey PRIMARY KEY (id);


--
-- Name: interactions interactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interactions
    ADD CONSTRAINT interactions_pkey PRIMARY KEY (id);


--
-- Name: languages languages_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key UNIQUE (code);


--
-- Name: languages languages_code_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key1 UNIQUE (code);


--
-- Name: languages languages_code_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key10 UNIQUE (code);


--
-- Name: languages languages_code_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key11 UNIQUE (code);


--
-- Name: languages languages_code_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key12 UNIQUE (code);


--
-- Name: languages languages_code_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key13 UNIQUE (code);


--
-- Name: languages languages_code_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key14 UNIQUE (code);


--
-- Name: languages languages_code_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key15 UNIQUE (code);


--
-- Name: languages languages_code_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key16 UNIQUE (code);


--
-- Name: languages languages_code_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key17 UNIQUE (code);


--
-- Name: languages languages_code_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key18 UNIQUE (code);


--
-- Name: languages languages_code_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key19 UNIQUE (code);


--
-- Name: languages languages_code_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key2 UNIQUE (code);


--
-- Name: languages languages_code_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key20 UNIQUE (code);


--
-- Name: languages languages_code_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key21 UNIQUE (code);


--
-- Name: languages languages_code_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key22 UNIQUE (code);


--
-- Name: languages languages_code_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key23 UNIQUE (code);


--
-- Name: languages languages_code_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key24 UNIQUE (code);


--
-- Name: languages languages_code_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key25 UNIQUE (code);


--
-- Name: languages languages_code_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key26 UNIQUE (code);


--
-- Name: languages languages_code_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key27 UNIQUE (code);


--
-- Name: languages languages_code_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key28 UNIQUE (code);


--
-- Name: languages languages_code_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key29 UNIQUE (code);


--
-- Name: languages languages_code_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key3 UNIQUE (code);


--
-- Name: languages languages_code_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key30 UNIQUE (code);


--
-- Name: languages languages_code_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key31 UNIQUE (code);


--
-- Name: languages languages_code_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key32 UNIQUE (code);


--
-- Name: languages languages_code_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key33 UNIQUE (code);


--
-- Name: languages languages_code_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key34 UNIQUE (code);


--
-- Name: languages languages_code_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key35 UNIQUE (code);


--
-- Name: languages languages_code_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key36 UNIQUE (code);


--
-- Name: languages languages_code_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key37 UNIQUE (code);


--
-- Name: languages languages_code_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key38 UNIQUE (code);


--
-- Name: languages languages_code_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key39 UNIQUE (code);


--
-- Name: languages languages_code_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key4 UNIQUE (code);


--
-- Name: languages languages_code_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key40 UNIQUE (code);


--
-- Name: languages languages_code_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key41 UNIQUE (code);


--
-- Name: languages languages_code_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key42 UNIQUE (code);


--
-- Name: languages languages_code_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key43 UNIQUE (code);


--
-- Name: languages languages_code_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key44 UNIQUE (code);


--
-- Name: languages languages_code_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key45 UNIQUE (code);


--
-- Name: languages languages_code_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key46 UNIQUE (code);


--
-- Name: languages languages_code_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key47 UNIQUE (code);


--
-- Name: languages languages_code_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key48 UNIQUE (code);


--
-- Name: languages languages_code_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key49 UNIQUE (code);


--
-- Name: languages languages_code_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key5 UNIQUE (code);


--
-- Name: languages languages_code_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key50 UNIQUE (code);


--
-- Name: languages languages_code_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key51 UNIQUE (code);


--
-- Name: languages languages_code_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key52 UNIQUE (code);


--
-- Name: languages languages_code_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key53 UNIQUE (code);


--
-- Name: languages languages_code_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key54 UNIQUE (code);


--
-- Name: languages languages_code_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key55 UNIQUE (code);


--
-- Name: languages languages_code_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key56 UNIQUE (code);


--
-- Name: languages languages_code_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key57 UNIQUE (code);


--
-- Name: languages languages_code_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key58 UNIQUE (code);


--
-- Name: languages languages_code_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key59 UNIQUE (code);


--
-- Name: languages languages_code_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key6 UNIQUE (code);


--
-- Name: languages languages_code_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key60 UNIQUE (code);


--
-- Name: languages languages_code_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key61 UNIQUE (code);


--
-- Name: languages languages_code_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key62 UNIQUE (code);


--
-- Name: languages languages_code_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key63 UNIQUE (code);


--
-- Name: languages languages_code_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key64 UNIQUE (code);


--
-- Name: languages languages_code_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key65 UNIQUE (code);


--
-- Name: languages languages_code_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key66 UNIQUE (code);


--
-- Name: languages languages_code_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key67 UNIQUE (code);


--
-- Name: languages languages_code_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key68 UNIQUE (code);


--
-- Name: languages languages_code_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key69 UNIQUE (code);


--
-- Name: languages languages_code_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key7 UNIQUE (code);


--
-- Name: languages languages_code_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key70 UNIQUE (code);


--
-- Name: languages languages_code_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key71 UNIQUE (code);


--
-- Name: languages languages_code_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key72 UNIQUE (code);


--
-- Name: languages languages_code_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key73 UNIQUE (code);


--
-- Name: languages languages_code_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key74 UNIQUE (code);


--
-- Name: languages languages_code_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key75 UNIQUE (code);


--
-- Name: languages languages_code_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key76 UNIQUE (code);


--
-- Name: languages languages_code_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key77 UNIQUE (code);


--
-- Name: languages languages_code_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key78 UNIQUE (code);


--
-- Name: languages languages_code_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key79 UNIQUE (code);


--
-- Name: languages languages_code_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key8 UNIQUE (code);


--
-- Name: languages languages_code_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key80 UNIQUE (code);


--
-- Name: languages languages_code_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key81 UNIQUE (code);


--
-- Name: languages languages_code_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key82 UNIQUE (code);


--
-- Name: languages languages_code_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key9 UNIQUE (code);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: like_share_settings like_share_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.like_share_settings
    ADD CONSTRAINT like_share_settings_pkey PRIMARY KEY (user_id);


--
-- Name: live_blocked_keywords live_blocked_keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_blocked_keywords
    ADD CONSTRAINT live_blocked_keywords_pkey PRIMARY KEY (id);


--
-- Name: live_blocked_users live_blocked_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_blocked_users
    ADD CONSTRAINT live_blocked_users_pkey PRIMARY KEY (id);


--
-- Name: live_chat_messages live_chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_chat_messages
    ADD CONSTRAINT live_chat_messages_pkey PRIMARY KEY (id);


--
-- Name: live_donations live_donations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_donations
    ADD CONSTRAINT live_donations_pkey PRIMARY KEY (id);


--
-- Name: live_guest_requests live_guest_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_guest_requests
    ADD CONSTRAINT live_guest_requests_pkey PRIMARY KEY (id);


--
-- Name: live_moderators live_moderators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_moderators
    ADD CONSTRAINT live_moderators_pkey PRIMARY KEY (id);


--
-- Name: live_muted_users live_muted_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_muted_users
    ADD CONSTRAINT live_muted_users_pkey PRIMARY KEY (id);


--
-- Name: live_poll_votes live_poll_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_poll_votes
    ADD CONSTRAINT live_poll_votes_pkey PRIMARY KEY (id);


--
-- Name: live_polls live_polls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_polls
    ADD CONSTRAINT live_polls_pkey PRIMARY KEY (id);


--
-- Name: live_products live_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_products
    ADD CONSTRAINT live_products_pkey PRIMARY KEY (id);


--
-- Name: live_questions live_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_questions
    ADD CONSTRAINT live_questions_pkey PRIMARY KEY (id);


--
-- Name: live_settings live_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_settings
    ADD CONSTRAINT live_settings_pkey PRIMARY KEY (id);


--
-- Name: live_stream_messages live_stream_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_stream_messages
    ADD CONSTRAINT live_stream_messages_pkey PRIMARY KEY (id);


--
-- Name: live_stream_viewers live_stream_viewers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_stream_viewers
    ADD CONSTRAINT live_stream_viewers_pkey PRIMARY KEY (id);


--
-- Name: live_streams live_streams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_pkey PRIMARY KEY (id);


--
-- Name: live_streams live_streams_room_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key1 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key10 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key11 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key12 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key13 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key14 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key15 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key16 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key17 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key18 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key19 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key2 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key20 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key21 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key22 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key23 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key24 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key25 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key26 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key27 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key28 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key29 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key3 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key30 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key31 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key32 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key33 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key34 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key35 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key36 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key37 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key38 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key39 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key4 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key40 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key41 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key42 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key43 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key44 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key45 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key46 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key47 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key48 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key49 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key5 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key50 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key51 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key52 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key53 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key54 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key55 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key56 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key57 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key58 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key59 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key6 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key60 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key61 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key62 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key63 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key64 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key65 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key66 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key67 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key68 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key69 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key7 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key70; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key70 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key71; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key71 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key72; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key72 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key73 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key74 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key75; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key75 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key76; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key76 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key77; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key77 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key78; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key78 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key79; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key79 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key8 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key80 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key81; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key81 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key82 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key83 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key84; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key84 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key85 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key86 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key87; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key87 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key88; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key88 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key89 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key9 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key90 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key91 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key92 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key93; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key93 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key94 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key95; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key95 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key96 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key97 UNIQUE (room_name);


--
-- Name: live_streams live_streams_room_name_key98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_streams
    ADD CONSTRAINT live_streams_room_name_key98 UNIQUE (room_name);


--
-- Name: live_supporters live_supporters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_supporters
    ADD CONSTRAINT live_supporters_pkey PRIMARY KEY (id);


--
-- Name: live_viewers live_viewers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_viewers
    ADD CONSTRAINT live_viewers_pkey PRIMARY KEY (id);


--
-- Name: muted_accounts muted_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.muted_accounts
    ADD CONSTRAINT muted_accounts_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: pending_tags pending_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pending_tags
    ADD CONSTRAINT pending_tags_pkey PRIMARY KEY (id);


--
-- Name: pinned_posts pinned_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pinned_posts
    ADD CONSTRAINT pinned_posts_pkey PRIMARY KEY (id);


--
-- Name: post_tags post_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_pkey PRIMARY KEY (id);


--
-- Name: profile_actions profile_actions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_actions
    ADD CONSTRAINT profile_actions_pkey PRIMARY KEY (id);


--
-- Name: profile_links profile_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_links
    ADD CONSTRAINT profile_links_pkey PRIMARY KEY (id);


--
-- Name: push_subscriptions push_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.push_subscriptions
    ADD CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: restricted_accounts restricted_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restricted_accounts
    ADD CONSTRAINT restricted_accounts_pkey PRIMARY KEY (id);


--
-- Name: scheduled_streams scheduled_streams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scheduled_streams
    ADD CONSTRAINT scheduled_streams_pkey PRIMARY KEY (id);


--
-- Name: story_highlights story_highlights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story_highlights
    ADD CONSTRAINT story_highlights_pkey PRIMARY KEY (id);


--
-- Name: story_privacy story_privacy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story_privacy
    ADD CONSTRAINT story_privacy_pkey PRIMARY KEY (id);


--
-- Name: story_reactions story_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.story_reactions
    ADD CONSTRAINT story_reactions_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: support_requests support_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_requests
    ADD CONSTRAINT support_requests_pkey PRIMARY KEY (id);


--
-- Name: system_settings system_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_settings
    ADD CONSTRAINT system_settings_pkey PRIMARY KEY (id);


--
-- Name: user_activity_settings user_activity_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_activity_settings
    ADD CONSTRAINT user_activity_settings_pkey PRIMARY KEY (user_id);


--
-- Name: user_avatars user_avatars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_avatars
    ADD CONSTRAINT user_avatars_pkey PRIMARY KEY (id);


--
-- Name: user_comment_settings user_comment_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_comment_settings
    ADD CONSTRAINT user_comment_settings_pkey PRIMARY KEY (user_id);


--
-- Name: user_custom_words user_custom_words_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_custom_words
    ADD CONSTRAINT user_custom_words_pkey PRIMARY KEY (id);


--
-- Name: user_general_settings user_general_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_general_settings
    ADD CONSTRAINT user_general_settings_pkey PRIMARY KEY (user_id);


--
-- Name: user_hidden_settings user_hidden_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_hidden_settings
    ADD CONSTRAINT user_hidden_settings_pkey PRIMARY KEY (user_id);


--
-- Name: user_message_settings user_message_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_message_settings
    ADD CONSTRAINT user_message_settings_pkey PRIMARY KEY (user_id);


--
-- Name: user_privacy_settings user_privacy_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_privacy_settings
    ADD CONSTRAINT user_privacy_settings_pkey PRIMARY KEY (user_id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: user_sharing_settings user_sharing_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sharing_settings
    ADD CONSTRAINT user_sharing_settings_pkey PRIMARY KEY (user_id);


--
-- Name: user_story_settings user_story_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_story_settings
    ADD CONSTRAINT user_story_settings_pkey PRIMARY KEY (user_id);


--
-- Name: violations violations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.violations
    ADD CONSTRAINT violations_pkey PRIMARY KEY (id);


--
-- Name: account_history_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_history_user_id ON public.account_history USING btree (user_id);


--
-- Name: account_metrics_user_id_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX account_metrics_user_id_date ON public.account_metrics USING btree ("userId", date);


--
-- Name: ad_bookmarks_ad_id_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ad_bookmarks_ad_id_user_id ON public.ad_bookmarks USING btree ("adId", "userId");


--
-- Name: ad_likes_ad_id_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ad_likes_ad_id_user_id ON public.ad_likes USING btree ("adId", "userId");


--
-- Name: ad_metrics_ad_id_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ad_metrics_ad_id_date ON public.ad_metrics USING btree ("adId", date);


--
-- Name: ads_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ads_created_at ON public.ads USING btree ("createdAt");


--
-- Name: ads_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ads_status ON public.ads USING btree (status);


--
-- Name: ads_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ads_user_id ON public.ads USING btree ("userId");


--
-- Name: blocked_users_blocker_id_blocked_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX blocked_users_blocker_id_blocked_id ON public.blocked_users USING btree (blocker_id, blocked_id);


--
-- Name: call_logs_caller_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX call_logs_caller_id ON public.call_logs USING btree (caller_id);


--
-- Name: call_logs_receiver_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX call_logs_receiver_id ON public.call_logs USING btree (receiver_id);


--
-- Name: call_logs_started_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX call_logs_started_at ON public.call_logs USING btree (started_at);


--
-- Name: call_sessions_caller_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX call_sessions_caller_id ON public.call_sessions USING btree (caller_id);


--
-- Name: call_sessions_receiver_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX call_sessions_receiver_id ON public.call_sessions USING btree (receiver_id);


--
-- Name: call_sessions_room_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX call_sessions_room_name ON public.call_sessions USING btree (room_name);


--
-- Name: close_friends_user_id_friend_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX close_friends_user_id_friend_id ON public.close_friends USING btree (user_id, friend_id);


--
-- Name: comment_likes_comment_id_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX comment_likes_comment_id_user_id ON public."CommentLikes" USING btree ("commentId", "userId");


--
-- Name: content_metrics_content_id_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_metrics_content_id_date ON public.content_metrics USING btree ("contentId", date);


--
-- Name: content_metrics_content_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_metrics_content_type ON public.content_metrics USING btree ("contentType");


--
-- Name: content_metrics_user_id_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_metrics_user_id_date ON public.content_metrics USING btree ("userId", date);


--
-- Name: conversations_updated_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX conversations_updated_at ON public."Conversations" USING btree ("updatedAt");


--
-- Name: conversations_user1_user2_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX conversations_user1_user2_idx ON public."Conversations" USING btree (user1_id, user2_id);


--
-- Name: favorite_accounts_user_id_favorite_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX favorite_accounts_user_id_favorite_user_id ON public.favorite_accounts USING btree (user_id, favorite_user_id);


--
-- Name: follow_requests_requester_id_target_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX follow_requests_requester_id_target_user_id ON public."FollowRequests" USING btree ("requesterId", "targetUserId");


--
-- Name: follower_activity_heatmap_user_id_day_of_week_hour_of_day; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX follower_activity_heatmap_user_id_day_of_week_hour_of_day ON public.follower_activity_heatmap USING btree ("userId", "dayOfWeek", "hourOfDay");


--
-- Name: follows_follower_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX follows_follower_id ON public.follows USING btree (follower_id);


--
-- Name: follows_follower_id_following_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX follows_follower_id_following_id ON public.follows USING btree (follower_id, following_id);


--
-- Name: follows_following_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX follows_following_id ON public.follows USING btree (following_id);


--
-- Name: hashtag_follows_user_id_hashtag; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX hashtag_follows_user_id_hashtag ON public.hashtag_follows USING btree (user_id, hashtag);


--
-- Name: help_articles_category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX help_articles_category_id ON public.help_articles USING btree (category_id);


--
-- Name: help_articles_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX help_articles_slug ON public.help_articles USING btree (slug);


--
-- Name: highlight_stories_highlight_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX highlight_stories_highlight_id ON public.highlight_stories USING btree (highlight_id);


--
-- Name: highlight_stories_highlight_id_story_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX highlight_stories_highlight_id_story_id ON public.highlight_stories USING btree (highlight_id, story_id);


--
-- Name: highlight_stories_story_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX highlight_stories_story_id ON public.highlight_stories USING btree (story_id);


--
-- Name: highlights_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX highlights_user_id ON public.highlights USING btree (user_id);


--
-- Name: impressions_content_id_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX impressions_content_id_timestamp ON public.impressions USING btree ("contentId", "timestamp");


--
-- Name: impressions_user_id_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX impressions_user_id_timestamp ON public.impressions USING btree ("userId", "timestamp");


--
-- Name: impressions_viewer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX impressions_viewer_id ON public.impressions USING btree ("viewerId");


--
-- Name: interactions_content_id_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX interactions_content_id_timestamp ON public.interactions USING btree ("contentId", "timestamp");


--
-- Name: interactions_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX interactions_type ON public.interactions USING btree (type);


--
-- Name: interactions_user_id_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX interactions_user_id_timestamp ON public.interactions USING btree ("userId", "timestamp");


--
-- Name: likes_user_id_post_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX likes_user_id_post_id ON public."Likes" USING btree ("userId", "postId");


--
-- Name: live_chat_messages_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_chat_messages_created_at ON public.live_chat_messages USING btree ("createdAt");


--
-- Name: live_chat_messages_stream_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_chat_messages_stream_id ON public.live_chat_messages USING btree ("streamId");


--
-- Name: live_moderators_stream_id_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX live_moderators_stream_id_user_id ON public.live_moderators USING btree ("streamId", "userId");


--
-- Name: live_poll_votes_poll_id_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX live_poll_votes_poll_id_user_id ON public.live_poll_votes USING btree (poll_id, user_id);


--
-- Name: live_stream_messages_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_stream_messages_created_at ON public.live_stream_messages USING btree (created_at);


--
-- Name: live_stream_messages_stream_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_stream_messages_stream_id ON public.live_stream_messages USING btree (stream_id);


--
-- Name: live_stream_viewers_left_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_stream_viewers_left_at ON public.live_stream_viewers USING btree (left_at);


--
-- Name: live_stream_viewers_stream_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_stream_viewers_stream_id ON public.live_stream_viewers USING btree (stream_id);


--
-- Name: live_stream_viewers_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_stream_viewers_user_id ON public.live_stream_viewers USING btree (user_id);


--
-- Name: live_streams_host_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_streams_host_id ON public.live_streams USING btree (host_id);


--
-- Name: live_streams_scheduled_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_streams_scheduled_at ON public.live_streams USING btree (scheduled_at);


--
-- Name: live_streams_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_streams_status ON public.live_streams USING btree (status);


--
-- Name: live_viewers_left_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_viewers_left_at ON public.live_viewers USING btree ("leftAt");


--
-- Name: live_viewers_stream_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_viewers_stream_id ON public.live_viewers USING btree ("streamId");


--
-- Name: live_viewers_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX live_viewers_user_id ON public.live_viewers USING btree ("userId");


--
-- Name: messages_conversation_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX messages_conversation_id ON public."Messages" USING btree (conversation_id);


--
-- Name: messages_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX messages_created_at ON public."Messages" USING btree ("createdAt");


--
-- Name: muted_accounts_user_id_muted_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX muted_accounts_user_id_muted_user_id ON public.muted_accounts USING btree (user_id, muted_user_id);


--
-- Name: notifications_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notifications_created_at ON public.notifications USING btree (created_at);


--
-- Name: notifications_is_read; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notifications_is_read ON public.notifications USING btree (is_read);


--
-- Name: notifications_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notifications_user_id ON public.notifications USING btree (user_id);


--
-- Name: post_tags_post_id_tagged_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX post_tags_post_id_tagged_user_id ON public.post_tags USING btree ("postId", "taggedUserId");


--
-- Name: reel_bookmarks_reel_id_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX reel_bookmarks_reel_id_user_id ON public."ReelBookmarks" USING btree ("reelId", "userId");


--
-- Name: reel_likes_user_id_reel_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX reel_likes_user_id_reel_id ON public."ReelLikes" USING btree ("userId", "reelId");


--
-- Name: restricted_accounts_user_id_restricted_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX restricted_accounts_user_id_restricted_user_id ON public.restricted_accounts USING btree (user_id, restricted_user_id);


--
-- Name: saved_posts_user_id_post_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX saved_posts_user_id_post_id ON public."SavedPosts" USING btree ("userId", "postId");


--
-- Name: scheduled_streams_scheduled_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX scheduled_streams_scheduled_at ON public.scheduled_streams USING btree ("scheduledAt");


--
-- Name: scheduled_streams_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX scheduled_streams_user_id ON public.scheduled_streams USING btree ("userId");


--
-- Name: story_privacy_user_id_hidden_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX story_privacy_user_id_hidden_user_id ON public.story_privacy USING btree (user_id, hidden_user_id);


--
-- Name: story_reactions_story_id_reactor_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX story_reactions_story_id_reactor_id ON public.story_reactions USING btree ("storyId", "reactorId");


--
-- Name: story_reports_story_id_reporter_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX story_reports_story_id_reporter_id ON public."StoryReports" USING btree ("storyId", "reporterId");


--
-- Name: story_views_story_id_viewer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX story_views_story_id_viewer_id ON public."StoryViews" USING btree ("storyId", "viewerId");


--
-- Name: user_sessions_device_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_sessions_device_id ON public.user_sessions USING btree ("deviceId");


--
-- Name: user_sessions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_sessions_user_id ON public.user_sessions USING btree ("userId");


--
-- Name: Feedbacks Feedbacks_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks"
    ADD CONSTRAINT "Feedbacks_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public.help_articles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Likes Likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostReports PostReports_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PostReports"
    ADD CONSTRAINT "PostReports_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE;


--
-- Name: UserInterests UserInterests_interestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserInterests"
    ADD CONSTRAINT "UserInterests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES public."Interests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserInterests UserInterests_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserInterests"
    ADD CONSTRAINT "UserInterests_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."UserProfiles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_bookmarks ad_bookmarks_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_bookmarks
    ADD CONSTRAINT "ad_bookmarks_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_budgets ad_budgets_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_budgets
    ADD CONSTRAINT "ad_budgets_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_clicks ad_clicks_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_clicks
    ADD CONSTRAINT "ad_clicks_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_comments ad_comments_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_comments
    ADD CONSTRAINT "ad_comments_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_impressions ad_impressions_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_impressions
    ADD CONSTRAINT "ad_impressions_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_likes ad_likes_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_likes
    ADD CONSTRAINT "ad_likes_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_media ad_media_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_media
    ADD CONSTRAINT "ad_media_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_metrics ad_metrics_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_metrics
    ADD CONSTRAINT "ad_metrics_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ad_targets ad_targets_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_targets
    ADD CONSTRAINT "ad_targets_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admin_audit_logs admin_audit_logs_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_audit_logs
    ADD CONSTRAINT "admin_audit_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: admins admins_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: boosted_content_references boosted_content_references_adId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boosted_content_references
    ADD CONSTRAINT "boosted_content_references_adId_fkey" FOREIGN KEY ("adId") REFERENCES public.ads(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dm_moderation_logs dm_moderation_logs_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_moderation_logs
    ADD CONSTRAINT "dm_moderation_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: help_article_tags help_article_tags_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_article_tags
    ADD CONSTRAINT help_article_tags_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.help_articles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: help_article_tags help_article_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_article_tags
    ADD CONSTRAINT help_article_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.help_tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: help_articles help_articles_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_articles
    ADD CONSTRAINT help_articles_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.help_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: help_categories help_categories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.help_categories
    ADD CONSTRAINT help_categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.help_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: live_blocked_keywords live_blocked_keywords_streamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_blocked_keywords
    ADD CONSTRAINT "live_blocked_keywords_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_blocked_users live_blocked_users_streamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_blocked_users
    ADD CONSTRAINT "live_blocked_users_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_donations live_donations_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_donations
    ADD CONSTRAINT live_donations_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_guest_requests live_guest_requests_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_guest_requests
    ADD CONSTRAINT live_guest_requests_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_moderators live_moderators_streamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_moderators
    ADD CONSTRAINT "live_moderators_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_muted_users live_muted_users_streamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_muted_users
    ADD CONSTRAINT "live_muted_users_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_poll_votes live_poll_votes_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_poll_votes
    ADD CONSTRAINT live_poll_votes_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES public.live_polls(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_polls live_polls_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_polls
    ADD CONSTRAINT live_polls_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_products live_products_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_products
    ADD CONSTRAINT live_products_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_questions live_questions_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_questions
    ADD CONSTRAINT live_questions_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_settings live_settings_streamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_settings
    ADD CONSTRAINT "live_settings_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_stream_messages live_stream_messages_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_stream_messages
    ADD CONSTRAINT live_stream_messages_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_stream_viewers live_stream_viewers_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_stream_viewers
    ADD CONSTRAINT live_stream_viewers_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: live_supporters live_supporters_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_supporters
    ADD CONSTRAINT live_supporters_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.live_streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pinned_posts pinned_posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pinned_posts
    ADD CONSTRAINT "pinned_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."UserProfiles"("userId");


--
-- Name: post_tags post_tags_taggedUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT "post_tags_taggedUserId_fkey" FOREIGN KEY ("taggedUserId") REFERENCES public."UserProfiles"("userId");


--
-- Name: profile_actions profile_actions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_actions
    ADD CONSTRAINT "profile_actions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."UserProfiles"("userId");


--
-- Name: profile_links profile_links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_links
    ADD CONSTRAINT "profile_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."UserProfiles"("userId");


--
-- PostgreSQL database dump complete
--

\unrestrict ZcsjXzu80dV3yjeYDrHzQgBRxGlMWg4Kqx8fKLlhxX11qeLvmLqpTJK3RHWsa0q

