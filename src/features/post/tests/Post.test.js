// TODO: update tests for post slice, add upvote test
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test-utils';
import { setupStore } from '../../../app/store';
import ContentCard from '../Card';
import Comments from '../../../components/Comments';
import { getPostComments as mockGetPostComments } from '../../../api/reddit.js';

const getPostComments = jest.fn(mockGetPostComments);
const configureStoreWithState = (initialState) => {
    return setupStore(initialState)
};


describe('Post component', () => {
    beforeEach(() => {
        // Mock the `getPostComments` API call
        getPostComments.mockResolvedValue([
            {
                id: 1,
                body: 'This is the first comment',
                selftext: 'Test'
            },
            {
                id: 2,
                body: 'This is the second comment',
                selftext: 'Test'
            },
        ]);
    });

    it('should display the correct number of comments', async () => {
        // setup mock store
        const mockPosts = [{ title: "Post Title 1", selftext: 'test', loadingComments: false }, { title: "Post Title 2", selftext: 'test', loadingComments: false }]

        const initialHome = {
            posts: mockPosts,
            subreddits: [{ "test": "test" }, { "test2": "test" }],
            loading: false,
            error: false,
            searchTerm: '',
            selectedSubreddit: '/r/nibbio',

        }
        const initialPosts = {
            post: mockPosts[0],
            comments: [
                {
                    0: {
                        id: 1,
                        body: 'This is the first comment',
                        selftext: 'Test'
                    }
                }, {
                    1:
                    {
                        id: 2,
                        body: 'This is the second comment',
                        selftext: 'Test'
                    }
                }
            ]
        }
        const store = configureStoreWithState({ home: initialHome, post: initialPosts })
        // Render the Post component
        renderWithProviders(
            <>
                {/* <ContentCard key={Math.random} postId="1" post={mockPosts[0]} /> */}
                <div>
                    <Comments comments={[
                        {
                            "subreddit_id": "t5_2s8xv",
                            "approved_at_utc": null,
                            "author_is_blocked": false,
                            "comment_type": null,
                            "awarders": [],
                            "mod_reason_by": null,
                            "banned_by": null,
                            "author_flair_type": "text",
                            "total_awards_received": 0,
                            "subreddit": "MechanicalEngineering",
                            "author_flair_template_id": null,
                            "likes": null,
                            "replies": {
                                "kind": "Listing",
                                "data": {
                                    "after": null,
                                    "dist": null,
                                    "modhash": "",
                                    "geo_filter": "",
                                    "children": [
                                        {
                                            "kind": "t1",
                                            "data": {
                                                "subreddit_id": "t5_2s8xv",
                                                "approved_at_utc": null,
                                                "author_is_blocked": false,
                                                "comment_type": null,
                                                "awarders": [],
                                                "mod_reason_by": null,
                                                "banned_by": null,
                                                "author_flair_type": "text",
                                                "total_awards_received": 0,
                                                "subreddit": "MechanicalEngineering",
                                                "author_flair_template_id": null,
                                                "likes": null,
                                                "replies": {
                                                    "kind": "Listing",
                                                    "data": {
                                                        "after": null,
                                                        "dist": null,
                                                        "modhash": "",
                                                        "geo_filter": "",
                                                        "children": [
                                                            {
                                                                "kind": "t1",
                                                                "data": {
                                                                    "subreddit_id": "t5_2s8xv",
                                                                    "approved_at_utc": null,
                                                                    "author_is_blocked": false,
                                                                    "comment_type": null,
                                                                    "awarders": [],
                                                                    "mod_reason_by": null,
                                                                    "banned_by": null,
                                                                    "author_flair_type": "text",
                                                                    "total_awards_received": 0,
                                                                    "subreddit": "MechanicalEngineering",
                                                                    "author_flair_template_id": null,
                                                                    "likes": null,
                                                                    "replies": "",
                                                                    "user_reports": [],
                                                                    "saved": false,
                                                                    "id": "jy93msn",
                                                                    "banned_at_utc": null,
                                                                    "mod_reason_title": null,
                                                                    "gilded": 0,
                                                                    "archived": false,
                                                                    "collapsed_reason_code": null,
                                                                    "no_follow": true,
                                                                    "author": "Competitive_Turnip74",
                                                                    "can_mod_post": false,
                                                                    "send_replies": true,
                                                                    "parent_id": "t1_jxshwf5",
                                                                    "score": 1,
                                                                    "author_fullname": "t2_s4668a6f",
                                                                    "removal_reason": null,
                                                                    "approved_by": null,
                                                                    "mod_note": null,
                                                                    "all_awardings": [],
                                                                    "body": "This is the first comment",
                                                                    "edited": false,
                                                                    "top_awarded_type": null,
                                                                    "downs": 0,
                                                                    "author_flair_css_class": null,
                                                                    "name": "t1_jy93msn",
                                                                    "is_submitter": false,
                                                                    "collapsed": false,
                                                                    "author_flair_richtext": [],
                                                                    "author_patreon_flair": false,
                                                                    "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;Hi! This position will be onsite, unfortunately.&lt;/p&gt;\n&lt;/div&gt;",
                                                                    "gildings": {},
                                                                    "collapsed_reason": null,
                                                                    "distinguished": null,
                                                                    "associated_award": null,
                                                                    "stickied": false,
                                                                    "author_premium": false,
                                                                    "can_gild": false,
                                                                    "link_id": "t3_14p6gap",
                                                                    "unrepliable_reason": null,
                                                                    "author_flair_text_color": null,
                                                                    "score_hidden": false,
                                                                    "permalink": "/r/MechanicalEngineering/comments/14p6gap/mechanical_engineering_jobs_thread/jy93msn/",
                                                                    "subreddit_type": "public",
                                                                    "locked": false,
                                                                    "report_reasons": null,
                                                                    "created": 1693327857,
                                                                    "author_flair_text": null,
                                                                    "treatment_tags": [],
                                                                    "created_utc": 1693327857,
                                                                    "subreddit_name_prefixed": "r/MechanicalEngineering",
                                                                    "controversiality": 0,
                                                                    "depth": 2,
                                                                    "author_flair_background_color": null,
                                                                    "collapsed_because_crowd_control": null,
                                                                    "mod_reports": [],
                                                                    "num_reports": null,
                                                                    "ups": 1
                                                                }
                                                            }
                                                        ],
                                                        "before": null
                                                    }
                                                },
                                                "user_reports": [],
                                                "saved": false,
                                                "id": "jxshwf5",
                                                "banned_at_utc": null,
                                                "mod_reason_title": null,
                                                "gilded": 0,
                                                "archived": false,
                                                "collapsed_reason_code": null,
                                                "no_follow": false,
                                                "author": "Liizam",
                                                "can_mod_post": false,
                                                "created_utc": 1693024634,
                                                "send_replies": true,
                                                "parent_id": "t1_jwbupo9",
                                                "score": 4,
                                                "author_fullname": "t2_bn85sk90",
                                                "removal_reason": null,
                                                "approved_by": null,
                                                "mod_note": null,
                                                "all_awardings": [],
                                                "body": "This is the second comment",
                                                "edited": false,
                                                "top_awarded_type": null,
                                                "author_flair_css_class": null,
                                                "name": "t1_jxshwf5",
                                                "is_submitter": false,
                                                "downs": 0,
                                                "author_flair_richtext": [],
                                                "author_patreon_flair": false,
                                                "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;Hi! \nCould this position be fully remote ?&lt;/p&gt;\n&lt;/div&gt;",
                                                "gildings": {},
                                                "collapsed_reason": null,
                                                "distinguished": null,
                                                "associated_award": null,
                                                "stickied": false,
                                                "author_premium": false,
                                                "can_gild": false,
                                                "link_id": "t3_14p6gap",
                                                "unrepliable_reason": null,
                                                "author_flair_text_color": null,
                                                "score_hidden": false,
                                                "permalink": "/r/MechanicalEngineering/comments/14p6gap/mechanical_engineering_jobs_thread/jxshwf5/",
                                                "subreddit_type": "public",
                                                "locked": false,
                                                "report_reasons": null,
                                                "created": 1693024634,
                                                "author_flair_text": null,
                                                "treatment_tags": [],
                                                "collapsed": false,
                                                "subreddit_name_prefixed": "r/MechanicalEngineering",
                                                "controversiality": 0,
                                                "depth": 1,
                                                "author_flair_background_color": null,
                                                "collapsed_because_crowd_control": null,
                                                "mod_reports": [],
                                                "num_reports": null,
                                                "ups": 4
                                            }
                                        }
                                    ],
                                    "before": null
                                }
                            },
                            "user_reports": [],
                            "saved": false,
                            "id": "jwbupo9",
                            "banned_at_utc": null,
                            "mod_reason_title": null,
                            "gilded": 0,
                            "archived": false,
                            "collapsed_reason_code": null,
                            "no_follow": true,
                            "author": "Competitive_Turnip74",
                            "can_mod_post": false,
                            "created_utc": 1692128295,
                            "send_replies": true,
                            "parent_id": "t3_14p6gap",
                            "score": 5,
                            "author_fullname": "t2_s4668a6f",
                            "approved_by": null,
                            "mod_note": null,
                            "all_awardings": [],
                            "collapsed": false,
                            "body": "This is the second comment",
                            "edited": false,
                            "top_awarded_type": null,
                            "author_flair_css_class": null,
                            "name": "t1_jwbupo9",
                            "is_submitter": false,
                            "downs": 0,
                            "author_flair_richtext": [],
                            "author_patreon_flair": false,
                            "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;We are hiring a &lt;strong&gt;Senior Mechanical Engineer&lt;/strong&gt; in &lt;strong&gt;Vancouver, WA&lt;/strong&gt; to help design cutting edge Pyrometry and Blackbody products (Critical Sensing and Control products) used in the Semiconductor and Industrial Instrumentation space at Advanced Energy. &lt;/p&gt;\n\n&lt;p&gt;The ideal candidate will have strong thermal analysis and design for heat transfer experience, in addition to experience in analog sensors, design and packaging. &lt;/p&gt;\n\n&lt;p&gt;Our salary range is $95,000 - $125,000 base. &lt;/p&gt;\n\n&lt;p&gt;Please message me for more details, or use this link to apply: &lt;a href=\"https://jobs.advanced-energy.com/job/Vancouver-Senior-Mechanical-Engineer-WA-98660/1002924100/\"&gt;https://jobs.advanced-energy.com/job/Vancouver-Senior-Mechanical-Engineer-WA-98660/1002924100/&lt;/a&gt;&lt;/p&gt;\n\n&lt;p&gt;Thanks all!&lt;/p&gt;\n&lt;/div&gt;",
                            "removal_reason": null,
                            "collapsed_reason": null,
                            "distinguished": null,
                            "associated_award": null,
                            "stickied": false,
                            "author_premium": false,
                            "can_gild": false,
                            "gildings": {},
                            "unrepliable_reason": null,
                            "author_flair_text_color": null,
                            "score_hidden": false,
                            "permalink": "/r/MechanicalEngineering/comments/14p6gap/mechanical_engineering_jobs_thread/jwbupo9/",
                            "subreddit_type": "public",
                            "locked": false,
                            "report_reasons": null,
                            "created": 1692128295,
                            "author_flair_text": null,
                            "treatment_tags": [],
                            "link_id": "t3_14p6gap",
                            "subreddit_name_prefixed": "r/MechanicalEngineering",
                            "controversiality": 0,
                            "depth": 0,
                            "author_flair_background_color": null,
                            "collapsed_because_crowd_control": null,
                            "mod_reports": [],
                            "num_reports": null,
                            "ups": 5
                        },
                        {
                            "subreddit_id": "t5_2s8xv",
                            "approved_at_utc": null,
                            "author_is_blocked": false,
                            "comment_type": null,
                            "awarders": [],
                            "mod_reason_by": null,
                            "banned_by": null,
                            "author_flair_type": "text",
                            "total_awards_received": 0,
                            "subreddit": "MechanicalEngineering",
                            "author_flair_template_id": null,
                            "likes": null,
                            "replies": "",
                            "user_reports": [],
                            "saved": false,
                            "id": "jscrawd",
                            "banned_at_utc": null,
                            "mod_reason_title": null,
                            "gilded": 0,
                            "archived": false,
                            "collapsed_reason_code": null,
                            "no_follow": true,
                            "author": "Kwdumbo",
                            "can_mod_post": false,
                            "created_utc": 1689619737,
                            "send_replies": true,
                            "parent_id": "t3_14p6gap",
                            "score": 3,
                            "author_fullname": "t2_f4y641l",
                            "approved_by": null,
                            "mod_note": null,
                            "all_awardings": [],
                            "collapsed": false,
                            "body": "This is the second comment",
                            "edited": false,
                            "top_awarded_type": null,
                            "author_flair_css_class": null,
                            "name": "t1_jscrawd",
                            "is_submitter": false,
                            "downs": 0,
                            "author_flair_richtext": [],
                            "author_patreon_flair": false,
                            "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;I’m looking for product design roles in NYC. Not looking for HVAC/ MEP jobs. Anybody have good recs on what companies or job listing sites would be good to check out?&lt;/p&gt;\n\n&lt;p&gt;I know Meta and Peloton have offices in the city, but I’m a bit clueless outside of those 2.&lt;/p&gt;\n&lt;/div&gt;",
                            "removal_reason": null,
                            "collapsed_reason": null,
                            "distinguished": null,
                            "associated_award": null,
                            "stickied": false,
                            "author_premium": false,
                            "can_gild": false,
                            "gildings": {},
                            "unrepliable_reason": null,
                            "author_flair_text_color": null,
                            "score_hidden": false,
                            "permalink": "/r/MechanicalEngineering/comments/14p6gap/mechanical_engineering_jobs_thread/jscrawd/",
                            "subreddit_type": "public",
                            "locked": false,
                            "report_reasons": null,
                            "created": 1689619737,
                            "author_flair_text": null,
                            "treatment_tags": [],
                            "link_id": "t3_14p6gap",
                            "subreddit_name_prefixed": "r/MechanicalEngineering",
                            "controversiality": 0,
                            "depth": 0,
                            "author_flair_background_color": null,
                            "collapsed_because_crowd_control": null,
                            "mod_reports": [],
                            "num_reports": null,
                            "ups": 3
                        },
                    ]} />
                </div>
            </>, { store }
        );


        // Wait for the comments to be loaded
        // await waitFor(() => {
        //     expect(screen.getByText('This is the second comment')).toBeInTheDocument();
        // });

        // Assert that the component displays the correct number of comments
        expect(screen.queryAllByText('This is the second comment')).toHaveLength(2);
    });
});
